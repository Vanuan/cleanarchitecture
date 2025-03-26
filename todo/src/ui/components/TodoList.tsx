import { useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { useTodos, useUpdateTodo } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import tw from "tailwind-styled-components";
import { StrictModeDroppable } from "./StrictModeDroppable";

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

      {viewType === "list" ? <List /> : <Board />}
    </Container>
  );
}

function List() {
  const { data: todos, isLoading } = useTodos();

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  const ListView = tw.ul`
    flex flex-col gap-3
  `;
  return (
    <ListView>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} viewType="list" />
      ))}
    </ListView>
  );
}

function Board() {
  const { data: todos, isLoading } = useTodos();
  const { mutate: updateTodo } = useUpdateTodo();

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  const GridView = tw.div`
    grid grid-cols-2 gap-4
  `;

  const Column = tw.div`
    flex flex-col gap-3 p-4 bg-gray-50 rounded-lg min-h-[200px]
  `;

  const ColumnTitle = tw.h2`
    text-lg font-semibold mb-2 text-gray-700
  `;

  const todoItems = todos?.filter((todo) => !todo.completed) || [];
  const completedItems = todos?.filter((todo) => todo.completed) || [];

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const todo = todos?.find((todo) => todo.id === draggableId);

    if (!todo) {
      return;
    }

    const completed = destination.droppableId === "completed";

    if (todo.completed !== completed) {
      updateTodo({ id: todo.id, updates: { completed: completed } });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <GridView>
        <StrictModeDroppable droppableId="todo">
          {(provided) => (
            <Column ref={provided.innerRef} {...provided.droppableProps}>
              <ColumnTitle>To Do</ColumnTitle>
              {todoItems.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem todo={todo} viewType="grid" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Column>
          )}
        </StrictModeDroppable>
        <StrictModeDroppable droppableId="completed">
          {(provided) => (
            <Column ref={provided.innerRef} {...provided.droppableProps}>
              <ColumnTitle>Done</ColumnTitle>
              {completedItems.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem todo={todo} viewType="grid" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Column>
          )}
        </StrictModeDroppable>
      </GridView>
    </DragDropContext>
  );
}
