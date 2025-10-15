import React, { useState, useEffect, useCallback } from "react";
import MenuBar from "./MenuBar";
import "../style/Home.css";
import { FaBell, FaMapMarkerAlt, FaPhoneAlt, FaUserFriends } from "react-icons/fa";
import axios from "axios";
import profilePhoto from "../components/Profile_photo.webp";

const API_URL = "http://127.0.0.1:8000/api"; // include /api prefix

export default function Home({ username, onLogout, onNav }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(`${API_URL}/dashboard/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading || !dashboardData) return <div>Loading dashboard...</div>;

  return (
    <>
      <MenuBar onLogout={onLogout} onNav={onNav} />

      <div className="dashboard">
        {/* Top Navbar */}
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="search-profile-container">
            <input type="text" placeholder="Search..." className="search-bar" />
            <div className="user-profile">
              <img src={profilePhoto} alt="User Avatar" />
              <span>{username}</span>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="overview">
          <div className="card">
            <FaPhoneAlt className="icon red" />
            <h3>{dashboardData.sos_calls}</h3>
            <p>SOS Calls</p>
          </div>
          <div className="card">
            <FaMapMarkerAlt className="icon blue" />
            <h3>{dashboardData.locations_shared}</h3>
            <p>Locations Shared</p>
          </div>
          <div className="card">
            <FaBell className="icon orange" />
            <h3>{dashboardData.alerts_received}</h3>
            <p>Alerts Received</p>
          </div>
          <div className="card">
            <FaUserFriends className="icon green" />
            <h3>{dashboardData.contacts_added}</h3>
            <p>Contacts Added</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity">
          <h3>Recent SOS Activity</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recent_sos.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.date).toLocaleString()}</td>
                  <td>{item.type}</td>
                  <td className={item.status.toLowerCase()}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
