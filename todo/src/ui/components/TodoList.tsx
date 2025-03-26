import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import tw from "tailwind-styled-components";

const List = tw.ul`
  flex flex-col gap-3 w-full max-w-md mx-auto p-4
`;

const LoadingText = tw.div`
  text-center text-gray-500 py-8
`;

export function TodoList() {
  const { data: todos, isLoading } = useTodos();

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  return (
    <List>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
}
