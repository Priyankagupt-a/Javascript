import React, { useState,useEffect } from "react";
import { CustServices } from "../services/custServices";

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

      useEffect(() => {     
        fetchData();     
      }, []);
      const fetchData = () => 
        {
       
       CustServices
          .getAllCust().then((data:Customer[]) => setCustomers(data)); 
        };



      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
      };

     
      const addCustomer = () => {
        if (newCustomer.customerId === 0) {
       
          setCustomers([
            ...customers,
            { ...newCustomer, customerId: customers.length + 1 },
          ]);
        } else {
       
          setCustomers(
            customers.map((cust) =>
              cust.customerId === newCustomer.customerId ? newCustomer : cust
            )
          );
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
       
        const customerToEdit = customers.find((cust) => cust.customerId === customerId);
        
        if (customerToEdit) {
          setNewCustomer(customerToEdit);
        }
      };
      
    return (
        <>
          <h2>Customer Management</h2>
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
            <button onClick={addCustomer}>Add Customer</button>
          </div>
          <div>
            <h3>Customer List</h3>
            <ul>
              {customers.map((customer) => (
                <li key={customer.customerId}>
                  <p>Name: {customer.name}</p>
                  <p>City: {customer.city}</p>
                  <p>Contact: {customer.contactNumber}</p>
                  <p>Year: {customer.year}</p>
                  <img style={{width:"80px", height:"90px"}} src={customer.photo || "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1563409972&width=1500"} alt={customer.name} />
                  <p>Total Purchases: ${customer.totalPurchasesPerYear}</p>
                  <button 
            onClick={() => handleEdit(customer.customerId)}>
                    Edit</button>
                  <button>Delete</button>
         
                  
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    };
    

export default CustCrud;
