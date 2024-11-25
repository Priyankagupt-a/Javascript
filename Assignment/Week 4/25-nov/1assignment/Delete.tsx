import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../api/user_serivce";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  // Mutation for deleting an employee
  const mutation = useMutation<void, Error, number>({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      // Invalidate the employees query to trigger a refetch after delete
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // Return the mutation's mutate function and other properties
  return {
    deleteEmployee: mutation.mutate,
    isDeleting: mutation.status === 'pending', // Check for 'pending' instead of 'loading'
    error: mutation.error,
  };
};
