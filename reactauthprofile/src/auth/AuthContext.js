import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const initialUser = {
  // Holds only the user_id, profile data comes from /api/profile
  user_id: "",
};

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  // Determine authentication by token and expiry
  function getIsAuthenticated() {
    const token = localStorage.getItem("token");
    const expiry = Number(localStorage.getItem("token_expiry") || "0");
    return !!(token && expiry && Date.now() < expiry);
  }
  function getUser() {
    // For this pattern, "user" is { user_id }
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : initialUser;
  }

  const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticated());
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(initialUser);
    }
  }, [isAuthenticated]);

  // PUBLIC_INTERFACE
  function login(token, tokenExpiry, user_id) {
    setIsAuthenticated(true);
    setUser({ user_id }); // only store user_id
    localStorage.setItem("user", JSON.stringify({ user_id }));
    localStorage.setItem("token", token);
    localStorage.setItem("token_expiry", tokenExpiry);
  }

  // PUBLIC_INTERFACE
  function logout() {
    setIsAuthenticated(false);
    setUser(initialUser);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
  }

  // Optionally, handle automatic logout on token expiry
  useEffect(() => {
    let timeoutId;
    if (isAuthenticated) {
      const expiry = Number(localStorage.getItem("token_expiry") || "0");
      if (expiry) {
        const remaining = expiry - Date.now();
        if (remaining > 0) {
          timeoutId = setTimeout(() => {
            logout();
          }, remaining);
        } else {
          logout();
        }
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    // We want to re-run this when authentication state or expiry changes
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
