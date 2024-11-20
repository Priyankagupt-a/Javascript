import React from "react";
import { useAuth } from "./AuthContext";

const Profile = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login({ id: 1, name: "Priyanka" })}>Login</button>
      )}
    </div>
  );
};

export default Profile;