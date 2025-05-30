import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const initialUser = {
  name: "",
  email: "",
  employee_id: "",
  contact_number: "",
};

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  // Authenticated if there is a user object in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || initialUser
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(initialUser);
    }
  }, [isAuthenticated]);

  // PUBLIC_INTERFACE
  function login(userObj) {
    setIsAuthenticated(true);
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
  }

  // PUBLIC_INTERFACE
  function logout() {
    setIsAuthenticated(false);
    setUser(initialUser);
    localStorage.removeItem("user");
  }

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
