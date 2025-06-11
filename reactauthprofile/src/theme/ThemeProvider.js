import React from "react";

// PUBLIC_INTERFACE
export default function ThemeProvider({ children }) {
  // Theme could be expanded in the future, now uses :root from global.css
  return children;
}
