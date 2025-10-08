import React, { useState } from "react";
import LandingPageScroll from "./pages/LandingPageScroll";
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import Sos from "./pages/Sos";
import Heatmap from "./pages/Heatmap";
import Messages from "./pages/Messages";


export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [userToken, setUserToken] = useState(""); // Set this after login
  const [username, setUsername] = useState("");   // Set this after login

  const handleRegister = (username) => {
    alert("Registration successful! Please login.");
    setPage("auth");
    setAuthMode("login");
    return true;
  };

  const handleLogin = (username,token) => {
    setUser(username);           // for other components if still needed
    setUsername(username);       // for messages currentUsername prop
    setUserToken(token);         // for messages userToken prop
    setPage("home");
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    setUserToken("");     // <-- Add this
    setUsername("");      // <-- Add this
    setPage("home");
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setPage("auth");
  };

  const handleBack = () => {
    setPage("home");
  };

  return (
    <div>
      {user ? (
        <>
          {page === "home" && (
            <Home username={user} onLogout={handleLogout} onNav={setPage} />
          )}
          {page === "sos" && (
            <Sos onBack={() => setPage("home")} onLogout={handleLogout} onNav={setPage} />
          )}
          {page === "heatmap" && (
             <Heatmap onLogout={handleLogout} onNav={setPage} />
          )}
          {page === "messages" && (
             <Messages
              userToken={userToken}         // <-- Pass the token here
              onLogout={handleLogout}
              onNav={setPage}
              currentUsername={username}    // <-- Pass the username here
            />
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
