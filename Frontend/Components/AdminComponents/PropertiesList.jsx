import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminComponents/AdminCss/ManageProperties.css"; // Import the custom CSS file for additional styling
import slide1 from "../../Images/slide1.png"; // Import image file

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null); // State to store selected property details
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // To control visibility of the modal

  // Fetch properties on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/getAllProperties")  // Replace with your API URL
      .then((response) => {
        setProperties(response.data.data);  // Populate properties from API response
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching properties!", error);
        setLoading(false);  // Stop loading even in case of error
      });
  }, []);

  // Delete property handler
  const deleteProperty = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      axios
        .delete(`http://localhost:8080/admin/deleteProperty/${id}`)  // Replace with your API URL
        .then((response) => {
          alert(response.data.message);
          setProperties(properties.filter((property) => property.propertyId !== id));  // Remove deleted property
        })
        .catch((error) => {
          alert("There was an error deleting the property.");
        });
    }
  };

  // Handle View Details (fetch detailed information about the property)
  const handleViewDetails = (propertyId) => {
    axios
      .get(`http://localhost:8080/admin/getPropertyDetails/${propertyId}`)  // Replace with your API URL
      .then((response) => {
        setSelectedProperty(response.data.data[0]);  // Assuming the response contains a property object in 'data'
        setIsDetailsVisible(true);  // Show the modal with details
      })
      .catch((error) => {
        console.error("There was an error fetching property details!", error);
      });
  };

  // Close the property details view
  const handleCloseDetails = () => {
    setIsDetailsVisible(false);
    setSelectedProperty(null);
  };

  return (
    <div className="container1">
      <h2>Manage Properties</h2>

      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <div>
          {properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            properties.map((property) => (
              <div key={property.propertyId} className="card1">
                <div className="card-body1">
                  <div className="card-details">
                    <h5>{property.location}</h5>
                    <p>Listed on: {property.Listed_on}</p>
                    <p>Location: {property.location}</p>

                    <div className="btn-group">
                      <button
                        className="btn1 btn-primary"
                        onClick={() => handleViewDetails(property.propertyId)}
                      >
                        View Details
                      </button>
                      <button
                        className="btn1 btn-danger"
                        onClick={() => deleteProperty(property.propertyId)}
                      >
                        Delete Property
                      </button>
                    </div>
                  </div>

                  <div className="img-box">
                    <img src={slide1} alt="Property Image" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Property Details Modal */}
      {isDetailsVisible && selectedProperty && (
        <div className="property-details-modal">
          <div className="property-details">
            <h3>Property Details</h3>
            <button className="close-btn" onClick={handleCloseDetails}>
              Close
            </button>
            <p><strong>Location:</strong> {selectedProperty.location}</p>
            <p><strong>Rent:</strong> ${selectedProperty.rent}</p>
            <p><strong>Deposit:</strong> ${selectedProperty.deposit}</p>
            <p><strong>Type:</strong> {selectedProperty.type}</p>
            <p><strong>Owner:</strong> {selectedProperty.owner.firstName} {selectedProperty.owner.lastName}</p>
            <p><strong>Contact:</strong> {selectedProperty.owner.contact}</p>
            <p><strong>Email:</strong> {selectedProperty.owner.email}</p>
            <p><strong>Amenities:</strong> {selectedProperty.amenities}</p>
            <p><strong>Capacity:</strong> {selectedProperty.capacity}</p>
            <p><strong>For Gender:</strong> {selectedProperty.forGender}</p>
            <p><strong>Furnish Type:</strong> {selectedProperty.furnishType}</p>
            <p><strong>Nearby Places:</strong> {selectedProperty.nearByPlaces}</p>
            <p><strong>Address:</strong> {selectedProperty.address.addressLine1}, {selectedProperty.address.addressLine2}, {selectedProperty.address.city}, {selectedProperty.address.state}, {selectedProperty.address.pincode}</p>
            <img src={selectedProperty.image} alt="Property" style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProperties;
