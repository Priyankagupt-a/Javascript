import React from "react";

const AdminHome: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Home</h1>
      <p style={styles.text}>Welcome to the Admin Dashboard. Manage everything with ease!</p>
    </div>
  );
};

// Type the styles object with React.CSSProperties
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#1e1e1e",
    color: "#f5f5f5",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    margin: "2rem auto",
    width: "80%",
    maxWidth: "600px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
  },
};

export default AdminHome;