import { Todo } from "../../../domain/entities/todo";
import { useTodos, useUpdateTodo } from "../../hooks/useTodos";
import { EntityView, ViewConfig } from "../organisms/EntityView";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { TodoViewModel } from "../../viewmodels/TodoViewModel";
import TodoTableView from "./views/TodoTableView";
import TodoBoardView from "./views/TodoBoardView";
import TodoCalendarView from "./views/TodoCalendarView";
import TodoGalleryView from "./views/TodoGalleryView";
import TodoListView from "./views/TodoListView";
import { LoadingState, Spinner } from "./styles";

const mapTodoToViewModel = (todo: Todo): TodoViewModel => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  tags: todo.tags,
  displayStatus: todo.completed ? "Done" : "Todo",
  dueDate: todo.dueDate && todo.dueDate.toISOString(),
});

export function TodosView() {
  const { data: todos, isLoading } = useTodos();
  const { mutate: updateTodo } = useUpdateTodo();

  const handleTodoUpdate = (id: string, columnId: string) => {
    const completed = columnId === "completed";
    updateTodo({ id: id, updates: { completed: completed } });
  };

  if (isLoading) {
    return (
      <LoadingState>
        <Spinner />
      </LoadingState>
    );
  }

  const todoViewModels = (todos || []).map(mapTodoToViewModel);

  // how to render a Todo
  const renderTodoItem = (viewModel: TodoViewModel, viewType: string) => (
    <TodoItem key={viewModel.id} viewModel={viewModel} viewType={viewType} />
  );

  const defaultViewConfigs: ViewConfig<TodoViewModel, any>[] = [
    {
      id: "list",
      label: "List",
      component: TodoListView,
      config: {},
      getItemId: (viewModel) => viewModel.id,
      renderItem: renderTodoItem,
    },
    {
      id: "table",
      label: "Table",
      component: TodoTableView,
      config: {},
      getItemId: (item) => item.id,
      renderItem: renderTodoItem,
    },
    {
      id: "board",
      label: "Board",
      component: TodoBoardView,
      config: {},
      getItemId: (item) => item.id,
      onItemUpdate: handleTodoUpdate,
      renderItem: renderTodoItem,
    },
    {
      id: "calendar",
      label: "Calendar",
      component: TodoCalendarView,
      config: {
        dateField: "dueDate", // Field to use for calendar grouping
      },
      getItemId: (item) => item.id,
      renderItem: renderTodoItem,
    },
    {
      id: "gallery",
      label: "Gallery",
      component: TodoGalleryView,
      config: {},
      getItemId: (item) => item.id,
      renderItem: renderTodoItem,
    },
  ];

  return (
    <EntityView<TodoViewModel>
      items={todoViewModels}
      defaultViewConfigs={defaultViewConfigs}
      defaultView="calendar"
      getItemId={(viewModel) => viewModel.id}
      EntityForm={TodoForm}
      formProps={{}}
      addButtonText="Add Todo"
      renderItem={renderTodoItem}
    />
  );
}
