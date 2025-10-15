import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "../style/LoginRegister.css";

// Define the base URL for your Django API
const API_URL = "http://127.0.0.1:8000";

export default function LoginRegister({ initialMode = "login", onLogin, onBack }) {
  const [isLoginActive, setIsLoginActive] = useState(initialMode === "login");

  // login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // register form state
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // state to handle errors from the backend
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoginActive(initialMode === "login");
  }, [initialMode]);

  const toggleLogin = () => {
    setIsLoginActive(true);
    setError(""); // Clear errors when switching forms
  };

  const toggleRegister = () => {
    setIsLoginActive(false);
    setError(""); // Clear errors when switching forms
  };

  // --- UPDATED LOGIN LOGIC ---
  const submitLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      // Send username and password to the Django token endpoint
      const response = await axios.post(`${API_URL}/api/token/`, {
        username: loginUsername,
        password: loginPassword,
      });

      // If login is successful, save the token
      localStorage.setItem("accessToken", response.data.access);

      // Call the onLogin function and pass the username so parent can switch to home page
      onLogin(loginUsername);  // <-- pass username here

    } catch (err) {
      // If Django returns an error (e.g., 401 Unauthorized)
      setError("Invalid username or password.");
    }
  };

  // --- UPDATED REGISTER LOGIC ---
  const submitRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      // Send username, email, and password to the Django register endpoint
      await axios.post(`${API_URL}/api/register/`, {
        username: regUsername,
        email: regEmail,
        password: regPassword,
      });

      // If registration is successful, show an alert
      alert("Registration successful! Please log in.");

      // Switch to login tab and prefill username
      setIsLoginActive(true);
      setLoginUsername(regUsername);
      setLoginPassword(""); // Clear password for security

    } catch (err) {
      if (err.response && err.response.data) {
        let message = "";
        if (err.response.data.username) message += err.response.data.username[0] + " ";
        if (err.response.data.email) message += err.response.data.email[0] + " ";
        if (err.response.data.password) message += err.response.data.password[0] + " ";
        setError(message.trim() || "Registration failed. Please try again.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="hero login-bg">
      <button className="back-button" onClick={onBack}>
        <span style={{ marginRight: "6px" }}>&larr;</span> Back
      </button>

      <div className="main-box">
        <div className="form-box">
          <div id="after" style={{ left: isLoginActive ? "50%" : "0", top: "0" }}></div>

          <div className="button-box">
            <div id="btn" style={{ left: isLoginActive ? "0" : "110px" }}></div>
            <button
              id="log"
              type="button"
              className="toggle-btn"
              onClick={toggleLogin}
              style={{ color: isLoginActive ? "#252525" : "rgb(234, 234, 235)" }}
            >
              Log in
            </button>
            <button
              id="reg"
              type="button"
              className="toggle-btn"
              onClick={toggleRegister}
              style={{ color: isLoginActive ? "rgb(234, 234, 235)" : "#252525" }}
            >
              Register
            </button>
          </div>

          {/* New element to display backend errors */}
          {error && <p className="error-message">{error}</p>}

          <form
            id="login"
            className="input-group"
            style={{ left: isLoginActive ? "0px" : "-500px" }}
            onSubmit={submitLogin}
          >
            <input
              type="text"
              className="input-field"
              placeholder="User"
              required
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <input type="submit" className="submit-btn" value="Log in" />
          </form>

          <form
            id="register"
            className="input-group"
            style={{ left: isLoginActive ? "500px" : "0px" }}
            onSubmit={submitRegister}
          >
            <input
              type="text"
              className="input-field"
              placeholder="User"
              required
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
            />
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              required
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              required
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <input type="submit" className="submit-btn" value="Register" />
          </form>
        </div>

        <span className="sp sp-t"></span>
        <span className="sp sp-r"></span>
        <span className="sp sp-b"></span>
        <span className="sp sp-l"></span>
      </div>
    </div>
  );
}
