//import React from 'react';
import './Footer.css';  // Import CSS file for styles
import video from "../assets/video3.mp4";

const Footer = () => {
  return (
    <div className="footer-container">
      <video autoPlay loop muted className="video-background">
        <source src={video} type="video/mp4" />
        {/* Include additional source tags for other video formats if necessary */}
        Your browser does not support the video tag.
      </video>
      <div className="content-container">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-3xl text-white font-bold tracking-tight">
            BeyondHorizon.com
          </span>
          <span className="text-white font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms of Service</p>
            <p className="cursor-pointer">Contact Us</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;