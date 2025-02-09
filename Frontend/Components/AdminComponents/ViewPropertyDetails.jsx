import React, { useState, useEffect } from "react";
import '../UserComponents/viewDetailsComponents/VD_CSS/viewdetails.css';
import { Map } from '../UserComponents/viewDetailsComponents/Map.jsx';
import { useLocation } from "react-router-dom";
import UserServices from '../../Services/UserServices/uservice.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Card, Container, Row, Col, Table, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import adminServices from "../../Services/AdminServices/adminServices.js";

// import "bootstrap/dist/css/bootstrap.min.css";
const ViewPropertyDetails = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const pid = query.get("pid");

  const [reviews, setReviews] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState({ comment: "", ratings: 0 });
  const [propertyDetails, setPropertyDetails] = useState({});
  const [Owner, setOwner] = useState({});
  const [address, setAddress] = useState({ addressLine1: "", addressLine2: "", city: "", state: "", pincode: "" });

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPropertiesById = async () => {
      try {
        const response = await adminServices.getPropertyDetailsByID(pid);
        console.log(response);
        
        setReviews(response.data.reviews);
        setAppointments(response.data.appointments);
        setOwner(response.data.owner);
        setPropertyDetails(response.data);
        setAddress(response.data.address);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchPropertiesById();
  }, [pid]);

  const handleShowModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedAppointment) return;
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const userID = userDetails.userId;

    try {
      const bookingResponse = await UserServices.bookAppointment(userID, selectedAppointment.apptId);
      toast.success(bookingResponse.data.message);

      // Update the appointments state immediately
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.apptId === selectedAppointment.apptId
            ? { ...appointment, booked: true }
            : appointment
        )
      );
    } catch (error) {
      toast.error("Error booking appointment");
    } finally {
      setShowModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleAddReview = async () => {
    if (newReview.comment && newReview.ratings) {
      const reviewToAdd = { ...newReview, propertyId: propertyDetails.propertyId };
      const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
      reviewToAdd.userId = userDetails.userId;

      try {
        const ReviewAddRes = await UserServices.addReview(reviewToAdd);
        toast.success(ReviewAddRes.data.message);
      } catch (error) {
        toast.error("Error adding review");
      }

      setNewReview({ comment: "", ratings: 0 });
    } else {
      toast.warning("Please fill out all fields.");
    }
  };

  return (
    <>

      <div id="view-details">
        <h2 id="proHeading"> 📝 Property Details</h2>
        <div className="card-body d-flex align-items-center" id='outer'>
          <table className="ManageProperty-table">
            <tbody>
              <tr>
                <td><strong>📍 Location:</strong></td>
                <td>{propertyDetails.location}</td>
              </tr>
              <tr>
                <td><strong>🏠 Type:</strong></td>
                <td>{propertyDetails.type}</td>
              </tr>
              <tr>
                <td><strong>💰 Rent:</strong></td>
                <td>Rs. {propertyDetails.rent}</td>
              </tr>
              <tr>
                <td><strong>🏦 Deposit:</strong></td>
                <td>Rs. {propertyDetails.deposit}</td>
              </tr>
              <tr>
                <td><strong>👨‍👩‍👧‍👦 Capacity:</strong></td>
                <td>{propertyDetails.capacity} persons</td>
              </tr>
              <tr>
                <td><strong>🛏️ Furnish Type:</strong></td>
                <td>{propertyDetails.furnishType}</td>
              </tr>
              <tr>
                <td><strong>🛜 Amenities:</strong></td>
                <td>{propertyDetails.amenities}</td>
              </tr>
              <tr>
                <td><strong>🏥 Nearby Places:</strong></td>
                <td>{propertyDetails.nearByPlaces}</td>
              </tr>
              <tr>
                <td><strong>👤 For:</strong></td>
                <td>{propertyDetails.forGender} </td>
              </tr>
            </tbody>

          </table>

          <img
            src={`../../Images/${propertyDetails.image}`}
            style={{ height: "300px", width: "400px", borderRadius: "5px", marginLeft: "20px" }}
            alt="Room"
          />
        </div>
        

        {/* <Container> */}
      <Row>
        {/* Owner Details */}
        <Col md={6}>
          <h2>Owner Details</h2>
          <Table  hover className="details-table">
            <tbody>
              <tr><td><strong>Name</strong></td><td>{Owner.firstName + " " + Owner.lastName}</td></tr>
              <tr><td><strong>Email</strong></td><td>{Owner.email}</td></tr>
              <tr><td><strong>Contact</strong></td><td>{Owner.contact}</td></tr>
            </tbody>
          </Table>
        </Col>

        {/* Address Details */}
        <Col md={6}>
          <h2> 📍Address</h2>
  
          <Table  hover className="details-table">
            <tbody>
              <tr><td><strong>Address Line 1</strong></td><td>{address.addressLine1}</td></tr>
              <tr><td><strong>Address Line 2</strong></td><td>{address.addressLine2}</td></tr>
              <tr><td><strong>City</strong></td><td>{address.city}</td></tr>
              <tr><td><strong>State</strong></td><td>{address.state}</td></tr>
              <tr><td><strong>Pincode</strong></td><td>{address.pincode}</td></tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    {/* </Container> */}

      
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to book this appointment on <strong>{selectedAppointment?.date}</strong> at <strong>{selectedAppointment?.time}</strong>?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between gap-2">
          <button id="model-cancel" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button id="model-confirm" onClick={handleConfirmBooking}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReviews} onHide={() => setShowReviews(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (


              <Card key={index} className="mb-2">
                <Card.Body>
                  <Card.Text>{review.user.firstName + ": " + review.comment}</Card.Text>
                  <Card.Subtitle className="text-muted">⭐ {review.ratings}/5</Card.Subtitle>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default ViewPropertyDetails;
