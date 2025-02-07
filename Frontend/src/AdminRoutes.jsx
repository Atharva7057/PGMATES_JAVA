// // import React from 'react';
// import React, { useEffect, useState } from 'react';
// import { Route, Routes, Outlet,useNavigate } from 'react-router-dom';
// import AdminHome from '../Components/AdminComponents/AdminHome.jsx';
// import AdminNav from '../Components/AdminComponents/AdminNav.jsx';
// import AdminDashboard from '../Components/AdminComponents/AdminDashboard.jsx';
// import PropertiesList from '../Components/AdminComponents/PropertiesList.jsx';
// import AccessDenied from '../src/AccessDenied.jsx';
// import UserLogin from '../Components/Login.jsx';
// // This is Admin ROutes
// const AdminLayout = () => (
//   <>
//     <AdminNav />
//     <Outlet />
//   </>
// );

// function AdminRoutes() {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // Add loading state
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const token = sessionStorage.getItem('jwtToken');
//     const role = sessionStorage.getItem('userRole');

//     if (token && role === 'ROLE_ADMIN') {
//       setIsAuthenticated(true);
//       setIsAdmin(true);
//     } else if (token && role !== 'ROLE_ADMIN') {
//       setIsAuthenticated(true);
//       setIsAdmin(false);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [navigate]);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // or a spinner
//   }

//   if (!isAuthenticated) {
//     navigate('/login?isLogin=true'); // Redirect to login if not logged in
//     return null;
//   }

//   return (
//     <Routes>
//       {/* Admin Layout Route */}
//       <Route element={<AdminLayout />}>
//         {/* Nested Route under Admin Layout */}
//         <Route path="admin-home" element={isAdmin ? <AdminHome /> : <AccessDenied />} />
//         <Route path="dashboard" element={isAdmin ? <AdminDashboard /> : <AccessDenied />} />
//         <Route path="property-listings" element={isAdmin ? <PropertiesList /> : <AccessDenied />} />

       

//       </Route>

//       <Route path="access-denied" element={<AccessDenied />} />
//       <Route path="login" element={<UserLogin />} />
//     </Routes>
//   );
// }

// export default AdminRoutes;

import React, { useEffect, useState } from 'react';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import AdminHome from '../Components/AdminComponents/AdminHome.jsx';
import AdminNav from '../Components/AdminComponents/AdminNav.jsx';
import AdminDashboard from '../Components/AdminComponents/AdminDashboard.jsx';
import PropertiesList from '../Components/AdminComponents/PropertiesList.jsx';
import AccessDenied from '../src/AccessDenied.jsx';
import UserLogin from '../Components/Login.jsx';
import ManageUsers from '../Components/AdminComponents/ManageUsers.jsx';  // Correct component for Users
import ManageOwners from '../Components/AdminComponents/ManageOwners.jsx';  // Correct component for Owners
import ManageProperties from '../Components/AdminComponents/ManageProperties.jsx';  // Correct component for Properties

// Admin Layout component to wrap around other routes
const AdminLayout = () => (
  <>
    <AdminNav />
    <Outlet />
  </>
);

function AdminRoutes() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Add loading state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    const role = sessionStorage.getItem('userRole');

    if (token && role === 'ROLE_ADMIN') {
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else if (token && role !== 'ROLE_ADMIN') {
      setIsAuthenticated(true);
      setIsAdmin(false);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!isAuthenticated) {
    navigate('/login?isLogin=true'); // Redirect to login if not logged in
    return null;
  }

  return (
    <Routes>
      {/* Admin Layout Route */}
      <Route element={<AdminLayout />}>
        {/* Nested Route under Admin Layout */}
        <Route path="admin-home" element={isAdmin ? <AdminHome /> : <AccessDenied />} />
        <Route path="dashboard" element={isAdmin ? <AdminDashboard /> : <AccessDenied />} />
        <Route path="property-listings" element={isAdmin ? <PropertiesList /> : <AccessDenied />} />
        <Route path="users" element={isAdmin ? <ManageUsers /> : <AccessDenied />} /> {/* Correct users route */}
        <Route path="owners" element={isAdmin ? <ManageOwners /> : <AccessDenied />} /> {/* Correct owners route */}
        <Route path="properties" element={isAdmin ? <ManageProperties /> : <AccessDenied />} /> {/* Correct properties route */}
      </Route>

      <Route path="access-denied" element={<AccessDenied />} />
      <Route path="login" element={<UserLogin />} />
    </Routes>
  );
}

export default AdminRoutes;

