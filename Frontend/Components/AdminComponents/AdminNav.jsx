import React from 'react';
import { Link } from "react-router-dom";
import './AdminCss/AdminNav.css'; // Import the CSS file for styling

function AdminNav() {
  return (
    <div id="admin-nav">
      <div id="nav-links">
        <Link to='/admin/admin-home'>Home</Link>
        <Link to='/admin/dashboard'>Dashboard</Link>
        <Link to='/admin/property-listings'>Properties</Link>
      </div>
    </div>
  );
}

export default AdminNav;
