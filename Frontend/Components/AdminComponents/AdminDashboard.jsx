
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AdminCss/AdminDashboard.css';
import adminServices from '../../Services/AdminServices/adminServices';
function AdminDashboard() {
  const navigate = useNavigate(); // Create navigate function
  const [activeUsers, setActiveUsers] = useState(0);
  const [activeOwners, setActiveOwners] = useState(0);
  const [listedProperties, setListedProperties] = useState(0);

  const fetchData=async()=>{
    const users = await adminServices.getAllUsers();
    const properties =await adminServices.getAllProperties();
    const owners = await adminServices.getAllOwners();
    console.log(users);
    
    setActiveUsers(users.count);
    setActiveOwners(owners.count);
    setListedProperties(properties.count);
  }
  useEffect(() => {
    try{
      fetchData();
    }catch(error){
      console.log(error);
      
    }
    
  }, []); 

  // Function to navigate to the Users page
  const handleViewUsers = () => {
    navigate('/admin/users'); // Redirect to the users list (make sure this route exists)
  };

  // Function to navigate to the Owners page
  const handleViewOwners = () => {
    navigate('/admin/owners'); // Redirect to the owners list (make sure this route exists)
  };

  // Function to navigate to the Properties page
  const handleViewProperties = () => {
    navigate('/admin/properties'); // Redirect to the properties list (make sure this route exists)
  };

  return (
    <div id="dashboard">
      <div id="dashboard-container">
        <h1>Admin Dashboard</h1>
        <div id="dashboard-stats">
          <div className="stat-card">
            <h3>Active Users</h3>
            <p>{activeUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Active Owners</h3>
            <p>{activeOwners}</p>
          </div>
          <div className="stat-card">
            <h3>Listed Properties</h3>
            <p>{listedProperties}</p>
          </div>
        </div>

        <div id="dashboard-actions">
          <div className="action-card">
            <h3>View Users</h3>
            <p>View and manage all active users.</p>
            <button onClick={handleViewUsers}>View Users</button> {/* Added onClick handler */}
          </div>
          <div className="action-card">
            <h3>Manage Owners</h3> {/* Changed from "Manage Properties" to "Manage Owners" */}
            <p>View and manage all active owners.</p>
            <button onClick={handleViewOwners}>View Owners</button> {/* Added onClick handler */}
          </div>
          <div className="action-card">
            <h3>Manage Properties</h3>
            <p>View and manage property listings.</p>
            <button onClick={handleViewProperties}>View Properties</button> {/* View Properties button */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
