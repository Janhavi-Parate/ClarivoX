//This is Dashborad.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(""); // To store the converted speech-to-text

  const recognitionRef = useRef(null); // For speech recognition instance

  // Start Recording (Speech Recognition)
  const startRecording = () => {
    // Check if the browser supports SpeechRecognition
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true; // Keep listening
    recognitionRef.current.interimResults = true; // Capture partial results
    recognitionRef.current.lang = "en-US"; // Set language (English)

    recognitionRef.current.onstart = () => {
      console.log("Speech recognition started...");
      setIsRecording(true);
    };

    recognitionRef.current.onend = () => {
      console.log("Speech recognition ended.");
      setIsRecording(false);
    };

    recognitionRef.current.onresult = (event) => {
      const transcriptText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setTranscript(transcriptText); // Update state with the speech text
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current.start();
  };

  // Stop Recording (Stop Speech Recognition)
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navbar">
        <div className="title">ClarivoX</div>
        <div className="links">
          <Link to="/AboutUs">About</Link>
          <a href="/speech-analysis">Speech Analysis</a>
          <a href="/games">Games</a>
          <a href="/logout">Log out</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>AI Speech Recognition & Analysis</h1>

        <div className="box-container">
          {/* Speech Recognition Section */}
          <div className="section">
            <h2>Speech Recognition</h2>
            <button onClick={startRecording} disabled={isRecording}>
              Start Recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}>
              Stop Recording
            </button>
            <p>{isRecording ? "Recording... 🎤 Speak now!" : "Recording finished!"}</p>
          </div>

          {/* Display the Converted Speech */}
          <div className="section">
            <h2>Converted Text</h2>
            <h3>{transcript}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
