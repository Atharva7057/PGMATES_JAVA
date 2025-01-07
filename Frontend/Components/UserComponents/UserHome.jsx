import React from "react";
import UserNavbar from "./UserNavbar";
import backgroundImage from '../../Images/HomeImg.jpg'; 
import '../../CSS/UserHome.css';

function UserHome() {
  return (
 <>
      <div className="main-content">
      <div className="image-container">
        <img 
          src={backgroundImage} 
          alt="Background"
          className="background-image"
        />
        <div className="title-section">
          <h1>Welcome to PGMates</h1>
          <p>Explore our services and learn more about what we do.</p>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
 
 </>
      
    
    
  );
}

export default UserHome;
