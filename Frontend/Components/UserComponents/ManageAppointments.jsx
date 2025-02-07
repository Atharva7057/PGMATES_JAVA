import React, { useEffect, useState } from 'react';
import uservice from '../../Services/UserServices/uservice';
import { Button, Table, Container, Modal } from 'react-bootstrap';
import '../../CSS/ManageAppointments.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const result = await uservice.getBookedAppointments();
        setAppointments(result.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Open confirmation modal
  const handleShowModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  // Cancel appointment after confirmation
  const handleCancelConfirm = async () => {
    if (!selectedAppointment) return;
    try {
      await uservice.cancelAppointment(selectedAppointment.apptId);
      toast.success("Appointment Cancelled!");
      
      // Remove canceled appointment from state
      setAppointments((prevAppointments) => 
        prevAppointments.filter((appt) => appt.apptId !== selectedAppointment.apptId)
      );

      setShowModal(false);
    } catch (error) {
      toast.warning("Error Canceling Appointment. Try Again!");
    }
  };

  // Function to handle view details
  const handleViewDetails = (propertyId) => {
    navigate(`/user/view-details?id=${propertyId}`);
  };

  return (
    <Container fluid className="mt-4">
      <ToastContainer />
      <h2 className="text-center">Manage Appointments</h2>
      {appointments.length > 0 ? (
        <Table striped bordered hover responsive className="w-100">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>End Time</th>
              <th>Booked</th>
              <th style={{ width: "250px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.apptId}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.booked ? "✅ Booked" : "❌ Not Booked"}</td>
                <td>
                  <div id='buttons' className="d-flex gap-2">
                    <button variant="info" onClick={() => handleViewDetails(appointment.propertyId)}>
                      View Details
                    </button>
                    <button variant="danger" onClick={() => handleShowModal(appointment)}>
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No appointments booked.</p>
      )}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel the appointment on <strong>{selectedAppointment?.date}</strong> at <strong>{selectedAppointment?.time}</strong>?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between gap-2">
          <button id='model-cancel' onClick={() => setShowModal(false)}>
            No, Keep It
          </button>
          <button id='model-confirm' onClick={handleCancelConfirm}>
            Yes, Cancel It
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageAppointments;
