//This is Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // ✅ Import Firebase auth instance
import "./Signup.css"; // ✅ Import CSS

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // ✅ Store username
  const [errors, setErrors] = useState({}); // ✅ Store error messages
  const navigate = useNavigate(); // ✅ Hook for navigation

  const validateForm = () => {
    let newErrors = {};

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Username validation
    if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload on form submit

    if (!validateForm()) return; // ✅ Stop if validation fails

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/dashboard"); // ✅ Redirect to Dashboard after signup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h1 style={{color: 'white'}}>Welcome to ClarivoX!</h1>
      <p>Your Firebase-powered app is running!</p>

      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}> {/* ✅ Handle signup with Firebase */}
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
