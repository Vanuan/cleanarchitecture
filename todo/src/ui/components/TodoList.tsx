import { useState } from "react";
import { useTodos, useUpdateTodo } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import tw from "tailwind-styled-components";
import { Board } from "./Board";
import { Todo } from "../../domain/entities/todo";
import { List } from "./List";

const Container = tw.div`
  w-full max-w-4xl mx-auto p-4
`;

const ViewToggle = tw.div`
  flex justify-end mb-4 gap-2
`;

const ToggleButton = tw.button<{ $active?: boolean }>`
  px-4 py-2 rounded-lg transition-colors duration-200
  ${({ $active }) =>
    $active
      ? "bg-blue-500 text-white"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
`;

const LoadingText = tw.div`
  text-center text-gray-500 py-8
`;

type ViewType = "list" | "board";

export function TodoList() {
  const [viewType, setViewType] = useState<ViewType>("list");
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
    <Container>
      <ViewToggle>
        <ToggleButton
          $active={viewType === "list"}
          onClick={() => setViewType("list")}
        >
          List View
        </ToggleButton>
        <ToggleButton
          $active={viewType === "board"}
          onClick={() => setViewType("board")}
        >
          Board View
        </ToggleButton>
      </ViewToggle>

      {viewType === "list" ? (
        <List
          items={todos || []}
          renderItem={(todo) => (
            <TodoItem key={todo.id} todo={todo} viewType="list" />
          )}
        />
      ) : (
        <Board
          items={todos || []}
          columns={boardColumns}
          onItemUpdate={handleTodoUpdate}
          renderItem={(todo) => <TodoItem todo={todo} viewType="grid" />}
          getItemId={(todo) => todo.id}
        />
      )}
    </Container>
  );
}
