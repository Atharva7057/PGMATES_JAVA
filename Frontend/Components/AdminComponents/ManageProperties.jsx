// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from "react-modal"; // Importing react-modal
// import "./AdminCss/ManageProperties.css"; // Import the CSS file

// const ManageProperties = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProperty, setSelectedProperty] = useState(null); // To store the selected property details
//   const [modalIsOpen, setModalIsOpen] = useState(false); // To manage modal visibility

//   // Fetch all properties on component mount
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/admin/getAllProperties")
//       .then((response) => {
//         setProperties(response.data.data); // Extract property data from response
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching properties!", error);
//         setLoading(false); // Stop loading even in case of error
//       });
//   }, []);

//   // Function to open modal with selected property details
//   const handleViewDetails = (propertyId) => {
//     const selected = properties.find((property) => property.propertyId === propertyId);
//     setSelectedProperty(selected); // Set the selected property
//     setModalIsOpen(true); // Open the modal
//   };

//   // Delete property handler
//   const handleDeleteProperty = (propertyId) => {
//     if (window.confirm("Are you sure you want to delete this property?")) {
//       axios
//         .delete(`http://localhost:8080/admin/deleteProperty/${propertyId}`)
//         .then((response) => {
//           alert(response.data.message); // Show success message
//           setProperties(properties.filter((property) => property.propertyId !== propertyId)); // Remove deleted property from the list
//         })
//         .catch((error) => {
//           alert("There was an error deleting the property.");
//         });
//     }
//   };

//   // Close modal
//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedProperty(null); // Clear the selected property when modal closes
//   };

//   return (
//     <div className="manage-properties-container">
//       <h2>Manage Properties</h2>
//       {loading ? (
//         <p className="loading-message">Loading properties...</p>
//       ) : (
//         <div>
//           {properties.length === 0 ? (
//             <p className="no-properties">No properties found.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Property ID</th>
//                   <th>Location</th>
//                   <th>Rent</th>
//                   <th>Type</th>
//                   <th>Capacity</th>
//                   <th>Amenities</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {properties.map((property) => (
//                   <tr key={property.propertyId}>
//                     <td>{property.propertyId}</td>
//                     <td>{property.location}</td>
//                     <td>${property.rent}</td>
//                     <td>{property.type}</td>
//                     <td>{property.capacity}</td>
//                     <td>{property.amenities}</td>
//                     <td>
//                       <button onClick={() => handleViewDetails(property.propertyId)}>View Details</button>
//                       <button onClick={() => handleDeleteProperty(property.propertyId)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {/* Modal for property details */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Property Details"
//         ariaHideApp={false} // Required to make it work with react-modal
//       >
//         <h2>Property Details</h2>
//         {selectedProperty && (
//           <div>
//             <p><strong>Location:</strong> {selectedProperty.location}</p>
//             <p><strong>Rent:</strong> ${selectedProperty.rent}</p>
//             <p><strong>Deposit:</strong> ${selectedProperty.deposit}</p>
//             <p><strong>Type:</strong> {selectedProperty.type}</p>
//             <p><strong>Owner Name:</strong> {selectedProperty.owner.firstName} {selectedProperty.owner.lastName}</p>
//             <p><strong>Owner Contact:</strong> {selectedProperty.owner.contact}</p>
//             <p><strong>Owner Email:</strong> {selectedProperty.owner.email}</p>
//             <p><strong>Capacity:</strong> {selectedProperty.capacity}</p>
//             <p><strong>Amenities:</strong> {selectedProperty.amenities}</p>
//             <p><strong>Nearby Places:</strong> {selectedProperty.nearByPlaces}</p>
//             <p><strong>Furnish Type:</strong> {selectedProperty.furnishType}</p>
//             <p><strong>For Gender:</strong> {selectedProperty.forGender}</p>
//             <p><strong>Address:</strong> {selectedProperty.address.addressLine1}, {selectedProperty.address.addressLine2}, {selectedProperty.address.city}, {selectedProperty.address.state}, {selectedProperty.address.pincode}</p>
//             <button onClick={closeModal}>Close</button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ManageProperties;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal"; // Importing react-modal
import "./AdminCss/ManageProperties.css"; // Import the CSS file

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null); // To store the selected property details
  const [modalIsOpen, setModalIsOpen] = useState(false); // To manage modal visibility

  // Fetch all properties on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/getAllProperties")
      .then((response) => {
        setProperties(response.data.data); // Extract property data from response
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching properties!", error);
        setLoading(false); // Stop loading even in case of error
      });
  }, []);

  // Function to open modal with selected property details
  const handleViewDetails = (propertyId) => {
    const selected = properties.find((property) => property.propertyId === propertyId);
    setSelectedProperty(selected); // Set the selected property
    setModalIsOpen(true); // Open the modal
  };

  // Delete property handler
  const handleDeleteProperty = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      axios
        .delete(`http://localhost:8080/admin/deleteProperty/${propertyId}`)
        .then((response) => {
          alert(response.data.message); // Show success message
          setProperties(properties.filter((property) => property.propertyId !== propertyId)); // Remove deleted property from the list
        })
        .catch((error) => {
          alert("There was an error deleting the property.");
        });
    }
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProperty(null); // Clear the selected property when modal closes
  };

  return (
    <div className="manage-properties-container">
      <h2>Manage Properties</h2>
      {loading ? (
        <p className="loading-message">Loading properties...</p>
      ) : (
        <div>
          {properties.length === 0 ? (
            <p className="no-properties">No properties found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Property ID</th>
                  <th>Location</th>
                  <th>Rent</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Amenities</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.propertyId}>
                    <td>{property.propertyId}</td>
                    <td>{property.location}</td>
                    <td>${property.rent}</td>
                    <td>{property.type}</td>
                    <td>{property.capacity}</td>
                    <td>{property.amenities}</td>
                    <td>
                      <button onClick={() => handleViewDetails(property.propertyId)}>View Details</button>
                      <button onClick={() => handleDeleteProperty(property.propertyId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal for property details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Property Details"
        ariaHideApp={false} // Required to make it work with react-modal
      >
        <h2>Property Details</h2>
        {selectedProperty && (
          <div>
            {/* Displaying Property Image */}
            <div className="property-image">
              <img
                src={selectedProperty.image ? `http://localhost:8080/uploads/${selectedProperty.image}` : "/default-image.jpg"} // Default fallback image
                alt="Property"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p><strong>Location:</strong> {selectedProperty.location}</p>
            <p><strong>Rent:</strong> ${selectedProperty.rent}</p>
            <p><strong>Deposit:</strong> ${selectedProperty.deposit}</p>
            <p><strong>Type:</strong> {selectedProperty.type}</p>
            <p><strong>Owner Name:</strong> {selectedProperty.owner.firstName} {selectedProperty.owner.lastName}</p>
            <p><strong>Owner Contact:</strong> {selectedProperty.owner.contact}</p>
            <p><strong>Owner Email:</strong> {selectedProperty.owner.email}</p>
            <p><strong>Capacity:</strong> {selectedProperty.capacity}</p>
            <p><strong>Amenities:</strong> {selectedProperty.amenities}</p>
            <p><strong>Nearby Places:</strong> {selectedProperty.nearByPlaces}</p>
            <p><strong>Furnish Type:</strong> {selectedProperty.furnishType}</p>
            <p><strong>For Gender:</strong> {selectedProperty.forGender}</p>
            <p><strong>Address:</strong> {selectedProperty.address.addressLine1}, {selectedProperty.address.addressLine2}, {selectedProperty.address.city}, {selectedProperty.address.state}, {selectedProperty.address.pincode}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageProperties;
