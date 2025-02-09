import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Modal from "react-modal"; // Importing react-modal
import "./AdminCss/ManageProperties.css"; // Import the CSS file

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate(); // Define navigate

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/getAllProperties");
      setProperties(response.data.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`http://localhost:8080/admin/deleteProperty/${propertyId}`);
        setProperties(properties.filter((property) => property.propertyId !== propertyId));
        alert("Property deleted successfully.");
      } catch (error) {
        alert("Error deleting the property.");
        console.error("Delete error:", error);
      }
    }
  };

  const markUnavailable = async (propertyId) => {
    try {
      await axios.put(`http://localhost:8080/admin/toggleAvailability/${propertyId}`);
      setProperties(properties.map((property) =>
        property.propertyId === propertyId ? { ...property, isavailable: !property.isavailable } : property
      ));
    } catch (error) {
      alert("Error updating property availability.");
      console.error("Availability error:", error);
    }
  };

  const handleViewDetails = (propertyId) => {
    const selected = properties.find((property) => property.propertyId === propertyId);
    setSelectedProperty(selected);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProperty(null);
  };

  return (
    <div className="container-fluid mt-12">
      <h2 className="text-center mb-4">Listed Properties By Owners</h2>
      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="row">
          {properties.map((property) => (
            <div key={property.propertyId} className="col-md-12 mb-12">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <img
                    src={property.image ? `../Images/${property.image}` : "/default-image.jpg"}
                    alt={property.title}
                    style={{ height: "200px", width: "350px", float: "right", borderRadius: "5px" }}
                  />
                  <h5 className="card-title">{property.location + ", " + property.address.city}</h5>
                  <table className="table" style={{ width: "fit-content" }}>
                    <tbody>
                      <tr>
                        <td>📍 <strong>Address:</strong></td>
                        <td>{property.address.addressLine1}, {property.address.city}</td>
                      </tr>
                      <tr>
                        <td>💰 <strong>Rent:</strong></td>
                        <td>Rs. {property.rent} /Month</td>
                      </tr>
                      <tr>
                        <td>🏦 <strong>Deposit:</strong></td>
                        <td>Rs. {property.deposit}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button onClick={() => navigate(`/admin/property-details?pid=${property.propertyId}`)} className="btn-success">
                    View Details
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for property details */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Property Details" ariaHideApp={false}>
        <h2>Property Details</h2>
        {selectedProperty && (
          <div>
            <div className="property-image">
              <img
                src={selectedProperty.image ? `http://localhost:8080/uploads/${selectedProperty.image}` : "/default-image.jpg"}
                alt="Property"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p><strong>Location:</strong> {selectedProperty.location}</p>
            <p><strong>Rent:</strong> Rs. {selectedProperty.rent}</p>
            <p><strong>Deposit:</strong> Rs. {selectedProperty.deposit}</p>
            <p><strong>Type:</strong> {selectedProperty.type}</p>
            <p><strong>Owner Name:</strong> {selectedProperty.owner.firstName} {selectedProperty.owner.lastName}</p>
            <p><strong>Owner Contact:</strong> {selectedProperty.owner.contact}</p>
            <p><strong>Owner Email:</strong> {selectedProperty.owner.email}</p>
            <p><strong>Capacity:</strong> {selectedProperty.capacity}</p>
            <p><strong>Amenities:</strong> {selectedProperty.amenities}</p>
            <p><strong>Nearby Places:</strong> {selectedProperty.nearByPlaces}</p>
            <p><strong>Furnish Type:</strong> {selectedProperty.furnishType}</p>
            <p><strong>For Gender:</strong> {selectedProperty.forGender}</p>
            <p><strong>Address:</strong> {selectedProperty.address.addressLine1}, {selectedProperty.address.city}, {selectedProperty.address.state}, {selectedProperty.address.pincode}</p>
            <button onClick={closeModal} className="btn btn-secondary">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageProperties;
