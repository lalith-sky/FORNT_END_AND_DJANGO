import React, { useState } from "react";
import LandingPageScroll from "./pages/LandingPageScroll";
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import Sos from "./pages/Sos";
import Heatmap from "./pages/Heatmap";
import Messages from "./pages/Messages";
import Account from "./pages/Account";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState("");

  // 🔹 Handles user registration
  const handleRegister = (username) => {
    alert("Registration successful! Please login.");
    setAuthMode("login");
    setPage("auth");
    return true;
  };

  // 🔹 Handles login success
  const handleLogin = (username, token) => {
    setUser(username);
    setUsername(username);
    setUserToken(token);
    setPage("home");
    return true;
  };

  // 🔹 Handles logout
  const handleLogout = () => {
    setUser(null);
    setUsername("");
    setUserToken("");
    setPage("home");
  };

  // 🔹 Opens login/register page
  const openAuth = (mode) => {
    setAuthMode(mode);
    setPage("auth");
  };

  const handleBack = () => setPage("home");

  // 🔹 Page Rendering
  return (
    <div>
      {user ? (
        <>
          {page === "home" && (
            <Home username={user} onLogout={handleLogout} onNav={setPage} />
          )}

          {page === "sos" && (
            <Sos onBack={handleBack} onLogout={handleLogout} onNav={setPage} />
          )}

          {page === "heatmap" && (
            <Heatmap onLogout={handleLogout} onNav={setPage} />
          )}

          {page === "messages" && (
            <Messages
              userToken={userToken}
              currentUsername={username}
              onLogout={handleLogout}
              onNav={setPage}
            />
          )}

          {page === "account" && (
            <Account onLogout={handleLogout} onNav={setPage} />
          )}
        </>
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
