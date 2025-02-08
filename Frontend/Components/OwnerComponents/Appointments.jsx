import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal } from "react-bootstrap";
import ownerServices from "../../Services/OwnerServices/ownerServices";
import { toast } from "react-toastify";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await ownerServices.getBookedAppointments();
      setAppointments(response);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    console.log(appointment);
    
    setShowModal(true);
  };

  const confirmCancelAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      console.log("This has to get cancel ",selectedAppointment.apptId);
      
      const cancelResponse = await ownerServices.cancelAppointment(selectedAppointment.apptId);
      console.log(cancelResponse);
      
      toast.success(cancelResponse.message);
      setAppointments(appointments.filter((appt) => appt.apptId !== selectedAppointment.apptId));
      setShowModal(false);
    } catch (error) {
      console.error("Error canceling appointment:", error);
      toast.error("Something went wrong. Try Again!");
    }
  };

  return (
    <Container>
      <h1 className="my-3" style={{ color: "grey" }}>My Booked Appointments</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>End Time</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
              <td>{appt.endTime}</td>
              <td>{appt.user.firstName} {appt.user.lastName}</td>
              <td>{appt.user.email}</td>
              <td>{appt.user.contact}</td>
              <td>
                <button  onClick={() => handleCancelClick(appt)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this appointment?
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setShowModal(false)}>
            No, Keep It
          </button>
          <button variant="danger" onClick={confirmCancelAppointment}>
            Yes, Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Appointments;
