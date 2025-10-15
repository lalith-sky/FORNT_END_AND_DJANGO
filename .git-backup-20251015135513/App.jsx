import React, { useState } from "react";
import LandingPageScroll from "./pages/LandingPageScroll";
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home"); // 'home' or 'auth'
  const [authMode, setAuthMode] = useState("login"); // which tab to show when auth page opens

  // Registration handler just switches UI and shows alert, no local user tracking
  const handleRegister = (username) => {
    alert("Registration successful! Please login.");
    setPage("auth");
    setAuthMode("login");
    return true;
  };

  // Login handler accepts username since backend validation happened
  const handleLogin = (username) => {
    setUser(username);
    setPage("home");
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  const openAuth = (mode) => {
    setAuthMode(mode); // 'login' or 'register'
    setPage("auth");
  };

  const handleBack = () => {
    setPage("home");
  };

  return (
    <div>
      {user ? (
        <Home username={user} onLogout={handleLogout} />
      ) : (
        <>
          {page === "home" && (
            <LandingPageScroll
              onLoginClick={() => openAuth("login")}
              onRegisterClick={() => openAuth("register")}
            />
          )}

          {page === "auth" && (
            <LoginRegister
              initialMode={authMode}
              onLogin={handleLogin}
              onRegister={handleRegister}
              onBack={handleBack}
            />
          )}
        </>
      )}
    </div>
  );
}
