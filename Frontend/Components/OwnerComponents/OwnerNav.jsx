import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./OwnerCSS/OwnerNav.css";


function OwnerNav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTray = () => {
    setIsTrayOpen(!isTrayOpen);
  };

  const closeTray = () => {
    setIsTrayOpen(false);
  };

  const logout = () => {
    // sessionStorage.removeItem("jwtToken");
    // sessionStorage.removeItem("userDetails");
    // sessionStorage.removeItem("userRole");
    sessionStorage.clear();
    console.log("logout clicked");

    navigate("/login?isLogin=true");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">PgMate</div>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/owner/owner-home">Home</Link>
          </li>
          {/* <li>
            <Link to="/aboutus">About</Link>
          </li> */}
          <li>
            <Link to="/owner/services">Services</Link>
          </li>
          <li>
            <Link to="/owner/registerproperty">Register Property</Link>
          </li>
          <li>
            <div className="dashboard-link" onClick={toggleTray}>
              Dashboard ☰
            </div>
          </li>
          <li>
            <Link to="/owner/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {isTrayOpen && (
        <div className="floating-tray">
          <div className="tray-header">
            <h3>Dashboard</h3>
            <button className="close-tray" onClick={closeTray}>
              ✖
            </button>
          </div>
          <div className="tray-content">
            <ul>
            <li>
                <Link to="/owner/profile" onClick={closeTray}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/owner/appointments" onClick={closeTray}>
                  My Appointments
                </Link>
              </li>
              <li>
                <Link to="/owner/propertylistings" onClick={closeTray}>
                  Property Listings
                </Link>
              </li>
              <li>
                <button id = "logoutbtn" onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default OwnerNav;
