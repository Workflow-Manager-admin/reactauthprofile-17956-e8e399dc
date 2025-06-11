import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

// PUBLIC_INTERFACE
export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    employee_id: "",
    contact_number: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      setError("");
      const token = localStorage.getItem("token");
      const user_id = user?.user_id || "";
      if (!token || !user_id) {
        setError("Authentication error. Please login again.");
        logout();
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL || process.env.BASE_URL}/api/profile`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, user_id })
          }
        );
        if (!res.ok) {
          setError("Failed to fetch profile");
          // Optionally handle forbidden/unauthorized
          if (res.status === 401 || res.status === 403) {
            logout();
            navigate("/login");
          }
          return;
        }
        const respData = await res.json();
        // Expecting { name, email, employee_id, contact_number }
        setProfile({
          name: respData.name || "",
          email: respData.email || "",
          employee_id: respData.employee_id || "",
          contact_number: respData.contact_number || ""
        });
      } catch (err) {
        setError("Could not load profile");
      }
    }
    fetchProfile();
    // eslint-disable-next-line
  }, [logout, navigate, user?.user_id]);

  // PUBLIC_INTERFACE
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        {error && (
          <div className="login-error" style={{marginBottom: "1.2em"}}>{error}</div>
        )}
        <div className="profile-info">
          <div>
            <span className="profile-label">Name:</span> {profile.name}
          </div>
          <div>
            <span className="profile-label">Email:</span> {profile.email}
          </div>
          <div>
            <span className="profile-label">Employee ID:</span> {profile.employee_id}
          </div>
          <div>
            <span className="profile-label">Contact Number:</span> {profile.contact_number}
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
