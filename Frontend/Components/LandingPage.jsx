import React from 'react'
import '../CSS/LandingPage.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
function LandingPage() {
    const navigate = useNavigate();
    
    return (
        <>
            <div id='container'>
                <div id='title-section'>
                    <div id='title' className='gradient-text'>
                        <h1>PG MATES</h1>
                        <hr/>
                    </div>
                    <div id='subtitle'>
                        <p>Your Trusted Platform to Find the Perfect PG, Tailored for Bachelors!</p>
                    </div>
                </div>

                <div id='outer-login-container'>
                    <div id='login-card-title'>
                        <h2>Login seamlessly according to your role</h2>
                    </div>
                    <hr />
                    <div id='login-section'>
                        <div className='login-card'>
                            <p>User Login</p>
                            <div className='btn-div'>
                                <button onClick={() => {
                                    navigate('/user-login?isLogin=true');
                                }}>Login</button>
                                <button onClick={() => {
                                    navigate('/user-login?isLogin=false');
                                }}>Signup</button>
                            </div>
                        </div>

                        <div className='login-card'>
                            <p>Owner Login</p>
                            <div className='btn-div'>
                                <button onClick={() => {
                                    navigate('/owner-login?isLogin=true');
                                }}>Login</button>
                                <button onClick={() => {
                                    navigate('/owner-login?isLogin=false');
                                }}>Signup</button>
                            </div>
                        </div>

                        <div className='login-card'>
                            <p>Admin Login </p>
                            <div className='btn-div'>
                                <button onClick={() => {
                                    navigate('/admin-login?isLogin=true');
                                }}>Login</button>
                                <button onClick={() => {
                                    navigate('/admin-login?isLogin=false');
                                }}>Signup</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )

}

export default LandingPage
