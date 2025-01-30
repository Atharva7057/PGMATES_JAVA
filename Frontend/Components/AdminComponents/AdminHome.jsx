import React from 'react'
import '../AdminComponents/AdminCss/AdminHome.css'
import Footer from '../Footer';
console.log("on admin ");
const adminName = "Atharva Patil"
function AdminHome() {

  return (
    <>
    <div id="admin-home">
    <div id="welcome-container">
      <h1>Welcome Back, {adminName}!</h1>
      <p>Your dashboard is ready to help you manage the platform efficiently.</p>
      <hr />
      <div id="task-cards">
        <div className="task-card">
          <h3>Active Users</h3>
          <p>View and manage all active users.</p>
        </div>
        <div className="task-card">
          <h3>Property Listings</h3>
          <p>Manage all the property listings from owners.</p>
        </div>
        <div className="task-card">
          <h3>Analytics</h3>
          <p>Monitor platform activity and trends.</p>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default AdminHome
