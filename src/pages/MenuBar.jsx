import React from 'react';
import '../style/MenuBar.css'; 

const MenuBar = ({ onLogout, onHome, onNav }) => {
    const handleLogoutClick = (e) => {
        e.preventDefault();
        onLogout();
    };
    const handleHomeClick = (e) => {
        e.preventDefault();
        if (onHome) onHome();
        if (onNav) onNav("home");
    };
    const handleNavClick = (target) => (e) => {
        e.preventDefault();
        if (onNav) onNav(target);
    };

    return (
        <div className="menu">
            <ul className="menu-content">
                <li>
                  <a href="#" onClick={handleHomeClick}>
                    <span className="material-symbols-outlined">home</span>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleNavClick("sos")}>
                    <span className="material-symbols-outlined">sos</span>
                    <span>SOS</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleNavClick("heatmap")}>
                    <span className="material-symbols-outlined">map</span>
                    <span>Heatmap</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleNavClick("messages")}>
                    <span className="material-symbols-outlined">chat</span>
                    <span>Messages</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleNavClick("alerts")}>
                    <span className="material-symbols-outlined">notifications</span>
                    <span>Alerts</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleNavClick("contacts")}>
                    <span className="material-symbols-outlined">contacts</span>
                    <span>Contacts</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleNavClick("account")}>
                    <span className="material-symbols-outlined">person</span>
                    <span>Account</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleNavClick("settings")}>
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                  </a>
                </li>
                <li className='logout'>
                  <a href="#" onClick={handleLogoutClick}>
                    <span className="material-symbols-outlined">logout</span>
                    <span>Logout</span>
                  </a>
                </li>
            </ul>
        </div>
    );
};

export default MenuBar;
