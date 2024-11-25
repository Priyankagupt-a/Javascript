
// index.tsx

// Importing necessary modules from React, ReactDOM, and React Query libraries.
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Step 1: Initialize Query Client
// QueryClient is the central entity that holds all the queries and mutations.
const queryClient = new QueryClient();

// Step 2: Define API Functions
// This function fetches the list of users from the mock API (JSON server).
const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3200/users");
  return response.data;
};

// This function adds a new user by sending a POST request to the mock API.
const addUser = async (user: { name: string; email: string }) => {
  const response = await axios.post("http://localhost:3200/users", user);
  return response.data;
};

// Step 3: Create UserList Component
// This component fetches and displays the list of users.
const UserList: React.FC = () => {
  // useQuery fetches data and manages loading/error states automatically.
  const { data, error, isLoading } = useQuery(["users"], fetchUsers);

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;
  // Handle error state
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  // Render the list of users
  return (
    <ul>
      {data.map((user: { id: number; name: string; email: string }) => (
        <li key={user.id}>
          {user.id}. {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
};

// Step 4: Create AddUser Component
// This component provides a form to add a new user.
const AddUser: React.FC = () => {
  const [name, setName] = useState(""); // State to store user name
  const [email, setEmail] = useState(""); // State to store user email
  const queryClient = useQueryClient(); // Access QueryClient instance

  // useMutation handles the mutation (add user) and triggers actions on success or error.
  const mutation = useMutation(addUser, {
    onSuccess: () => {
      // Invalidate the "users" query to refetch updated data
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Handle form submission
  const handleSubmit = () => {
    if (name && email) {
      mutation.mutate({ name, email });
      setName(""); // Reset name field
      setEmail(""); // Reset email field
    }
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button onClick={handleSubmit} disabled={mutation.isLoading}>
        Add User
      </button>
      {/* Show loading message during mutation */}
      {mutation.isLoading && <p>Adding user...</p>}
      {/* Show error message if mutation fails */}
      {mutation.isError && mutation.error instanceof Error && <p>Error: {mutation.error.message}</p>}
    </div>
  );
};

// Step 5: Create the Main App Component
// This component integrates the UserList and AddUser components.
const App: React.FC = () => {
  return (
    <div>
      <h1>React Query Example</h1>
      <UserList /> {/* Display list of users */}
      <AddUser />  {/* Form to add a new user */}
    </div>
  );
};

// Step 6: Render the Application
// Wrapping the App component with QueryClientProvider to provide the QueryClient context.
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root") // Render into the root element of the HTML
);
