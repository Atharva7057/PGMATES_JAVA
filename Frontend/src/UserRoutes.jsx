import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import UserHome from "../Components/UserComponents/UserHome";
import Home from "../Components/UserComponents/Home";
import Services from "../Components/UserComponents/Services";
import About from "../Components/UserComponents/About";
import ViewListings from "../Components/UserComponents/ViewListings";
import ViewDetails from "../Components/UserComponents/ViewDetails";
import UserNavbar from "../Components/UserComponents/UserNavbar";

const UserLayout = () => (
  <>
    <UserNavbar />
    <Outlet /> {/* Nested routes will render here */}
  </>
);

const UserRoutes = () => (
  <Routes>
    <Route element={<UserLayout />}>
      {/* Nested routes without leading `/` */}
      <Route path="user-home" element={<UserHome />} /> 
      <Route path="home" element={<Home />} />
      <Route path="view-listings" element={<ViewListings />} />
      <Route path="services" element={<Services />} />
      <Route path="about" element={<About />} />
      <Route path="view-details" element={<ViewDetails />} />
    </Route>
  </Routes>
);

export default UserRoutes;
