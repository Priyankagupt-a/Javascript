// Login.tsx

/**
 * This file defines the `Login` component in React.
 * It provides a simple login form that validates user credentials 
 * and redirects to a specified return URL upon successful authentication.
 */

import React, { useEffect, useState } from 'react'; // Importing React essentials for functional components and hooks
import { useLocation, useNavigate } from "react-router-dom"; // React Router hooks for navigation and location handling

// Defining the Login component as a React Functional Component (FC)
const Login: React.FC = () => {
  // State variables for managing user input and authentication feedback
  const [uid, setUserId] = useState<string>("admin"); // Default User ID
  const [pwd, setPassword] = useState<string>("admin123"); // Default Password
  const [result, setResult] = useState<string>(""); // Feedback message for authentication result

  const navigate = useNavigate(); // Hook for programmatically navigating between routes
  const location = useLocation(); // Hook for accessing the current URL and query parameters

  /**
   * Handles the Login button click event.
   * Validates user credentials and redirects to the return URL if successful.
   */
  function loginButton_click() {
    // Extracting the query string from the current URL
    const queryString = location.search; // Returns the query string from the current URL

    // Parsing the "returnUrl" query parameter
    let strReturnUrl: string | null = new URLSearchParams(queryString).get('returnUrl');

    // If no return URL is specified, default to the home route
    if (strReturnUrl == null) strReturnUrl = "/";

    /**
     * Simulating credential validation (replace with server-side validation in real apps).
     * In real-time applications, we will get the token from the server,
     * with JWT being a popular library for token generation.
     */
    if (uid === "user" && pwd === "admin123") {
      // Generate a mock token (replace with a server-generated token, e.g., JWT)
      let token = "ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS";
      
      
      

     
      sessionStorage.setItem('AUTH_TOKEN', token);
      
      /**
       *  // Store token and role in sessionStorage
       * Storing the token in sessionStorage for later use in protected routes.
       * sessionStorage is used here for temporary storage, lasting until the browser tab is closed.
       */
      // sessionStorage.setItem('AUTH_TOKEN', token);
      // sessionStorage.setItem('USER_ROLE', admin);

      // Navigate to the specified return URL or home route
      navigate(`${strReturnUrl}`);
    } else if(uid === "admin" && pwd === "admin123"){
      let token = "ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS";
      let role='admin'
      sessionStorage.setItem('AUTH_TOKEN', token);
      sessionStorage.setItem('USER_ROLE', role);
      navigate(`${strReturnUrl}`);

    }else {
      // Set an error message if credentials are invalid
      setResult("Invalid User Id or Password");
    }
  }
 
 


  /**
   * Render method: Displays the login form with controlled inputs for User ID and Password.
   * Includes a Login button and displays feedback for authentication results.
   */
  return (
    <>
      <fieldset>
        <legend>User Login</legend>

        {/* Input for User ID */}
        <label>User Id  : </label>
        <input 
          type="text" 
          value={uid} 
          onChange={(event) => setUserId(event.target.value)} 
        />
        <br /><br />

        {/* Input for Password */}
        <label>Password  : </label>
        <input 
          type="password"  
          value={pwd}  
          onChange={(event) => setPassword(event.target.value)} 
        />
        <br /><br />

        {/* Login Button */}
        <input 
          type="button"  
          onClick={loginButton_click}  
          value="Login" 
        />
        {/* Display Authentication Result */}
        <p style={{ color: "red" }}>{result}</p>   
      </fieldset>
    </>
  );
};

// Exporting the Login component for use in other parts of the application
export default Login;