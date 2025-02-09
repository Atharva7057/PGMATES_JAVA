import React, { useEffect, useState } from 'react';
import '../CSS/Login.css';  // Assuming your CSS file styles the page
import { verify,registerUser } from '../Services/authenticate';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
function UserLogin() {
  const queryParameters = new URLSearchParams(window.location.search);
  const status = queryParameters.get("isLogin") === "true";
  const [isLogin, setIsLogin] = useState(status);

  const [logindata, setlogindata] = useState({ LoginEmail: "", LoginPassword: "" });
  const [signupData, setSignupData] = useState({
    firstName: "", lastName: "", email: "", contact: "", gender: "", password: "", confirmPassword: "", role: ""
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // Handling login
  function handleonchange(e) {
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOnClick() {
    console.log(logindata.LoginEmail+" "+ logindata.LoginPassword);
    
    if (!logindata.LoginEmail || !logindata.LoginPassword) {
      
      setToastMessage("Please fill in both email and password.");
      setShowToast(true);
      
      return;
    }
  
    try {
      const loginResponse = await verify(logindata.LoginEmail, logindata.LoginPassword);
  
      if (loginResponse.status == 200) {
        const { token, user } = loginResponse.data;
        
        sessionStorage.setItem("jwtToken", token);
        sessionStorage.setItem("userDetails", JSON.stringify(user));
        sessionStorage.setItem("userRole", user.role);
  
        if (user.role === "ROLE_USER") {
          navigate('/user/user-home');
        } else if (user.role === "ROLE_OWNER") {
          navigate('/owner/owner-home');
        } else if (user.role === "ROLE_ADMIN") {
          navigate('/admin/admin-home');
        }
      } else {
        setToastMessage("Invalid email or password.");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage(error.response.data.message);
      setShowToast(true);
    }
  }

  // Handling signup
  const handlesignup = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  async function onsignup() {


    // Regular expression patterns for validation
    const nameRegex = /^[A-Za-z]+$/; // Only alphabets allowed for first name and last name
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Valid email pattern
    const contactRegex = /^\d{10}$/; // Only 10 digit numbers allowed for contact
    const passwordRegex= /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    // Validate that all required fields are filled
    if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.contact || !signupData.gender || !signupData.password || !signupData.confirmPassword || !signupData.role) {
      setToastMessage("All fields must be filled.");
      setShowToast(true);
      return;
    }

    // Validate first name and last name
    if (!nameRegex.test(signupData.firstName)) {
      setToastMessage("First name can only contain letters.");
      setShowToast(true);
      return;
    }
  
    if (!nameRegex.test(signupData.lastName)) {
      setToastMessage("Last name can only contain letters.");
      setShowToast(true);
      return;
    }
  
    // Validate email format
    if (!emailRegex.test(signupData.email)) {
      setToastMessage("Please enter a valid email address.");
      setShowToast(true);
      return;
    }
  
    // Validate contact number format (10 digits)
    if (!contactRegex.test(signupData.contact)) {
      setToastMessage("Contact number should be 10 digits.");
      setShowToast(true);
      return;
    }
    if (!passwordRegex.test(signupData.password)) {
      setToastMessage("Password should contain 1 Uppercase,1 special,1 Numeric character and should be 8 characters long");
      setShowToast(true);
      return;
    }
  
  
  
    // Check if passwords match
    if (signupData.password !== signupData.confirmPassword) {
      setToastMessage("Passwords do not match.");
      setShowToast(true);
      return;
    }
    
    
    console.log(signupData);
    
    
    // Proceed with registration if all validations pass
    const registerResponse = await registerUser(signupData);
    console.log(registerResponse);
    if(registerResponse.status == 200){
      setToastMessage(`${registerResponse.data.message}, You can now login.`);
      setSignupData({
        firstName: "", lastName: "", email: "", contact: "", gender: "", password: "", confirmPassword: "", role: ""
      });
      setShowToast(true);
      setIsLogin(true); 
    }else{
      setToastMessage(`${registerResponse.data.message}`);
      setShowToast(true);
      setIsLogin(false);
    }
    
   // Switch to login view after successful signup
  }

  useEffect(()=>{
    sessionStorage.clear();
  })
  
  return (
    <div className="login-container">
      <div className="form-container">
        <div className="form-toggle">
          <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>SignUp</button>
        </div>

        {isLogin ? (
          <div className="form">
            <h2 className='formName'>Login</h2>
            <div className='icon-fields'>
            <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                name="LoginEmail"
                value={logindata.LoginEmail}
                onChange={handleonchange}
                className="input-field"
              />
            </div>
            
            <div className='icon-fields'>
              <FaLock className='icon' />
              <input
                type="password"
                placeholder="Password"
                name="LoginPassword"
                value={logindata.LoginPassword}
                onChange={handleonchange}
                className="input-field"
              />
            </div>
            
            <button onClick={handleOnClick} className="btn-submit">Login</button>
          </div>
        ) : (
          <div className="form">
            <h2 className='formName'>Signup</h2>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={signupData.firstName}
              onChange={handlesignup}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={signupData.lastName}
              onChange={handlesignup}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={signupData.email}
              onChange={handlesignup}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Contact"
              name="contact"
              value={signupData.contact}
              onChange={handlesignup}
              className="input-field"
            />
            <div id="Gender-section" className="gender-section">
              <label>
                Male
                <input
                  type="radio"
                  value="MALE"
                  name="gender"
                  onChange={handlesignup}
                  className="gender-input"
                />
              </label>
              <label>
                Female
                <input
                  type="radio"
                  value="FEMALE"
                  name="gender"
                  onChange={handlesignup}
                  className="gender-input"
                />
              </label>
            </div>

            <select name="role" value={signupData.role || ""} onChange={handlesignup} className="input-field">
              <option value="" disabled>Select Role</option>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_OWNER">Owner</option>
            </select>

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={signupData.password}
              onChange={handlesignup}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handlesignup}
              className="input-field"
            />

            <button onClick={onsignup} className="btn-submit">Sign Up</button>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide className="toast-notification">
            {/* <Toast.Header><h5>PGMATES</h5></Toast.Header> */}
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
