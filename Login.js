import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // ✅ Import Firebase auth instance
import "./Login.css"; // ✅ Import CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" }); // ✅ State for validation errors
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ Prevent form from submitting by default

    // Reset previous error messages
    setError({ email: "", password: "" });

    let isValid = true;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError((prev) => ({ ...prev, email: "Please enter a valid email address." }));
      isValid = false;
    }

    // Password validation
    if (password.length < 6) {
      setError((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
      isValid = false;
    }

    // If all validations pass, proceed with Firebase authentication
    if (isValid) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        navigate("/dashboard"); // ✅ Redirect to Dashboard after login
      } catch (error) {
        alert(error.message); // ✅ Show Firebase authentication errors
      }
    }
  };

  return (
    <div className="container">
      <h1 style={{color: 'white'}}>Welcome to ClarivoX!</h1>
      <p>Your Firebase-powered app is running!</p>

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {error.email && <p className="error">{error.email}</p>} {/* ✅ Display email error */}

          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {error.password && <p className="error">{error.password}</p>} {/* ✅ Display password error */}

          <button type="submit">Login</button>
        </form>
        
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;