import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>This is Admin Component</h3>
      <nav>
        <Link to="admin-home">Admin </Link>{" | "}
        <Link to="project">Project</Link>{" | "}
        <Link to="customer">Customer</Link>
      </nav>
    
      <Outlet />
    </div>
  );
};

export default Admin;