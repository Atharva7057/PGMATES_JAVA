import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import './AdminCss/AdminNav.css'; // Import the CSS file for styling

function AdminNav() {
  const navigate = useNavigate();
  return (
    <div id="admin-nav">
      <div id="nav-links">
        <Link to='/admin/admin-home'>Home</Link>
        <Link to='/admin/dashboard'>Dashboard</Link>
        <Link to='/admin/properties'>Properties</Link>
        <button onClick={()=>{sessionStorage.clear();navigate('/login?isLogin=true')} } style={{padding:"3px 10px"}}>Logout</button>
      </div>
    </div>
  );
}

export default AdminNav;
