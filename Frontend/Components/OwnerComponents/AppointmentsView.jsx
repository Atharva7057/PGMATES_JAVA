import React from "react";
import '../OwnerComponents/OwnerCSS/AppointmentView.css';

function AppointmentsView({ appointments, onAddSlot, onUpdateSlot, onRemoveSlot }) {

    

    return (
        <div className="appointment-container">
            <h2>📅 Appointments</h2>
            <button onClick={onAddSlot} id="addslotbutton" className="add-slot-btn">
                ➕ Add Appointment Slot
            </button>

            <table className="appointment-table">
                <thead>
                    <tr>
                        <th>Date 📅</th>
                        <th>Start Time ⏰</th>
                        <th>End Time ⏳</th>
                        <th>Actions ⚙️</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="no-data">No appointments slots added</td>
                        </tr>
                    ) : (
                        appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.endTime}</td>
                                <td>
                                    <button className="update-btn" onClick={() => onUpdateSlot(appointment)}>✏️ Update</button>
                                    <button className="remove-btn" onClick={() => onRemoveSlot(appointment.apptId)}>🗑️ Remove</button>

                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentsView;
