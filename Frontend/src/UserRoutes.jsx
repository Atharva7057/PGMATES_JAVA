import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import UserHome from "../Components/UserComponents/UserHome";
import Home from "../Components/UserComponents/Home";
import Services from "../Components/UserComponents/Services";
import About from "../Components/UserComponents/About";
import ViewListings from "../Components/UserComponents/ViewListings";
import ViewDetails from "../Components/UserComponents/ViewDetails";
import UserNavbar from "../Components/UserComponents/UserNavbar";
import AccessDenied from '../src/AccessDenied.jsx';
import UserLogin from '../Components/Login.jsx';
import ManageAppointments from '../Components/UserComponents/ManageAppointments.jsx';
import MyProfile from '../Components/UserComponents/MyProfile.jsx';
const UserLayout = () => (
  <>
    <UserNavbar />
    <Outlet /> {/* Nested routes will render here */}
  </>
);

const UserRoutes = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    const role = sessionStorage.getItem('userRole');

    if (token && role === "ROLE_USER") {
      setIsAuthenticated(true); // Logged in and user
      setIsUser(true);
    } else if (!token) {
      // If no token, redirect to login page
      setIsAuthenticated(false);
      navigate('/login?isLogin=true');
    } else if (role !== "ROLE_USER") {
      // If role is not USER, deny access
      setIsUser(false);
      // navigate('access-denied');
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or a spinner while navigating
  }

  return (
    <Routes>
      {/* User Layout Route */}
      <Route element={<UserLayout />}>
        {/* Nested Route under User Layout */}
        <Route path="user-home" element={isUser ? <UserHome /> : <AccessDenied />} />
        <Route path="home" element={isUser ? <Home /> : <AccessDenied />} />
        <Route path="view-listings" element={isUser ? <ViewListings /> : <AccessDenied />} />
        <Route path="services" element={isUser ? <Services /> : <AccessDenied />} />
        <Route path="about" element={isUser ? <About /> : <AccessDenied />} />
        <Route path="view-details" element={isUser ? <ViewDetails /> : <AccessDenied />} />
        <Route path="ManageAppointments" element={isUser ? <ManageAppointments /> : <AccessDenied />} />
        <Route path="MyProfile" element={isUser ? <MyProfile /> : <AccessDenied />} />
      </Route>

      {/* Routes for non-authenticated users */}
      <Route path="access-denied" element={<AccessDenied />} />
      <Route path="login" element={<UserLogin />} />
    </Routes>
  );
};

export default UserRoutes;
