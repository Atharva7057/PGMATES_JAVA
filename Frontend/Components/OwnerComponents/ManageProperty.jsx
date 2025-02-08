import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ownerServices from '../../Services/OwnerServices/ownerServices.js';
import '../OwnerComponents/OwnerCSS/ManageProperty.css';
import AppointmentsView from './AppointmentsView.jsx';
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import PropertyReviews from './PropertyReviews.jsx';

function ManageProperty() {
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const pid = query.get("propertyId");
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const ownerid = userDetails.userId;

    const [reviews, setReviews] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [address, setAddress] = useState({ addressLine1: "", addressLine2: "", city: "", state: "", pincode: "" });
    const [propertyDetails, setPropertyDetails] = useState({});
    const [show, setShow] = useState(false);
    const [slot, setSlot] = useState({ date: "", time: "", endTime: "", property: parseInt(pid), owner: ownerid, isBooked: false,apptId:0 });
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (appointment = null) => {
        if (appointment) {
            console.log("appointment in update", appointment);
            
            setSlot({
                date: appointment.date,
                time: appointment.time,
                endTime: appointment.endTime,
                property: pid, // Ensure property ID is maintained
                owner: ownerid,
                isBooked: false,
                apptId:appointment.apptId
            });
            setIsEditing(true);
        } else {
            setSlot({ date: "", time: "", endTime: "", property: parseInt(pid), owner: ownerid, isBooked: false });
            setIsEditing(false);
        }
        setShow(true);
    };
    

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await ownerServices.getPropertyDetails(pid);
                setPropertyDetails(response);
                setAddress(response.address);
                setAppointments(response.appointments);
                setReviews(response.reviews);
            } catch (error) {
                console.error("Error fetching property details:", error);
            }
        };

        if (pid) {
            fetchPropertyDetails();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSlot(prevSlot => ({ ...prevSlot, [name]: value }));
    };

    const handleRemoveSlot = async (appointmentId) => {
        try {
            const response = await ownerServices.removeAppointmentSlot(appointmentId);
            setAppointments(prevAppointments =>
                prevAppointments.filter(appointment => appointment.apptId !== appointmentId)
            );
            toast.success(response.message);

        } catch (error) {
            toast.error("Error Removing Slot. Try Again!");
        }

    };

    const handleSubmit = async () => {
        let newErrors = {};
        if (!slot.date) newErrors.date = "Date is required.";
        if (!slot.time) newErrors.time = "Start time is required.";
        if (!slot.endTime) newErrors.endTime = "End time is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            if (isEditing) {
                // Update existing slot
                const updateResponse = await ownerServices.updateAppointmentSlot(slot.apptId,slot);
                console.log(slot.apptId,slot);
                
                toast.success(updateResponse.message);

                // Update the state without refresh
                setAppointments(prevAppointments =>
                    prevAppointments.map(appt => appt.apptId === slot.apptId ? slot : appt)
                );

            } else {
                // Add new slot
                const addResponse = await ownerServices.addAppointmentSlot(slot);
                toast.success(addResponse.message);

                // Update the state without refresh
                setAppointments(prevAppointments => [...prevAppointments, slot]);
            }

            handleClose();
        } catch (error) {
            toast.error(isEditing ? "Error updating slot" : "Error adding slot");
        }
    };


    return (
        <>
            <h1 id='heading'>Manage Property</h1>
            <hr />
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Appointment Slot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Date Input */}
                        <Form.Group controlId="date">
                            <Form.Label><strong>Date:</strong></Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={slot.date}   // Prefilled when editing
                                onChange={handleInputChange}
                                min={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="time">
                            <Form.Label><strong>Start Time:</strong></Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={slot.time}   // Prefilled when editing
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="endTime">
                            <Form.Label><strong>End Time:</strong></Form.Label>
                            <Form.Control
                                type="time"
                                name="endTime"
                                value={slot.endTime}   // Prefilled when editing
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>
                        Close
                    </button>
                    <button onClick={handleSubmit} id={isEditing ? "update-btn" : "submit-btn"} >
                        {isEditing ? "Update" : "Add Slot"}
                    </button>
                </Modal.Footer>
            </Modal>

            <AppointmentsView
                appointments={appointments}
                onAddSlot={() => handleShow()}
                onUpdateSlot={handleShow}
                onRemoveSlot={handleRemoveSlot}
            />

            <PropertyReviews reviews = {reviews}/>
        </>
    );
}

export default ManageProperty;
