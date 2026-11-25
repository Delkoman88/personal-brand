import { useEffect, useRef, useState } from 'react';
import { CONTACT_EMAIL } from '../config/site';

export default function CopyEmailButton({
  email = CONTACT_EMAIL,
  label = 'Copy email',
  copiedLabel = 'Copied',
  className = 'btn-secondary copy-email-btn',
}) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      const input = document.createElement('textarea');
      input.value = email;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${className}${copied ? ' is-copied' : ''}`}
      aria-live="polite"
    >
      <span key={copied ? 'copied' : 'idle'} className="copy-email-label">
        {copied ? `${copiedLabel} ✓` : label}
      </span>
    </button>
  );
}
