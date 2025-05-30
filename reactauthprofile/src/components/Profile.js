import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

// PUBLIC_INTERFACE
export default function Profile() {
  const { user, logout } = useAuth();
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
          <div><span className="profile-label">Name:</span> {user?.name || ""}</div>
          <div><span className="profile-label">Email:</span> {user?.email || ""}</div>
          <div><span className="profile-label">Employee ID:</span> {user?.employee_id || ""}</div>
          <div><span className="profile-label">Contact Number:</span> {user?.contact_number || ""}</div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
