import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminCss/ManageOwners.css';

const ManageOwners = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to fetch owners
  const fetchOwners = () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    setError('');
    axios
      .get('http://localhost:8080/admin/getAllOwners', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data && response.data.message === 'Owners retrieved successfully') {
          setOwners(response.data.data);
        } else {
          setError('Failed to load owners. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error fetching owners:', error);
        setError('There was an error fetching the owner data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const deleteOwner = (ownerId) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this owner?')) {
      axios
        .delete(`http://localhost:8080/admin/deleteOwner/${ownerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          fetchOwners(); // Re-fetch the list of owners after deletion
        })
        .catch((error) => {
          console.error('Error deleting owner:', error);
          alert('There was an error deleting the owner.');
        });
    }
  };

  const handleViewDetails = (ownerId) => {
    const selectedOwner = owners.find((owner) => owner.userId === ownerId);
    if (selectedOwner) {
      setSelectedOwner(selectedOwner);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOwner(null);
  };

  return (
    <div className="container">
      <h2>Manage Owners</h2>
      {loading && <p>Loading owners...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.length === 0 ? (
              <tr>
                <td colSpan="4">No owners found.</td>
              </tr>
            ) : (
              owners.map((owner) => (
                <tr key={owner.userId}>
                  <td>{owner.userId}</td>
                  <td>{owner.firstName} {owner.lastName}</td>
                  <td>{owner.email}</td>
                  <td>
                    <button onClick={() => handleViewDetails(owner.userId)}>View Details</button>
                    <button onClick={() => deleteOwner(owner.userId)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Modal for Owner Details */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Owner Details" ariaHideApp={false}>
        <h2>Owner Details</h2>
        {selectedOwner && (
          <div>
            <p><strong>Name:</strong> {selectedOwner.firstName} {selectedOwner.lastName}</p>
            <p><strong>Email:</strong> {selectedOwner.email}</p>
            <p><strong>Contact:</strong> {selectedOwner.contact}</p>
            <p><strong>Gender:</strong> {selectedOwner.gender}</p>
            {selectedOwner.address && <p><strong>Address:</strong> {selectedOwner.address}</p>}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageOwners;
