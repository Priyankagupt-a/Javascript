import React, { useState, useEffect } from "react";
import { CustServices } from "../services/custServices";
import "./CustomerCard.css";

interface Customer {
  customerId: number;
  name: string;
  city: string;
  contactNumber: string;
  year: number;
  photo: string;
  totalPurchasesPerYear: number;
}

const CustCrud: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    customerId: 0,
    name: "",
    city: "",
    contactNumber: "",
    year: 0,
    photo: "",
    totalPurchasesPerYear: 0,
  });
 
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchData();
  }, []);
 

  const fetchData = () => {
    CustServices.getAllCust().then((data: Customer[]) => setCustomers(data));
  };
 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };



const validateCustomer = () => {
  if (!newCustomer.name.trim()) {
    setError("Name is required.");
    return false;
  }
  if (!newCustomer.city.trim()) {
    setError("City is required.");
    return false;
  }
  if (!/^\d+$/.test(newCustomer.contactNumber)) {
    setError("Contact Number should be numeric.");
    return false;
  }
  if (newCustomer.year <= 0) {
    setError("Year must be greater than 0.");
    return false;
  }
  if (!/^https?:\/\/.+/.test(newCustomer.photo) && newCustomer.photo.trim()) {
    setError("Photo URL is invalid.");
    return false;
  }
  if (newCustomer.totalPurchasesPerYear < 0) {
    setError("Total Purchases cannot be negative.");
    return false;
  }
  setError(null);
  return true;
};



const fetchTop5Customers = () => {
  CustServices.getTop5Cust("desc").then((data: Customer[]) => {
    setCustomers(data);
  });
};
  const addCustomer = async () => {
    if (!validateCustomer()) return;

    if (newCustomer.customerId === 0) {
      const result = await CustServices.createCust(newCustomer);  
      setCustomers([...customers, result]);  
    } else {
      const result = await CustServices.updateCust(newCustomer); 
      setCustomers(customers.map((cust) => (cust.customerId === result.customerId ? result : cust)));
    }
    setNewCustomer({
      customerId: 0,
      name: "",
      city: "",
      contactNumber: "",
      year: 0,
      photo: "",
      totalPurchasesPerYear: 0,
    });
  };

  const handleEdit = (customerId: number) => {
    const customerToEdit = customers.find(
      (cust) => cust.customerId === customerId
    );

    if (customerToEdit) {
      setNewCustomer(customerToEdit);
    }
  };

  const handleDelete = (id: number) => {
    CustServices.deleteCust(id).then(() => {
      alert(`Requested dept-${id} was deleted successfully.`);
      fetchData();
    });
  };

  console.log("customers",customers,"newCustomer",newCustomer)
  return (
    <>
      <h2>Customer Management</h2>
      <p className="error-message">{error}</p>
      <div>
        <h3>Add / Edit Customer</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCustomer.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newCustomer.city}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={newCustomer.contactNumber}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={newCustomer.year}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={newCustomer.photo}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="totalPurchasesPerYear"
          placeholder="Total Purchases"
          value={newCustomer.totalPurchasesPerYear}
          onChange={handleInputChange}
        />
    <button onClick={addCustomer}>
  {newCustomer.customerId === 0 ? "Add Customer" : "Update Customer"}
</button>
<button onClick={fetchTop5Customers}>Top Five</button>
      </div>
      <div>
        <h3>Customer List</h3>
        <div className="card-container">
          {customers.map((customer) => (
            <div className="customer-card" key={customer.customerId}>
              <img
                className="customer-photo"
                src={
                  customer.photo ||
                  "https://example.com/default-photo.jpg"
                }
                alt={customer.name}
              />
              <div className="customer-details">
                <h3 className="customer-name">{customer.name}</h3>
                <p>
                  <strong>City:</strong> {customer.city}
                </p>
                <p>
                  <strong>Contact:</strong> {customer.contactNumber}
                </p>
                <p>
                  <strong>Year:</strong> {customer.year}
                </p>
                <p>
                  <strong>Total Purchases:</strong> $
                  {customer.totalPurchasesPerYear}
                </p>
              </div>
              <div className="button-group">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(customer.customerId)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(customer.customerId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustCrud;
