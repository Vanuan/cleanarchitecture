import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import tw from "tailwind-styled-components";

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

const ListView = tw.ul`
  flex flex-col gap-3
`;

const GridView = tw.div`
  grid grid-cols-2 gap-4
`;

const Column = tw.div`
  flex flex-col gap-3 p-4 bg-gray-50 rounded-lg
`;

const ColumnTitle = tw.h2`
  text-lg font-semibold mb-2 text-gray-700
`;

const LoadingText = tw.div`
  text-center text-gray-500 py-8
`;

type ViewType = "list" | "grid";

export function TodoList() {
  const [viewType, setViewType] = useState<ViewType>("list");
  const { data: todos, isLoading } = useTodos();

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  const todoItems = todos?.filter((todo) => !todo.completed) || [];
  const completedItems = todos?.filter((todo) => todo.completed) || [];

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
          $active={viewType === "grid"}
          onClick={() => setViewType("grid")}
        >
          Grid View
        </ToggleButton>
      </ViewToggle>

      {viewType === "list" ? (
        <ListView>
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} viewType={viewType} />
          ))}
        </ListView>
      ) : (
        <GridView>
          <Column>
            <ColumnTitle>To Do</ColumnTitle>
            {todoItems.map((todo) => (
              <TodoItem key={todo.id} todo={todo} viewType={viewType} />
            ))}
          </Column>
          <Column>
            <ColumnTitle>Done</ColumnTitle>
            {completedItems.map((todo) => (
              <TodoItem key={todo.id} todo={todo} viewType={viewType} />
            ))}
          </Column>
        </GridView>
      )}
    </Container>
  );
}
