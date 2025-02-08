import "../CSS/LandingPage.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import PCHome from "../Images/PCHome.jpg"; // Importing the image correctly

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div
        id="container"
        style={{
          backgroundImage: `url(${PCHome})`, // Using imported image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div id="overlay">
          <div id="title-section">
            <div id="title" className="gradient-text">
              <h1>PG MATES</h1>
              <hr />
            </div>
            <div id="subtitle">
              <p>
                Your Trusted Platform to Find the Perfect PG, Tailored for
                Bachelors!
              </p>
            </div>
          </div>
          <div id="outer-login-container">
            <div id="login-card-title">
              <h2>Login Seamlessly</h2>
            </div>
            <hr />
            <div id="login-section">
              <div className="login-card">
                <div className="btn-div">
                  <button
                    className="login-btn"
                    onClick={() => navigate("/login?isLogin=true")}
                  >
                    Login
                  </button>
                  <button
                    className="signup-btn"
                    onClick={() => navigate("/login?isLogin=false")}
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;