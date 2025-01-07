
import React, { useState } from "react";
import "./OwnerCSS/PropertyListings.css";

const PropertyListings = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "3BHK Apartment in Downtown",
      status: "Available",
      price: "$500,000",
      area: "1200 sqft",
      description:
        "A spacious 3BHK apartment with modern amenities in the heart of Downtown.",
    },
    {
      id: 2,
      title: "2BHK Villa with Garden",
      status: "Available",
      price: "$350,000",
      area: "1500 sqft",
      description:
        "A beautiful 2BHK villa with a garden and quiet surroundings perfect for families.",
    },
    {
      id: 3,
      title: "Luxury Penthouse in City Center",
      status: "Available",
      price: "$1,200,000",
      area: "2500 sqft",
      description:
        "A luxurious penthouse with stunning city views and top-notch facilities.",
    },
  ]);

  const markUnavailable = (id) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === id ? { ...property, status: "Unavailable" } : property
      )
    );
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((property) => property.id !== id));
  };

  const updateProperty = (id) => {
    const updatedTitle = prompt("Enter the new title for the property:");
    setProperties((prev) =>
      prev.map((property) =>
        property.id === id ? { ...property, title: updatedTitle } : property
      )
    );
  };

  return (
    <div className="container">
      <h2>Properties Listed by You</h2>
      <div className="property-cards">
        {properties.map((property) => (
          <div key={property.id} className="card">
            <div className="card-body">
              <h5 className="card-title">{property.title}</h5>
              <p className="card-text">
                <strong>Status:</strong> {property.status}
              </p>
              <p className="card-text">
                <strong>Price:</strong> {property.price}
              </p>
              <p className="card-text">
                <strong>Area:</strong> {property.area}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {property.description}
              </p>
              <button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
                onClick={() => updateProperty(property.id)}
              >
                Update
              </button>

              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
                onClick={() => deleteProperty(property.id)}
              >
                Delete
              </button>

              <button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
                onClick={() => markUnavailable(property.id)}
              >
                Mark as Unavailable
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListings;
