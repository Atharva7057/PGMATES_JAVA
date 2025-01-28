import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import AdminHome from '../Components/AdminComponents/AdminHome.jsx';
import AdminNav from '../Components/AdminComponents/AdminNav.jsx';
import AdminDashboard from '../Components/AdminComponents/AdminDashboard.jsx';
import PropertiesList from '../Components/AdminComponents/PropertiesList.jsx';
// This is Admin ROutes
const AdminLayout = () => (
  <>
    <AdminNav />
    <Outlet />
  </>
);

function AdminRoutes() {
  return (
    <Routes>
      {/* Admin Layout Route */}
      <Route element={<AdminLayout />}>
        {/* Nested Route under Admin Layout */}
        <Route path="admin-home" element={<AdminHome />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="property-listings" element={<PropertiesList />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
