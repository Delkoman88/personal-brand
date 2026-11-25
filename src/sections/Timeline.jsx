const timelineData = [
  { year: '2025–Present', title: 'TraceLab Consulting' },
  { year: '2022–2025', title: 'Tryp México' },
  { year: '2017–2022', title: 'Urbn Leaves' },
  { year: '2014–2017', title: 'Baja Biotech' },
  { year: '2013–2019', title: 'Academic Research' },
  { year: '2011–2013', title: 'INC Research / Syneos Health' },
];

export default function Timeline() {
  return (
    <section id="timeline" className="section-spacing bg-low" aria-labelledby="timeline-heading">
      <div className="container">
        <div className="section-heading">
          <h2 id="timeline-heading" className="label-text">Historical Timeline</h2>
        </div>

        <ol className="timeline-list">
          {timelineData.map((item, index) => (
            <li key={item.title} className="timeline-item">
              <span className="timeline-step">{String(index + 1).padStart(2, '0')}</span>
              <span className="timeline-year">{item.year}</span>
              <span translate="no" className="notranslate timeline-title">
                {item.title}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
