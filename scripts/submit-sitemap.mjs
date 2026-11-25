/**
 * submit-sitemap.mjs
 *
 * Submits https://edgarmancilla.com/sitemap.xml to Google Search Console
 * after a production deploy using a GCP Service Account stored in
 * the GSC_SERVICE_ACCOUNT environment variable.
 *
 * Zero external dependencies (uses Node.js built-in crypto + fetch).
 */

import crypto from 'crypto';

const SITEMAP_URL = 'https://edgarmancilla.com/sitemap.xml';
const CANDIDATE_SITES = [
  'sc-domain:edgarmancilla.com',
  'https://edgarmancilla.com/',
];
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GSC_SCOPE = 'https://www.googleapis.com/auth/webmasters';

function base64Url(input) {
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input, 'utf8');
  return buffer
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64Url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: GSC_SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );

  const unsignedJwt = `${header}.${payload}`;
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(unsignedJwt)
    .sign(serviceAccount.private_key);
  const assertion = `${unsignedJwt}.${base64Url(signature)}`;

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OAuth token exchange failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function detectSiteProperty(accessToken) {
  const response = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to list Search Console sites (${response.status}): ${errorText}`);
  }

  const { siteEntry = [] } = await response.json();
  const availableUrls = siteEntry.map((entry) => entry.siteUrl);

  for (const candidate of CANDIDATE_SITES) {
    if (availableUrls.includes(candidate)) {
      return candidate;
    }
  }

  return null;
}

async function submitSitemap(accessToken, siteUrl) {
  const endpoint =
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}` +
    `/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sitemap submission failed (${response.status}): ${errorText}`);
  }
}

async function main() {
  const rawCredentials = process.env.GSC_SERVICE_ACCOUNT;
  if (!rawCredentials) {
    console.log('ℹ Skipping Search Console sitemap submission: GSC_SERVICE_ACCOUNT is not set.');
    return;
  }

  const serviceAccount = JSON.parse(rawCredentials);
  const accessToken = await getAccessToken(serviceAccount);
  const siteUrl = await detectSiteProperty(accessToken);

  if (!siteUrl) {
    console.warn(
      `::warning::Service account ${serviceAccount.client_email} does not have access to edgarmancilla.com in Google Search Console yet. Add it under Settings -> Users and permissions with Full permission.`,
    );
    return;
  }

  await submitSitemap(accessToken, siteUrl);
  console.log(`✓ Submitted ${SITEMAP_URL} to Google Search Console (${siteUrl})`);
}

main().catch((error) => {
  console.error(`✗ ${error.message}`);
  process.exit(1);
});
