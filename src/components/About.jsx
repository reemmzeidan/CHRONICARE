import React from "react";
import "./About.css"; // separate CSS file for styling

const links = [
  { name: "Our Story", href: "#" },
  { name: "Mission & Vision", href: "#" },
  { name: "Our Team", href: "#" },
];

const stats = [
  { name: "Patients served", value: "5,000+" },
  { name: "Healthcare professionals", value: "120+" },
  { name: "Years of experience", value: "10" },
  { name: "Locations", value: "3" },
];

const About = () => {
  return (
    <section className="about">
      {/* Header */}
      <div className="about-header">
        <h2>About Chronicare</h2>
        <p>
          Chronicare is dedicated to providing quality healthcare services for patients of all ages.
          Our platform connects patients, caregivers, and doctors to make healthcare more accessible
          and efficient.
        </p>
        <div className="about-links">
          {links.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name} &rarr;
            </a>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats">
        {stats.map((stat) => (
          <div key={stat.name} className="stat">
            <dd>{stat.value}</dd>
            <dt>{stat.name}</dt>
          </div>
        ))}
      </div>

      {/* Stories */}
      <div className="stories">
        {/* Story 1 */}
        <div className="story">
          <div className="story-text">
            <h3>How Chronicare Helped Me Manage Diabetes</h3>
            <p>
              Chronicare made tracking my medications and monitoring my blood sugar so much easier. I feel in control of my health every day!
            </p>
          </div>
          <div className="story-image">
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.newscientist.com%2Farticle%2F2427834-glucose-monitors-may-misclassify-people-as-being-at-risk-of-diabetes%2F&psig=AOvVaw2Nzas7w4tQOPP0YgbhVBqA&ust=1761809634088000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKClvcDyyJADFQAAAAAdAAAAABAK" alt="Woman with diabetes" />
          </div>
        </div>

        {/* Story 2 */}
        <div className="story">
          <div className="story-image">
            <img src="/images/caregiver-grandpa.jpg" alt="Caregiver with grandpa" />
          </div>
          <div className="story-text">
            <h3>Helping My Grandpa Stay Healthy</h3>
            <p>
              Chronicare helps me track my grandfather's medications and appointments easily. It gives me peace of mind knowing he’s taken care of.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
