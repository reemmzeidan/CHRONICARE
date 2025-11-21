import React from "react";
import "./About.css"; 

const stats = [
  { name: "Patients served", value: "5,000+" },
  { name: "Healthcare professionals", value: "120+" },
  { name: "Years of experience", value: "10" },
  { name: "Locations", value: "3" },
];

const About = () => {
 
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="about">
     
      <div className="about-header">
        <h2>About Chronicare</h2>
        <p>
          Chronicare is dedicated to providing quality healthcare services for
          patients of all ages. Our platform connects patients, caregivers, and
          doctors to make healthcare more accessible and efficient.
        </p>

      
      </div>

     
      <div className="about-stats">
        {stats.map((stat) => (
          <div key={stat.name} className="stat">
            <dd>{stat.value}</dd>
            <dt>{stat.name}</dt>
          </div>
        ))}
      </div>

     
      <div id="our-story" className="story-section">
        <h3>Our Story</h3>
        <p>
          Chronicare began as a personal mission. With close friends and
          relatives suffering from chronic illnesses, we saw how exhausting it
          was for them to constantly visit hospitals for routine checkups. They
          didn’t need to be hospitalized — they needed support to manage their
          care independently, confidently, and safely.  
          <br />
          <br />
          That’s why Chronicare was born — to help patients take control of
          their health from home while staying connected to their doctors and
          caregivers.
        </p>
      </div>

      
      <div id="mission-vision" className="story-section">
        <h3>Mission & Vision</h3>
        <p>
          Our mission is to simplify chronic care through technology, empathy,
          and innovation.  
          <br />
          <br />
          We envision a world where managing a chronic condition isn’t a burden
          — where patients can live healthier, happier lives with continuous
          guidance and digital tools designed with care.
        </p>
      </div>

      
      <div id="our-team" className="story-section">
        <h3>Our Team</h3>
        <p>
          Behind Chronicare is a passionate team of doctors, engineers, and
          caregivers united by a shared goal: empowering patients to take
          charge of their well-being while ensuring professional care remains
          close at hand.
        </p>
      </div>

      
      <div className="stories">
        
        <div className="story">
          <div className="story-text">
            <h3>How Chronicare Helped Me Manage Diabetes</h3>
            <p>
              Chronicare made tracking my medications and monitoring my blood
              sugar so much easier. I feel in control of my health every day!
            </p>
          </div>
          <div className="story-image">
            <img
              src="/src/images/woman-with-diabetes.jpg"
              alt="Woman managing diabetes"
            />
          </div>
        </div>

        
        <div className="story">
          <div className="story-image">
            <img
              src="/src/images/Care-giver.jpg"
              alt="Caregiver with grandpa"
            />
          </div>
          <div className="story-text">
            <h3>Helping My Grandpa Stay Healthy</h3>
            <p>
              Chronicare helps me track my grandfather's medications and
              appointments easily. It gives me peace of mind knowing he’s taken
              care of.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
