import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../CSS/UserNavbar.css"
// import navigate from "navigate";
function UserNavbar() {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const navigate = useNavigate();
  const toggleTray = () => {
    setIsTrayOpen(!isTrayOpen);
  };

  const logout = () => {
    sessionStorage.clear();
    console.log("logout clicked");

    navigate("/login?isLogin=true");
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
          ☰
          </button>
          {isTrayOpen && (
            <div className="tray">
              <p><Link to="/user/MyProfile" className="tray-item" >
                My Profile
              </Link></p>
              <p><Link to="/user/ManageAppointments" className="tray-item" >
                My Appointments
              </Link></p>
              <button className="logout" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>

    </div>

  );
}

export default UserNavbar;
