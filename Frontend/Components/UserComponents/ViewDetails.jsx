import React, { useState, useEffect } from "react";
import '../UserComponents/viewDetailsComponents/VD_CSS/viewdetails.css';
import { Map } from './viewDetailsComponents/Map.jsx';
import { useLocation } from "react-router-dom";
import UserServices from '../../Services/UserServices/uservice.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button ,Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewDetails = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const pid = query.get("id");

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
        const response = await UserServices.getPropertyDetailsByID(pid);
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
        <section id="property-details">
          <h2>Property Details</h2>
          <p><strong>Amenities:</strong> {propertyDetails.amenities}</p>
          <p><strong>Rent:</strong> ₹{propertyDetails.rent}/month</p>
          <p><strong>Deposit:</strong> ₹{propertyDetails.deposit}</p>
          <p><strong>Location:</strong> {propertyDetails.location}</p>
          <p><strong>Type:</strong> {propertyDetails.type}</p>
          <p><strong>Furnished Type:</strong> {propertyDetails.furnishType}</p>
          <p><strong>Nearby Places:</strong> {propertyDetails.nearByPlaces}</p>
          <p><strong>Capacity:</strong> {propertyDetails.capacity}</p>
          <p><strong>Gender:</strong> {propertyDetails.forGender}</p>
        </section>

        <section id="property-details">
          <h2>Owner Details</h2>
          <p><strong>Name: </strong>{Owner.firstName + " " + Owner.lastName}</p>
          <p><strong>Email: </strong>{Owner.email}</p>
          <p><strong>Contact: </strong>{Owner.contact}</p>
        </section>

        <section id="property-details">
          <h2>Property Address</h2>
          <p><strong>AddressLine1: </strong>{address.addressLine1}</p>
          <p><strong>AddressLine2: </strong>{address.addressLine2}</p>
          <p><strong>City: </strong>{address.city}</p>
          <p><strong>State: </strong>{address.state}</p>
          <p><strong>Pincode: </strong>{address.pincode}</p>
        </section>

        <section id="appointment-slots">
          <h2>Available Appointment Slots</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Slot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.apptId}>
                  <td>{appointment.date}</td>
                  <td>{appointment.time} - {appointment.endTime}</td>
                  <td>{appointment.booked ? "Booked" : "Available"}</td>
                  <td>
                    {!appointment.booked && (
                      <button onClick={() => handleShowModal(appointment)}>Book</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Map />

        <div id="add-review">
          <h3>Add a Review</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddReview();
            }}
          >
            <textarea
              placeholder="Your Comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
            ></textarea>
            <input
              type="number"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              value={newReview.ratings}
              onChange={(e) => setNewReview({ ...newReview, ratings: +e.target.value })}
              required
            />
            <div style={{display:"flex", gap:"10px"}}>
              <button type="submit">Submit Reviews</button>
              <button type="submit" onClick={() => setShowReviews(true)}>Show Review</button>
            </div>
            
          </form>
        </div>
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
                  <Card.Text>{review.user.firstName+": "+review.comment}</Card.Text>
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

export default ViewDetails;
