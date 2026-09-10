import { homeCopy } from '../content/homeContent';

export default function About() {
  return (
    <section id="about" className="section-spacing bg-surface">
      <div className="container">
        <div className="section-heading"><span className="label-text">02 // Profile</span></div>
        <div className="profile-copy">
          <h2>{homeCopy.profileTitle}</h2>
          {homeCopy.profile.map(text => <p key={text}>{text}</p>)}
        </div>
      </div>
    </section>
  );
}
