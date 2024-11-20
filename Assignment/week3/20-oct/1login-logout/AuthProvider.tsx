import React, { useState, ReactNode } from "react";
import AuthContext, { User } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showText, setShowText] = useState(false); // State to toggle text visibility

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  const handleClick = () => {
    setShowText(!showText); // Toggle the visibility of the line
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
      <h6 
  onClick={handleClick} 
  style={{
    position: "absolute", 
    top: "10px", 
    right: "10px", 
    cursor: "pointer"
  }}
>
  ?
</h6>
        {showText && <p>1. Recreate the AuthProvider example using Functional components.</p>}
        {children}
      </>
    </AuthContext.Provider>
  );
};