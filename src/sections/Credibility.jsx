import { credibilityHighlights as highlights } from '../content/homeContent';

export default function Credibility() {
  return (
    <section id="credibility" className="section-spacing bg-surface grid-blueprint" aria-labelledby="credibility-heading">
      <div className="container">
        <div className="section-heading">
          <h2 id="credibility-heading" className="label-text">Credibility &amp; Substance</h2>
        </div>

        <div className="credibility-grid">
          {highlights.map((text) => (
            <div key={text} className="credibility-item">
              <div className="credibility-dot" aria-hidden="true" />
              <span className="credibility-text">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
