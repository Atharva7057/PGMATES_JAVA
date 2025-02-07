// import React from 'react'
// import './AdminCss/AdminDashboard.css';
// function AdminDashboard() {
//    // Sample data for illustration purposes
//    const activeUsers = 150;
//    const activeOwners = 45;
//    const listedProperties = 120;
 
//    return (
//      <div id="dashboard">
//        <div id="dashboard-container">
//          <h1>Admin Dashboard</h1>
//          <div id="dashboard-stats">
//            <div className="stat-card">
//              <h3>Active Users</h3>
//              <p>{activeUsers}</p>
//            </div>
//            <div className="stat-card">
//              <h3>Active Owners</h3>
//              <p>{activeOwners}</p>
//            </div>
//            <div className="stat-card">
//              <h3>Listed Properties</h3>
//              <p>{listedProperties}</p>
//            </div>
//          </div>
 
//          <div id="dashboard-actions">
//            <div className="action-card">
//              <h3>Manage Users</h3>
//              <p>View and manage all active users.</p>
//              <button>View Users</button>
//            </div>
//            <div className="action-card">
//              <h3>Manage Properties</h3>
//              <p>View and manage property listings.</p>
//              <button>View Properties</button>
//            </div>
//            <div className="action-card">
//              <h3>Analytics</h3>
//              <p>View platform activity and trends.</p>
//              <button>View Analytics</button>
//            </div>
//          </div>
//        </div>
//      </div>
//    );
// }

// export default AdminDashboard


// import React, { useState, useEffect } from 'react';
// import './AdminCss/AdminDashboard.css';

// function AdminDashboard() {
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [activeOwners, setActiveOwners] = useState(0);
//   const [listedProperties, setListedProperties] = useState(0);

//   useEffect(() => {
//     // Fetch all users from the backend
//     fetch('http://localhost:8080/admin/getAllUsers') // Replace with your backend URL
//       .then(response => response.json())
//       .then(data => {
//         // Check if the API response is successful and if the 'users' field exists
//         if (data.message === "Users retrieved successfully" && Array.isArray(data.data)) {
//           setActiveUsers(data.data.length); // Count the number of users
//         } else {
//           console.error('Failed to retrieve users:', data.message);
//         }
//       })
//       .catch(error => console.error('Error fetching users:', error));

//     // Fetch all owners from the backend
//     fetch('http://localhost:8080/admin/getAllOwners') // Replace with your backend URL
//       .then(response => response.json())
//       .then(data => {
//         // Check if the API response is successful and if the 'owners' field exists
//         if (data.message === "Owners retrieved successfully" && Array.isArray(data.data)) {
//           setActiveOwners(data.data.length); // Count the number of owners
//         } else {
//           console.error('Failed to retrieve owners:', data.message);
//         }
//       })
//       .catch(error => console.error('Error fetching owners:', error));

//     // Fetch all properties from the backend
//     fetch('http://localhost:8080/admin/getAllProperties') // Replace with your backend URL
//       .then(response => response.json())
//       .then(data => {
//         // Check if the API response is successful and if the 'data' field exists
//         if (data.message === "Properties retrieved successfully" && Array.isArray(data.data)) {
//           setListedProperties(data.data.length); // Count the number of listed properties
//         } else {
//           console.error('Failed to retrieve properties:', data.message);
//         }
//       })
//       .catch(error => console.error('Error fetching properties:', error));
//   }, []); // Empty dependency array to run only once on component mount

//   return (
//     <div id="dashboard">
//       <div id="dashboard-container">
//         <h1>Admin Dashboard</h1>
//         <div id="dashboard-stats">
//           <div className="stat-card">
//             <h3>Active Users</h3>
//             <p>{activeUsers}</p>
//           </div>
//           <div className="stat-card">
//             <h3>Active Owners</h3>
//             <p>{activeOwners}</p>
//           </div>
//           <div className="stat-card">
//             <h3>Listed Properties</h3>
//             <p>{listedProperties}</p>
//           </div>
//         </div>

//         <div id="dashboard-actions">
//           <div className="action-card">
//             <h3>Manage Users</h3>
//             <p>View and manage all active users.</p>
//             <button>View Users</button>
//           </div>
//           <div className="action-card">
//             <h3>Manage Properties</h3>
//             <p>View and manage property listings.</p>
//             <button>View Properties</button>
//           </div>
//           <div className="action-card">
//             <h3>Analytics</h3>
//             <p>View platform activity and trends.</p>
//             <button>View Analytics</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AdminCss/AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate(); // Create navigate function
  const [activeUsers, setActiveUsers] = useState(0);
  const [activeOwners, setActiveOwners] = useState(0);
  const [listedProperties, setListedProperties] = useState(0);

  useEffect(() => {
    // Fetch all users from the backend
    fetch('http://localhost:8080/admin/getAllUsers') // Replace with your backend URL
      .then(response => response.json())
      .then(data => {
        // Check if the API response is successful and if the 'data' field exists
        if (data.message === "Users retrieved successfully" && Array.isArray(data.data)) {
          setActiveUsers(data.data.length); // Count the number of users
        } else {
          console.error('Failed to retrieve users:', data.message);
        }
      })
      .catch(error => console.error('Error fetching users:', error));

    // Fetch all owners from the backend
    fetch('http://localhost:8080/admin/getAllOwners') // Replace with your backend URL
      .then(response => response.json())
      .then(data => {
        // Check if the API response is successful and if the 'data' field exists
        if (data.message === "Owners retrieved successfully" && Array.isArray(data.data)) {
          setActiveOwners(data.data.length); // Count the number of owners
        } else {
          console.error('Failed to retrieve owners:', data.message);
        }
      })
      .catch(error => console.error('Error fetching owners:', error));

    // Fetch all properties from the backend
    fetch('http://localhost:8080/admin/getAllProperties') // Replace with your backend URL
      .then(response => response.json())
      .then(data => {
        console.log('Properties data:', data); // Log data to check structure

        // Check if the API response is successful and if the 'data' field exists
        if (data.message === "Properties retrieved successfully" && Array.isArray(data.data)) {
          setListedProperties(data.data.length); // Count the number of listed properties
        } else {
          console.error('Failed to retrieve properties:', data.message);
        }
      })
      .catch(error => console.error('Error fetching properties:', error));
  }, []); // Empty dependency array to run only once on component mount

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
