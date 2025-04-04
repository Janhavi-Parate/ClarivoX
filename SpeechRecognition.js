//This is SpeechRecognition.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  // If using React Router for navigation

const SpeechRecognition = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);  // Store the selected audio file
  };

  const analyzeSpeech = async () => {
    if (!audioFile) {
      setErrorMessage('Please upload an audio file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', audioFile);

    try {
      // Send the audio file to the backend
      const response = await axios.post('http://localhost:5000/recognize-speech', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // If successful, redirect to the analysis page
      if (response.data.transcription) {
        history.push({
          pathname: '/analysis',
          state: { transcription: response.data.transcription },
        });
      } else {
        setErrorMessage(response.data.error || 'Unknown error.');
      }
    } catch (error) {
      console.error('Error during speech recognition:', error);
      setErrorMessage('Error analyzing speech: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Analyze Speech</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={analyzeSpeech}>Analyze Speech</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default SpeechRecognition;
