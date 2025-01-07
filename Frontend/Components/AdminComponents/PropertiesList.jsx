import React, { useState } from "react";
import "../AdminComponents/AdminCss/PropertiesList.css"; // Importing the custom CSS file for additional styling
import slide1 from "../../Images/slide1.png"; // Import image file

const PropertiesList = () => {
  const [properties, setProperties] = useState([
    { id: 1, title: "Owner name-1", Listed_on: "Date1", Location: "Andheri" },
    { id: 2, title: "Owner name-2", Listed_on: "Date2", Location: "Navi Mumbai" },
    { id: 3, title: "Owner name-3", Listed_on: "Date3", Location: "Juhu" },
  ]);

  // Delete property function
  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((property) => property.id !== id));
  };

  return (
    <div className="container1">
      <h2>Properties Listed by Admin</h2>
      {properties.map((property) => (
        <div key={property.id} className="card1">
          <div className="card-body1">
            <div className="card-details">
              <h5>{property.title}</h5>
              <p>Listed on: {property.Listed_on}</p>
              <p>Location: {property.Location}</p>

              <div className="btn-group">
                <button className="btn1 btn-primary">View Details</button>
                <button
                  className="btn1 btn-danger"
                  onClick={() => deleteProperty(property.id)}
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
      ))}
    </div>
  );
};

export default PropertiesList;
