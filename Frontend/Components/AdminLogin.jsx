import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verify } from "../Services/authenticate";

function AdminLogin() {
  const queryParameters = new URLSearchParams(window.location.search);
  const status = queryParameters.get("isLogin") === "true";
  const [isLogin, setIsLogin] = useState(status);
  const [logindata, setLogindata] = useState({
    LoginEmail: "",
    LoginPassword: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function handleOnClick() {
    const isValid = verify(logindata.LoginEmail, logindata.LoginPassword);
    if (isValid) {
      navigate("/admin/admin-home");
    } else {
      alert("Invalid email or password");
    }
  }

  function handleOnChange(e) {
    setLogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  }

  function onSignup() {
    console.log(signupData);
  }

  const handleSignup = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="container">
        <div className="form-container">
          <div className="form-toggle">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              SignUp
            </button>
          </div>

          {isLogin ? (
            <div className="form">
              <h2>Admin Login Form</h2>
              <input
                type="email"
                placeholder="Email"
                name="LoginEmail"
                value={logindata.LoginEmail}
                onChange={handleOnChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="LoginPassword"
                value={logindata.LoginPassword}
                onChange={handleOnChange}
              />
              <button onClick={handleOnClick}>Login</button>
              <p>
                Not a member?{" "}
                <a href="#" onClick={() => setIsLogin(false)}>
                  Signup now
                </a>
              </p>
            </div>
          ) : (
            <div className="form">
              <h2>Signup Form</h2>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={signupData.name}
                onChange={handleSignup}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signupData.email}
                onChange={handleSignup}
              />
              <input
                type="text"
                placeholder="Number"
                name="contact"
                value={signupData.contact}
                onChange={handleSignup}
              />

              <div id="Gender-section">
                <label htmlFor="male">Gender: Male</label>
                <input
                  type="radio"
                  id="male"
                  value="male"
                  name="gender"
                  onChange={handleSignup}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  value="female"
                  name="gender"
                  onChange={handleSignup}
                />
              </div>

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={handleSignup}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignup}
              />
              <button onClick={onSignup}>Sign up</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
