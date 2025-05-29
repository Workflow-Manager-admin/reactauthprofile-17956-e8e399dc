import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const initialProfile = {
  name: "",
  email: "",
  employee_id: "",
  contact_number: "",
};

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || initialProfile
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setProfile(initialProfile);
    }
  }, [isAuthenticated]);

  // PUBLIC_INTERFACE
  function login(token, profileData) {
    setIsAuthenticated(true);
    setProfile(profileData);
    localStorage.setItem("token", token);
    localStorage.setItem("profile", JSON.stringify(profileData));
  }

  // PUBLIC_INTERFACE
  function logout() {
    setIsAuthenticated(false);
    setProfile(initialProfile);
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
