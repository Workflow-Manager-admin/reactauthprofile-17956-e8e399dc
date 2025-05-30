import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Login.css";

// PUBLIC_INTERFACE
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL || process.env.BASE_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        // Try to parse error message if present
        let data;
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        throw new Error(data?.error || "Login failed");
      }
      const data = await res.json();
      // Ensure the API response matches expected structure: { token, profile: { name, email, employee_id, contact_number } }
      if (
        !data ||
        typeof data !== "object" ||
        !data.token ||
        !data.profile ||
        typeof data.profile !== "object" ||
        typeof data.profile.name !== "string" ||
        typeof data.profile.email !== "string" ||
        typeof data.profile.employee_id !== "string" ||
        typeof data.profile.contact_number !== "string"
      ) {
        throw new Error("Invalid response from server");
      }
      login(data.token, {
        name: data.profile.name,
        email: data.profile.email,
        employee_id: data.profile.employee_id,
        contact_number: data.profile.contact_number,
      });
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="login-error">{error}</div>}
        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button className="login-btn" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
