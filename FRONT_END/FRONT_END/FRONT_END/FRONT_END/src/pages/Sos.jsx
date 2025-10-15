import React from "react";
import MenuBar from "./MenuBar";       // Import MenuBar
import "../style/Sos.css";

const Sos = ({ onBack, onLogout, onNav }) => {
  return (
    <>
      <MenuBar onLogout={onLogout} onNav={onNav} />
      <div className="sos-container">
        <h2 className="sos-title">Send SOS Alert</h2>
        <p className="sos-description">
          In case of emergency, press the SOS button below to alert your contacts and share your location.
        </p>
        <button className="sos-button">
          <span className="sos-button-icon">&#128680;</span> {/* Police car emoji as icon */}
          SEND SOS
        </button>
        <div className="sos-info">
          <h3>How it Works</h3>
          <ul>
            <li>Your location will be shared with selected contacts.</li>
            <li>They will receive an immediate alert.</li>
            <li>Use this only in real emergencies.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sos;
