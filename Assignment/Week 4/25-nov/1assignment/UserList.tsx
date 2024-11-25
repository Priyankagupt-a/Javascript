import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchEmployees, Employee, updateEmployee, deleteEmployee } from "../api/user_serivce";
import { useDeleteEmployee } from "./Delete";
import { useAddEmployee } from "./useAddEmployee"; // Import the custom hook for adding an employee
import './UserList.css';
const UserList: React.FC = () => {
  const queryClient = useQueryClient();

  // Fetch employee data
  const { data, error, isLoading } = useQuery<Employee[], Error>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  // State to manage the selected employee to be updated
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [mode, setMode] = useState<"add" | "update">("add"); // To switch between add and update modes

  // Mutation to update employee data
  const mutation = useMutation<Employee, Error, Employee>({
    mutationFn: updateEmployee, // wrap updateEmployee in mutationFn
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"], // Invalidate to refetch employees
      });
      setEditEmployee(null); // Close the edit form after successful update
      setMode("add"); // Switch back to add mode
    },
  });

  // Use the custom hook for adding an employee
  const { mutate: addEmployee, isPending: isAdding, error: addError } = useAddEmployee();

  // Use the custom hook for deleting an employee
  const { deleteEmployee, isDeleting, error: deleteError } = useDeleteEmployee();

  if (isLoading) return <img src="/Images/Loading.gif" width="100" height={100} />;
  if (error) return <p>Error: {error.message}</p>;

  // Handle submitting the form (either for adding or updating an employee)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "add") {
      addEmployee(editEmployee!); // Adding a new employee
    } else if (mode === "update" && editEmployee) {
      mutation.mutate(editEmployee); // Updating an existing employee
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editEmployee) {
      setEditEmployee({
        ...editEmployee,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle the edit button click to open the edit form
  const handleUpdate = (userId: number) => {
    const employeeToEdit = data?.find((emp) => emp.id === userId);
    if (employeeToEdit) {
      setEditEmployee(employeeToEdit); // Set the selected employee for editing
      setMode("update"); // Switch to update mode
    }
  };

  // Handle the delete button click
  const handleDelete = (employeeId: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(employeeId);
    }
  };

  return (
    <div>
      <h2>{mode === "add" ? "Add New Employee" : "Update Employee"}</h2>
      {/* Employee Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editEmployee?.name || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Designation:
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={editEmployee?.designation || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editEmployee?.email || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={editEmployee?.contact || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={editEmployee?.department || ""}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" disabled={isAdding}>
          {mode === "add" ? "Add Employee" : "Update Employee"}
        </button>
        {mode === "update" && (
          <button type="button" onClick={() => setMode("add")}>
            Cancel
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>{employee.email}</td>
              <td>{employee.contact}</td>
              <td>{employee.department}</td>
              <td>
                <button onClick={() => handleUpdate(employee.id)}>Update</button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(employee.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
