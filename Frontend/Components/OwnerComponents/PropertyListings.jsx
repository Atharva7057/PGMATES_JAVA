import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OwnerCSS/PropertyListings.css";
import OwnerServices from "../../Services/OwnerServices/ownerServices.js";
import image from '../../Images/room.jpg';
const PropertyListings = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesData = await OwnerServices.getAllPropertiesByOwner();
      setProperties(propertiesData);
    };
    fetchProperties();
  }, []);

  const deleteProperty = (id) => {
    console.log("Delete property with ID:", id);
  };

  const updateProperty = (id) => {
    console.log("Update property with ID:", id);
  };

  const markUnavailable = (id) => {
    console.log("Mark property as unavailable with ID:", id);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Listed Properties</h2>
      <div className="row">
        {properties.map((property) => (
        <div id="outer-container">

        
          <div key={property.id} className="col-md-12 mb-12">
            <div className="card shadow-sm h-100">
              
              <div className="card-body">
              <img
                src={image}
                // className="card-img-top"
                alt={property.title}
                style={{height:"150px", width:"250px", float:"right", borderRadius:"5px"}}
              />
                <h5 className="card-title">{property.location+","+property.address.city}</h5>
                <p className="card-text">
                  <strong>Address:</strong> {property.address.addressLine1+","+property.address.addressLine1+","+property.address.addressLine2+"," +property.address.city}
                </p>
                <p className="card-text">
                  <strong>Rent:</strong>Rs. {property.rent} 
                </p>
                <p className="card-text">
                  <strong>Deposit:</strong> {property.deposit} 
                </p>
                
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button onClick={() => updateProperty(property.id)} className="btn-primary">
                  Update
                </button>
                <button  onClick={() => deleteProperty(property.id)}>
                  Delete
                </button>
                <button  onClick={() => markUnavailable(property.id)} className="btn-warning">
                  Unavailable
                </button>
                <button  onClick={() => markUnavailable(property.id)} className="btn-primary">
                  Manage Property
                </button>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListings;
