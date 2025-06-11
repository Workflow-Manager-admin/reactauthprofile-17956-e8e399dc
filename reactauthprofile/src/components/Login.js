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
      let resData = null;
      if (!res.ok) {
        // Always try to extract error message from response
        try {
          resData = await res.json();
        } catch {
          resData = {};
        }
        if (res.status === 401 && resData && resData.error) {
          setError(resData.error);
        } else {
          setError(resData?.error || "Login failed");
        }
        return;
      }
      resData = await res.json();
      // Expecting: { token: string, expires_in: number, user_id: string }
      if (
        !resData ||
        typeof resData !== "object" ||
        typeof resData.token !== "string" ||
        typeof resData.expires_in !== "number" ||
        typeof resData.user_id !== "string"
      ) {
        setError("Invalid response from server");
        return;
      }

      // Store token, expiry, and user_id for later use
      login(
        resData.token,
        Date.now() + resData.expires_in * 1000,
        resData.user_id
      );
      navigate("/profile");
    } catch (err) {
      setError(err?.message || "Something went wrong");
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
