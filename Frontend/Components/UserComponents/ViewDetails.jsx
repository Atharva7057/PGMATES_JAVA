import React, { useState,useEffect } from "react";
import '../UserComponents/viewDetailsComponents/VD_CSS/viewdetails.css';
import { Map } from './viewDetailsComponents/Map.jsx';
import { useLocation } from "react-router-dom";
import UserServices from '../../Services/UserServices/uservice.js'
const ViewDetails = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const pid = query.get("id")

  const [reviews, setReviews] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showReviews, setShowReviews] = useState(false); 
  const [newReview, setNewReview] = useState({ name: "", comment: "", rating: 0 }); 
  const [propertyDetails, setPropertyDetails] = useState({}); 
  const [Owner,setOwner] = useState({});
  
  // const bookSlot = (id) => {
  //   setAppointments((prev) =>
  //     prev.map((appointment) =>
  //       appointment.id === id ? { ...appointment, booked: true } : appointment
  //     )
  //   );
  //   alert("Slot booked successfully!");
  // };

  const handleAddReview = () => {
    if (newReview.name && newReview.comment && newReview.rating) {
      setReviews((prev) => [
        ...prev,
        { id: prev.length + 1, ...newReview },
      ]);
      console.log(newReview);
      
      setNewReview({ name: "", comment: "", rating: 0 }); // Reset form
      alert("Review added successfully!");
    } else {
      alert("Please fill out all fields.");
    }
  };


  useEffect(() => {
    const fetchPropertiesById = async () => {
      try {
        const response = await UserServices.getPropertyDetailsByID(pid);
        console.log(response.data);
        setReviews(response.data.reviews);
        setAppointments(response.data.appointments);
        setOwner(response.data.owner);
        
        setPropertyDetails(response.data); 
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchPropertiesById();
  
    
  }, [pid]);

  return (
    <>
      <div id="view-details">
        <section id="property-details">
          <h2>Property Details</h2>
          <p><strong>Amenities:</strong>{propertyDetails.amenities}</p>
          <p><strong>Rent:</strong> ₹{propertyDetails.rent}/month</p>
          <p><strong>Deposit:</strong> ₹{propertyDetails.deposit}</p>
          <p><strong>Location:</strong> {propertyDetails.location}</p>
          <p><strong>Type:</strong> {propertyDetails.type}</p>
          <p><strong>Furnished Type:</strong> {propertyDetails.furnishType}</p>
          <p><strong>Nearby Places:</strong>{propertyDetails.nearByPlaces}</p>
          <p><strong>Capacity:</strong>{propertyDetails.capacity}</p>
          <p><strong>Gender:</strong>{propertyDetails.forGender}</p>
        </section>

        <section id="property-details">
          <h2>Owner Details</h2>
          <p><strong>Name: </strong>{Owner.fullName}</p>
          <p><strong>Email: </strong>{Owner.email}</p>
          <p><strong>Contact: </strong>{Owner.contact}</p>
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
                <tr key={appointment.id}>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}-{appointment.endTime}</td>
                  <td>{appointment.booked ? "Booked" : "Available"}</td>
                  <td>
                    {!appointment.booked && (
                      <button /*onClick={() => bookSlot(appointment.id)}*/>Book</button>
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
            <input
              type="text"
              placeholder="Your Name"
              value={newReview.name}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <textarea
              placeholder="Your Comment"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              required
            ></textarea>
            <input
              type="number"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, rating: +e.target.value }))
              }
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
        <section id="reviews">
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => setShowReviews(!showReviews)}
          >
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </h2>

          {showReviews && (
            <>
              <ul>
                {reviews.map((review) => (
                  <li key={review.id}>
                    <p><strong>{review.user.fullName}:</strong> {review.comment}</p>
                    <p>Rating: {review.ratings} ⭐</p>
                  </li>
                ))}
              </ul>


            </>
          )}
        </section>
      </div>
    </>
  );
};

export default ViewDetails;
