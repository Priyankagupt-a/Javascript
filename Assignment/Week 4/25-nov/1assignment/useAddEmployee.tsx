import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee, addEmployee } from '../api/user_serivce';

// Create a custom hook for adding employee
export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  // UseMutation hook setup
  const mutation = useMutation<Employee, Error, Omit<Employee, "id">>({
    mutationFn: addEmployee, // The actual mutation function (addEmployee)

    // onSuccess will run after the mutation is successful
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"], // Refetch the employees data after the mutation is successful
      });
    },

    // onError will run if the mutation encounters an error
    onError: (error: Error) => {
      console.error("Error adding employee:", error.message);
    },
  });

  return mutation;
};
