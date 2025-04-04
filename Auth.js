import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";  // For navigation

const Auth = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Hook to navigate between pages

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        navigate("/dashboard");  // Redirect to Dashboard after login
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        navigate("/dashboard");  // Redirect after signup
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleAuth}>{isLogin ? "Login" : "Signup"}</button>
    </div>
  );
};

export default Auth;