import React, { createContext, useContext } from "react";

// Define the type for the user object
export interface User {
  id: number;
  name: string;
}

// Define the type for the context state
export interface AuthContextState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextState>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Custom hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;