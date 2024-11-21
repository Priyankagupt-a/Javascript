import React, { useState } from "react";
import CustCrud from "./component/CustCrud";

// Task Components
const Home = () => (
  <div>
    <h4>1.  Create a component to perform CRUD operations on customers data</h4>
    <p>

a.  customer details :   CustomerId,  Name,  City, ContactNumber, Year, Photo, TotalPurchasesPerYear<br></br>
b.  TotalPurchasesPerYear -- it means total amount he spend to but the products in our store<br></br>
c.   For time being,  Photo -- give some online urls <br></br>
d.  Try to add validations while perform create operations. <br></br>.</p>


<CustomerCRUD/>
  </div>
);

const CustomerCRUD = () => (
  <div>
    <h1>Customer Management</h1>
    <p>Perform CRUD operations on customer data here.</p>
    {/* You can implement the CRUD functionality here */}
  </div>
);

const Analytics = () => (
  <div>
    <h1>1.  Create a component to perform CRUD operations on customers data</h1>
    <p>

a.  customer details :   CustomerId,  Name,  City, ContactNumber, Year, Photo, TotalPurchasesPerYear 
b.  TotalPurchasesPerYear -- it means total amount he spend to but the products in our store
c.   For time being,  Photo -- give some online urls 
d.  Try to add validations while perform create operations. .</p>
  </div>
);

const Settings = () => (
  <div>
    <h1>App Settings</h1>
    <p>Modify application preferences here.</p>
  </div>
);

// Main App Component
function App() {
  const [activeComponent, setActiveComponent] = useState("Home");

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case "CustomerCRUD":
        return <CustomerCRUD />;
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <CustCrud/>
      {/* <header className="App-header">
        <h1>CRUD Operation</h1>
        <div style={{ marginBottom: "20px" }}>
          {/* Navigation Buttons */}
          {/* <button onClick={() => setActiveComponent("Home")} style={buttonStyle}>
            TASK 1
          </button>
          <button onClick={() => setActiveComponent("CustomerCRUD")} style={buttonStyle}>
          TASK 2
          </button>
          <button onClick={() => setActiveComponent("Analytics")} style={buttonStyle}>
          TASK 3
          </button>
          <button onClick={() => setActiveComponent("Settings")} style={buttonStyle}>
          TASK 4
          </button>
        </div>
        {/* Render Selected Component */}
        {/* <div style={{}}>{renderComponent()}</div>
      </header> */} 
    </div>
  );
}

// Inline Styles for Buttons and Content
const buttonStyle = {
  padding: "10px 15px",
  margin: "5px",
  backgroundColor: "#007BFF",
  color: "#FFF",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const contentStyle = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  width: "80%",
  margin: "0 auto",
  textAlign: "left",
};

export default App;