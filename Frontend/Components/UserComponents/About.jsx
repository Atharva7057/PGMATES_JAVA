import React from 'react';
import '../../CSS/About.css';
import image1 from '../../Images/profile.jpg';
import UserNavbar from './UserNavbar';
function About() {
  return (
    <>
   
    <div className="About-container">
      {/* Project Name */}
      <div className="header">
        <h1 className="mainTitle">About Us</h1>
        <h2 className="subTitle">Project Name: PGMATES</h2>
      </div>

      {/* Overview Section */}
      <div className="section">
        <h3 className="sectionTitle">Overview</h3>
        <p className="sectionContent">
          PGMATES is a comprehensive platform designed to simplify the process of finding and managing paying guest 
          accommodations. Whether you're a property owner listing accommodations or a tenant searching for a perfect 
          place to stay, PGMATES connects you with the right opportunities. Our platform offers features like property 
          listings, advanced search filters, rent management, and easy communication between owners and tenants. 
          PGMATES aims to provide a seamless experience for individuals by saving time, reducing stress, and promoting 
          transparency in the renting process.
        </p>
      </div>

      {/* Vision Section */}
      <div className="section">
        <h3 className="sectionTitle">Our Vision</h3>
        <p className="sectionContent">
          Our vision is to revolutionize the paying guest experience by creating a platform that ensures convenience, 
          trust, and reliability for both tenants and property owners. We aspire to build a community where finding the 
          right place to stay or the ideal tenant is no longer a challenge. With PGMATES, we envision a world where 
          accommodation management is simplified, and everyone can feel at home, wherever they are.
        </p>
      </div>

      {/* Team Section */}
      <div>
        <h3 className="teamTitle">Meet Our Team</h3>
        <div className="teamContainer">
          {["Parthavi Chavan", "Pranjal Chirmade", "Atharva Patil", "Ayushi Yadav", "Rupali Kumari"].map((name) => (
            <div key={name} className="teamCard">
              <img
                src={image1} // Use the imported image here
                alt={name}
                className="teamImage"
              />
              <p className="teamName">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default About
