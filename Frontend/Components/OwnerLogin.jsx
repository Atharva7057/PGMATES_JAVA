import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verify } from '../Services/authenticate';
function OwnerLogin() {
  const queryParameters = new URLSearchParams(window.location.search)
  var status = queryParameters.get("isLogin");
  status = status === "true" ? true : false;
  const [isLogin, setIsLogin] = useState(status);
  const [logindata, setlogindata] = useState({ LoginEmail: "", LoginPassword: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", contact: "", gender: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  function handleOnClick() {
    const isvalid = verify(logindata.LoginEmail, logindata.LoginPassword);
    if (isvalid) {
      navigate('/owner/owner-home');
    }else {
      alert("Invalid email or password");
    }
  }

  function handleonchange(e) {
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  }
  function onsignup() {
    console.log(signupData);
  }
  const handlesignup = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className='container'>

        <div className='form-container'>
          <div className='form-toggle'>
            <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin
              (true)}>Login</button>
            <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin
              (false)}>SignUp</button>
          </div>


          {isLogin ? <>
            <div className='form'>
              <h2>Owner Login Form</h2>

              <input type='email' placeholder='Email' name='LoginEmail'  value={logindata.LoginEmail} onChange={handleonchange}/>
              <input type='password' placeholder='Password' name='LoginPassword'  value={logindata.LoginPassword} onChange={handleonchange}/>
              <button onClick={handleOnClick}>Login</button>
              <p>Not a member? <a href='#' on click={() => setIsLogin(false)}>Signup now</a></p>
            </div></> : <>
            <div className='form'>
              <h2>Signup Form</h2>
              <input type='text' placeholder='Enter Name' name='name' value={signupData.name} onChange={handlesignup}/>
              <input type='email' placeholder='Email' name='email' value={signupData.email} onChange={handlesignup}/>
              <input type='text' placeholder="Number" name='contact' onChange={handlesignup} />

              <div id='Gender-section'>
              
                <label for="male">Gender: Male</label>
                <input type="radio" id="male" value="male" name="gender" onChange={handlesignup}/>
                <label for="female">Female</label>
                <input type="radio" id="female" value="female" name="gender" onChange={handlesignup}/>
              </div>


              <input type='password' placeholder='Password' name='password' onChange={handlesignup} />
              <input type='password' placeholder='Confirm Password'  name='confirmPassword' onChange={handlesignup}/>
              <button onClick={onsignup}>Sign up </button>
            </div>
          </>}
        </div>

      </div>

    </div>
  )
}

export default OwnerLogin
