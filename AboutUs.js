import React, { useState, useEffect } from "react";

const About = () => {
    return (
      <div className="about-container">
        <h2>Welcome to ClariVox</h2>
        <p>
          ClarivoX is an AI-powered speech therapy platform designed to help users improve their pronunciation and communication skills. 
          We provide real-time feedback and interactive exercises to enhance speech clarity and confidence.
        </p>
        <h2>Our Mission</h2>
        <p>
          We strive to make speech therapy accessible, effective, and engaging for everyone, from language learners to individuals with speech challenges. 
          Our AI-driven tools ensure personalized learning experiences for users worldwide.
        </p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>AI-powered pronunciation correction</li>
          <li>Real-time speech analysis</li>
          <li>Personalized learning experience</li>
          <li>Easy-to-use and accessible for all</li>
        </ul>
      </div>
    );
  };
  
  export default About;  