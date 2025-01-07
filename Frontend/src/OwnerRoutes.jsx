import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import OwnerNav from '../Components/OwnerComponents/OwnerNav';
import OwnerHome from "../Components/OwnerComponents/OwnerHome";
import Demo from "../Components/OwnerComponents/Demo";
import ContactUs from "../Components/OwnerComponents/ContactUs";
import Services from "../Components/OwnerComponents/Services";
import Appointments from "../Components/OwnerComponents/Appointments";
import PropertyListings from "../Components/OwnerComponents/PropertyListings";
import RegisterProperty from '../Components/OwnerComponents/RegisterProperty';
import Profile from "../Components/OwnerComponents/profile";
import data from "../Components/OwnerComponents/data";

// import AboutUs from "../Components/OwnerComponents/Aboutus";

// import {NavBarSeller} from "../Components/OwnerComponents/NavBarSeller.jsx";
// Layout component to include Owner Navbar
const OwnerLayout = () => (
  <>
    <OwnerNav />
    <Outlet /> {/* Nested routes will render here */}
  </>
);

function OwnerRoutes() {
  return (
    <Routes>
      <Route element={<OwnerLayout />}>
        <Route path="owner-home" element={<OwnerHome />} />
        <Route 
          path="services" 
          element={<Services data={data} />} 
        />
        <Route path='appointments' element = {<Appointments/>} />
        <Route path='propertylistings' element = {<PropertyListings/>}/>
        <Route path='registerproperty' element = {<RegisterProperty/>}/>
        {/* <Route path='about' element = {<Aboutus/>}/> */}
        <Route path='contact' element = {<ContactUs/>}/>
        <Route path='profile' element = {<Profile/>}/>
      </Route>
    </Routes>
  );
}

export default OwnerRoutes;
