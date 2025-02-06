import React from 'react';
import '../CSS/LandingPageDemo.css'
//import LandingPageDemo from './LandingPageDemo.css';
import { useNavigate } from 'react-router-dom';
function LandingPageDemo(){
    const navigate = useNavigate();
    return(
            <div className="landing-container">
              <div className="content">
                <h1>PGmates</h1>
                <p>Find your perfect PG accommodation with ease.</p>
                <div className="buttons">
                  <button className="btn login">Login</button>
                  <button className="btn signup">Signup</button>
                </div>
              </div>
            </div>
          );
        };

export default LandingPageDemo;
