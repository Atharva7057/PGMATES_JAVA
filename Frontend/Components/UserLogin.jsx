import React, { useState } from 'react';
import '../CSS/UserLogin.css';
import { verify } from '../Services/authenticate.js';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';

function UserLogin() {

  const queryParameters = new URLSearchParams(window.location.search);
  const status = queryParameters.get("isLogin") === "true";
  const [isLogin, setIsLogin] = useState(status);

  const [logindata, setlogindata] = useState({ LoginEmail: "", LoginPassword: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", contact: "", gender: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();


  // Handling login
  function handleonchange(e) {
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  }

  function handleOnClick() {
    const isvalid = verify(logindata.LoginEmail, logindata.LoginPassword);
    if (isvalid) {
      navigate('/user/user-home');
    }else {
      alert("Invalid email or password");
    }
  }

  // Handling signup
  const handlesignup = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  function onsignup() {
    console.log(signupData);
  }

  return (
    <div>
      <div className='container'>
        <div className='form-container'>
          <div className='form-toggle'>
            <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
            <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>SignUp</button>
        </div>

          {isLogin ? (
            <div className='form'>
              <h2>User Login Form</h2>
              <input type='email' placeholder='Email' name='LoginEmail' value={logindata.LoginEmail} onChange={handleonchange} />
              <input type='password' placeholder='Password' name='LoginPassword' value={logindata.LoginPassword} onChange={handleonchange} />
              <button onClick={handleOnClick}>Login</button>
            </div>
          ) : (
            <div className='form'>
              <h2>Signup Form</h2>
              <input type='text' placeholder='Enter Name' name='name' value={signupData.name} onChange={handlesignup} />
              <input type='email' placeholder='Email' name='email' value={signupData.email} onChange={handlesignup} />
              <input type='text' placeholder="Contact" name='contact' onChange={handlesignup} />
              <div id='Gender-section'>
                <label>
                  Male
                  <input type="radio" value="male" name="gender" onChange={handlesignup} />
                </label>
                <label>
                  Female
                  <input type="radio" value="female" name="gender" onChange={handlesignup} />
                </label>
              </div>
              <input type='password' placeholder='Password' name='password' onChange={handlesignup} />
              <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={handlesignup} />
              <button onClick={onsignup}>Sign up</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
