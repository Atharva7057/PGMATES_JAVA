import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OwnerCSS/PropertyListings.css";
import OwnerServices from "../../Services/OwnerServices/ownerServices.js";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from 'react-toastify';

const PropertyListings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [show, setShow] = useState(false);
  const [deletePropertyId, setDeletePropertyId] = useState(null);
  const [Availability, setAvailability] = useState();
  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesData = await OwnerServices.getAllPropertiesByOwner();
      setProperties(propertiesData);
    };
    fetchProperties();
  }, []);

  const deleteProperty = (id) => {
    console.log("Delete property with ID:", id);
    setDeletePropertyId(id);  // Store the ID first
    handleShow();

  };

  const updateProperty = (id) => {
    console.log("in update property", id);

    navigate(`UpdateProperty?pid=${id}`);
  };

  const markUnavailable = async (id) => {
    console.log("Mark property as unavailable with ID:", id);
    try {
      const availabilityResponse = await OwnerServices.toggleAvailability(id);
      console.log(availabilityResponse.message);

      toast.success(availabilityResponse.message);
      // setAvailability(availabilityResponse.availability);
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.propertyId === id
            ? { ...property, isavailable: availabilityResponse.availability }
            : property
        )
      );
    } catch (error) {
      if (Availability) {
        toast.error("Error Marking Unavailable");
      } else {
        toast.error("Error Marking available")
      }

    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmDelete = async () => {
    if (!deletePropertyId) return;

    try {
      const deleteResponse = await OwnerServices.deleteProperty(deletePropertyId);
      toast.success(deleteResponse.message);

      // Remove the deleted property from state
      setProperties(properties.filter(property => property.propertyId !== deletePropertyId));
    } catch (error) {
      toast.error("Error Deleting Property");
    }

    setDeletePropertyId(null);
    handleClose();
  }

  return (
    <>
      <div className="container-fluid mt-12">
        <h2 className="text-center mb-12">Your Listed Properties</h2>
        <div className={`row ${properties.length === 1 ? "d-flex justify-content-center" : ""}`}>
          {properties.map((property) => (
            <div id="outer-container">


              <div key={property.id} className="col-md-12 mb-3">
                <div className="card shadow-sm h-100">

                  <div className="card-body">
                    <img
                      src={`../../Images/${property.image}`}
                      // className="card-img-top"
                      alt={property.title}
                      style={{ height: "150px", width: "250px", float: "right", borderRadius: "5px" }}
                    />
                    <h5 className="card-title">{property.location + "," + property.address.city}</h5>
                    <table className="table" style={{ width: "fit-content" }}>
                      <tbody>
                        <tr>
                          <td>📍 <strong>Address:</strong></td>
                          <td>
                            {property.address.addressLine1 + ", " +
                              property.address.addressLine2 + ", " +
                              property.address.city}
                          </td>
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
                    <button onClick={() => navigate(`/owner/UpdateProperty?pid=${property.propertyId}`)} className="btn-primary">
                      Update
                    </button>
                    <button onClick={() => deleteProperty(property.propertyId)}>
                      Delete
                    </button>
                    <button
                      onClick={() => markUnavailable(property.propertyId)}
                      className={property.isavailable ? "btn-danger" : "btn-success"}
                    >
                      {property.isavailable ? "Mark Unavailable" : "Mark Available"}
                    </button>
                    <button onClick={() => navigate(`/owner/ManageProperty?propertyId=${property.propertyId}`)} className="btn-primary">
                      Manage Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: "red", fontWeight: "bolder" }}>Are You Sure You Want To Delete This Property?
            All the data will be lost forever.
          </p>

        </Modal.Body>
        <Modal.Footer>
          <button onClick={confirmDelete}>confirm</button>
          <button onClick={handleClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </>



  );
};

export default PropertyListings;
