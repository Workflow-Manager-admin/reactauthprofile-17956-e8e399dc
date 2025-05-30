import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

// PUBLIC_INTERFACE
export default function Profile() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  // PUBLIC_INTERFACE
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        <div className="profile-info">
          <div><span className="profile-label">Name:</span> {profile?.name || ""}</div>
          <div><span className="profile-label">Email:</span> {profile?.email || ""}</div>
          <div><span className="profile-label">Employee ID:</span> {profile?.employee_id || ""}</div>
          <div><span className="profile-label">Contact Number:</span> {profile?.contact_number || ""}</div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
