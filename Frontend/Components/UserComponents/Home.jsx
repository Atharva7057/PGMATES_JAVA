import backgroundImage from '../../Images/HomeImg.jpg'; // Adjust path as needed

function Home() {
  return (
    <div className="main-content">
      <div className="image-container">
        <img 
          src={backgroundImage} 
          alt="Background"
          className="background-image"
        />
        <div className="text-overlay">
          <h1>Welcome to Our Website</h1>
          <p>Explore our services and learn more about what we do.</p>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
