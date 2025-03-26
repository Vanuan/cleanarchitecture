import { useTodos, useUpdateTodo } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import tw from "tailwind-styled-components";
import { Todo } from "../../domain/entities/todo";
import { EntityList } from "./EntityList";

const LoadingText = tw.div`
  text-center text-gray-500 py-8
`;

export function TodoList() {
  const { data: todos, isLoading } = useTodos();
  const { mutate: updateTodo } = useUpdateTodo();

  const handleTodoUpdate = (id: string, columnId: string) => {
    const completed = columnId === "completed";
    updateTodo({ id: id, updates: { completed: completed } });
  };

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  const boardColumns = [
    {
      id: "todo",
      title: "To Do",
      filter: (todo: Todo) => !todo.completed,
    },
    {
      id: "completed",
      title: "Done",
      filter: (todo: Todo) => todo.completed,
    },
  ];

  return (
    <EntityList
      items={todos || []}
      renderItem={(todo, viewType) => (
        <TodoItem key={todo.id} todo={todo} viewType={viewType} />
      )}
      getItemId={(todo) => todo.id}
      onItemUpdate={handleTodoUpdate}
      boardColumns={boardColumns}
    />
  );
}
