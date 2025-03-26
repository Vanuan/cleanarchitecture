import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useService } from "./useService";
import { Todo } from "../../domain/entities/todo";

export function useTodos() {
  const service = useService();
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => service.getAll(),
  });
}

export function useCreateTodo() {
  const service = useService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Todo, "id" | "createdAt" | "updatedAt" | "tags">) =>
      service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useUpdateTodo() {
  const service = useService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Todo> }) =>
      service.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useDeleteTodo() {
  const service = useService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => service.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
