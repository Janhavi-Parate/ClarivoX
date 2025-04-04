//This is SpeechAnalysis.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function SpeechAnalysisComponent({ audioBlob }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSpeech = async () => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/analyze-speech", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (err) {
      console.error("Error during speech analysis:", err);
      setError(err.response?.data?.error || "An error occurred during speech analysis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (audioBlob) {
      analyzeSpeech();
    }
  }, [audioBlob]);

  return (
    <div>
      {loading && <p>Analyzing speech...</p>}
      {result && <p>Analysis Result: {result.text}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default SpeechAnalysisComponent;
