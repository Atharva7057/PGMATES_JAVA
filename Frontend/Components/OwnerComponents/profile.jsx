import React from 'react';
import "./OwnerCSS/profileCss.css";

function Profile() {
  // Static data for the owner
  const owner = {
    name: 'Atharv Patil',
    email: 'atharv@gmail.com',
    contactNumber: '123-456-7890',
    gender: 'Male',
    address: '123 Main St, Springfield, IL',
    profilePicture: 'src/images/image.png', // Add an image path here
    properties: [
      { id: 1, title: '2BHK Apartment in Downtown', location: 'Downtown, Springfield', rent: '$1000/month' },
      { id: 2, title: '3BHK Villa with Garden', location: 'Greenfield, Springfield', rent: '$1500/month' },
    ]
  };

  return (
    <div className="profile-container">
      <h1 id='title'>My Profile</h1>

      <div className="profile-section">
        <div className="profile-info">
          {/* Owner Profile Picture */}
          <img src={owner.profilePicture} alt="Profile" className="profile-pic" />

          {/* Owner Details */}
          <div className="owner-details">
            <h2>{owner.name}</h2>
            <p><strong>Email:</strong> {owner.email}</p>
            <p><strong>Contact Number:</strong> {owner.contactNumber}</p>
            <p><strong>Gender:</strong> {owner.gender}</p>
            <p><strong>Address:</strong> {owner.address}</p>
          </div>
        </div>
      </div>

      {/* Property Listings Section */}
      <div className="property-listings-section">
        <h2>Your Property Listings</h2>
        {owner.properties.length > 0 ? (
          <ul>
            {owner.properties.map(property => (
              <li key={property.id} className="property-item">
                <h3>{property.title}</h3>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Rent:</strong> {property.rent}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no properties listed yet.</p>
        )}
      </div>

      {/* Buttons Section */}
      <div className="settings-section">
        <button className="btn-1">Edit Profile</button>
        <button className="btn-1">Manage Listings</button>
      </div>
    </div>
  );
}

export default Profile;
