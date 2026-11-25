import { homeCopy } from '../content/homeContent';

export default function About() {
  return (
    <section id="about" className="section-spacing bg-surface" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-heading">
          <h2 id="about-heading" className="label-text">Profile</h2>
        </div>
        <div className="profile-copy">
          <h2>{homeCopy.profileTitle}</h2>
          {homeCopy.profile.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
