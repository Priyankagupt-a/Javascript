// ProtectedRoute.tsx

/**
 * This file defines a `ProtectedRoute` component for React applications 
 * using React Router. It ensures that certain routes are accessible only 
 * to authenticated users. If the user is not authenticated, they are 
 * redirected to the login page with a return URL.
 */

import React, { useEffect, useState } from "react"; // Importing React essentials for component development
import { useNavigate } from "react-router-dom"; // Importing navigation hook for route management

// Defining the props structure for the ProtectedRoute component
interface ProtectedRouteProps {
  returnUrl: string; // The URL to return to after successful login
  children: React.ReactNode; // The content to render if the user is authenticated
  
  requireAdmin?: boolean; 

}

// ProtectedRoute Component
const ProtectedRoute = (props: ProtectedRouteProps) => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track user's login status
  
  
  const [isAdmin, setIsAdmin] = useState(false);




  /**
   * Function to check if the user is authenticated
   * It retrieves a token from `sessionStorage` and verifies it.
   * If the token is absent or invalid, the user is redirected to the login page.
   */
  const checkUserToken = () => {
    const userToken = sessionStorage.getItem("AUTH_TOKEN"); // Retrieving token from sessionStorage

    const userRole = sessionStorage.getItem("USER_ROLE");

    // Check if token is undefined or invalid
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false); // Update state to reflect unauthenticated status
      return navigate("/Login?returnUrl=" + props.returnUrl); // Redirect to login page with return URL
    }

    // If the token exists, user is authenticated
    setIsLoggedIn(true);
    setIsAdmin(userRole === "admin");
  };

  /**
   * useEffect Hook
   * Runs the `checkUserToken` function to validate the user's authentication status.
   * Re-runs whenever `isLoggedIn` state changes.
   */
  useEffect(() => {
    checkUserToken(); // Call the function to validate token
  }, [isLoggedIn]); // Dependency array ensures re-run when `isLoggedIn` changes
  
  
  if (props.requireAdmin && !isAdmin) {
    return <div style={{ textAlign: "center", color: "red" }}>Unauthorized Access: Admins only.</div>;
  }

  

  /**
   * JSX Render
   * If the user is authenticated (`isLoggedIn` is true), render the children components.
   * Otherwise, render nothing (null).
   */
  return <>{isLoggedIn ? props.children : null}</>;
};

// Exporting the component for use in other parts of the application
export default ProtectedRoute;