//import React from 'react';
import './Hero.css';  // Import CSS file for styles
import video from "../assets/video3.mp4"

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="search-bar-container">
        {/* Your search bar component */}
      </div>
      <video autoPlay loop muted className="video-background">
        <source src={video} type="video/mp4" />
        {/* Include additional source tags for other video formats if necessary */}
        Your browser does not support the video tag.
      </video>
      <div className="content-container">
        <div className="container mx-auto flex flex-col gap-2">
          <h1 className="logo font-BENTHAM text-5xl text-white font-bold">Embark on endless journeys</h1>
          <p className=" text-2xl text-white">
            Discover dream vacations at unbeatable prices...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

