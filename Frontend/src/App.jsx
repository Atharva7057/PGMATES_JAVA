import LandingPage from "../Components/LandingPage"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from '../Components/UserLogin';
import OwnerLogin from '../Components/OwnerLogin';
import AdminLogin from '../Components/AdminLogin';
import UserRoutes from "./UserRoutes";
import OwnerRoutes from "./OwnerRoutes";
import AdminRoutes from "./AdminRoutes";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route  path="/" element={<LandingPage />}></Route>
        <Route path="/user-login" element ={<UserLogin/>}></Route>
        <Route path="/owner-login" element ={<OwnerLogin/>}></Route>
        <Route path="/admin-login" element ={<AdminLogin/>}></Route>


        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/owner/*" element={<OwnerRoutes/>}/>
        <Route path="/admin/*" element ={<AdminRoutes/>}/>
      </Routes>
    </Router>
    </>
  )
}
export default App
