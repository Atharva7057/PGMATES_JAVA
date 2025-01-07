import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/UserNavbar.css"
function UserNavbar() {
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  const toggleTray = () => {
    setIsTrayOpen(!isTrayOpen);
  };

  return (
    <div className="navcontainer">
        <div className="navbar">
          <div className="logo">
    
          </div>
          <div className="nav-links">
            <Link to="/user/user-home" className="nav-link">
              Home
            </Link>
            <Link to="/user/view-listings" className="nav-link">
              View listings
            </Link>
            <Link to="/user/services" className="nav-link">
              Services
            </Link>
            <Link to="/user/about" className="nav-link">
              About
            </Link>
          </div>
          <div className="profile">
            <button className="profile-button" onClick={toggleTray}>
              Tray
            </button>
            {isTrayOpen && (
              <div className="tray">
                <p className="tray-item">My Profile</p>
                <p className="tray-item">Help</p>
                <p className="tray-item">Delete Account</p>
                <button className="logout">Logout</button>
              </div>
            )}
          </div>
        </div>
        
      </div>
    
  );
}

export default UserNavbar;
