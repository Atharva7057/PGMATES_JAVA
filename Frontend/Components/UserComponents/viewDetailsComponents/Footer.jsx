import React from 'react';
import '../CSS/Footer.css'; // Import a separate CSS file for footer styles

function Footer() {
  return (
    <div className="footer">
      <p>&copy; {new Date().getFullYear()} PGmates | All Rights Reserved @Team-18 CDAC Mumbai</p>
    </div>
  );
}

export default Footer;
