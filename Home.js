import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="text-section">
      <h1 style={{color: 'white'}}>ClarivoX</h1>
        <p className="caption">Speak Right, Sound Bright!</p>
        <div className="description">
          <p>
            <strong>ClarivoX</strong> is an AI-powered speech therapy platform
            designed to help users improve their pronunciation with real-time
            feedback using advanced speech recognition and phonetic analysis.
            ClarivoX identifies user mispronunciations and provides corrective
            guidance through interactive exercises.
          </p>
          <p>
            Whether you're a language learner or someone working on speech
            clarity, our intuitive and engaging platform makes pronunciation
            practice easy and effective.
          </p>
        </div>
        <div className="button-container">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;