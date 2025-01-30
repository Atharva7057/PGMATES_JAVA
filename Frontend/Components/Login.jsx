import React, { useState } from 'react';
import '../CSS/Login.css';
import { verify } from '../Services/authenticate.js';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';

function Login() {

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
      console.log("logindata.LoginEmail",logindata.LoginEmail)
      console.log(" logindata.LoginPassword", logindata.LoginPassword)
      if(logindata.LoginEmail === 'pranjal@gmail' && logindata.LoginPassword ==="1234"){
        console.log("hey hrsha chirmade")
        navigate('/owner/owner-home');
      }
      else if(logindata.LoginEmail === 'atharva@gmail' &&logindata.LoginPassword ==="1234"){
        navigate('/user/user-home');
      }
      else if(logindata.LoginEmail === 'parthavi@gmail' &&logindata.LoginPassword ==="1234"){
        console.log("admin")
        navigate('/admin/admin-home');
      }
      
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
              <h2>Login Form</h2>
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
                <div>
                <select name="role" value={signupData.role || ""} onChange={handlesignup}>
                <option value="" disabled>Select Role</option>
                <option value="user">User</option>
                <option value="owner">Owner</option>
              </select>
              </div>
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

export default Login;
