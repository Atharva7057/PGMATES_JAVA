import React, { useEffect, useState } from 'react';
import "./OwnerCSS/profileCss.css";
import defaultProfilePic from "../../Images/profile.jpg"; // Add a default profile image
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState({
    name: '',
    email: '',
    contactNumber: '',
    gender: '',
    address: '',
    profilePicture: '',
    properties: []
  });

  // Load owner data from local storage
  useEffect(() => {
    const storedOwner = JSON.parse(sessionStorage.getItem("userDetails"));
    if (storedOwner) {
      setOwner(storedOwner);
    }
  }, []);

  return (
    <div className="profile-container">
      <h1 id='title'>My Profile</h1>

      <div className="profile-section">
        <div className="profile-info">
          {/* Owner Profile Picture */}
          <img src={owner.profilePicture || defaultProfilePic} alt="Profile" className="profile-pic" />

          {/* Owner Details */}
          <div className="owner-details">
            <h2>{owner.firstName +" "+ owner.lastName || "Your Name"}</h2>
            <p><strong>Email:</strong> {owner.email || "your-email@example.com"}</p>
            <p><strong>Contact Number:</strong> {owner.contact || "Not Available"}</p>
            <p><strong>Gender:</strong> {owner.gender || "Not Specified"}</p>
       
          </div>
        </div>
      </div>


      {/* Buttons Section */}
      <div className="settings-section">
        <button className="btn-1">Edit Profile</button>
        <button className="btn-1"  onClick={() => navigate("/owner/propertylistings")}>
          Manage Listings</button>
      </div>
    </div>
  );
}

export default Profile;
