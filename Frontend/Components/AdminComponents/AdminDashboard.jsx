import React from 'react'
import './AdminCss/AdminDashboard.css';
function AdminDashboard() {
   // Sample data for illustration purposes
   const activeUsers = 150;
   const activeOwners = 45;
   const listedProperties = 120;
 
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
             <h3>Manage Users</h3>
             <p>View and manage all active users.</p>
             <button>View Users</button>
           </div>
           <div className="action-card">
             <h3>Manage Properties</h3>
             <p>View and manage property listings.</p>
             <button>View Properties</button>
           </div>
           <div className="action-card">
             <h3>Analytics</h3>
             <p>View platform activity and trends.</p>
             <button>View Analytics</button>
           </div>
         </div>
       </div>
     </div>
   );
}

export default AdminDashboard
