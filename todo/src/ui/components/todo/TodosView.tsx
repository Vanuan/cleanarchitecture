import { Todo } from "../../../domain/entities/todo";
import { useTodos, useUpdateTodo, useCreateTodo } from "../../hooks/useTodos";
import {
  EntityView,
  EntityViewType,
  FormModel,
  ViewConfig,
} from "../organisms/EntityView";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { TodoViewModel } from "../../viewmodels/TodoViewModel";
// import TodoTableView from "./views/TodoTableView";
import TodoBoardView from "./views/TodoBoardView";
import TodoCalendarView from "./views/TodoCalendarView";
// import TodoGalleryView from "./views/TodoGalleryView";
import TodoListView from "./views/TodoListView";
import { LoadingState, Spinner } from "./styles";
import { useCallback, useEffect } from "react";
import { parseDateString } from "../../../lib/utils/date";
import useUiStore from "./store/uiStore";

const mapTodoToViewModel = (todo: Todo): TodoViewModel => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  tags: todo.tags,
  displayStatus: todo.completed ? "Done" : "Todo",
  dueDate: todo.dueDate && todo.dueDate.toISOString(),
  isAllDay: todo.isAllDay,
});

export function TodosView() {
  const { data: todos, isLoading } = useTodos();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: createTodo } = useCreateTodo();

  // Get state and actions from uiStore
  const currentView = useUiStore(
    (state) => state.currentView as EntityViewType,
  );
  const setCurrentView = useUiStore(
    (state) => state.setCurrentView as (v: EntityViewType) => void,
  );
  const isFormOpen = useUiStore((state) => state.isFormOpen);
  const setIsFormOpen = useUiStore((state) => state.setIsFormOpen);
  const editingTodoViewModel = useUiStore((state) => state.editingTodo);
  const setEditingTodoViewModel = useUiStore((state) => state.setEditingTodo);
  const calendarViewType = useUiStore((state) => state.calendarViewType);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTodoViewModel(null);
  }, [setIsFormOpen, setEditingTodoViewModel]);

  const handleEditTodo = useCallback(
    (todo: TodoViewModel) => {
      setEditingTodoViewModel(todo);
      setIsFormOpen(true);
    },
    [setEditingTodoViewModel, setIsFormOpen],
  );

  useEffect(() => {
    // When switching to the calendar view, ensure a default sub-view is selected
    if (currentView === "calendar") {
      if (
        !calendarViewType ||
        !["month", "week", "day"].includes(calendarViewType)
      ) {
        useUiStore.getState().setCalendarViewType("month");
      }
    }
  }, [currentView]);

  const handleCreateTodo = useCallback(
    // Receives data shaped like the ViewModel/Form
    (formData: FormModel<TodoViewModel>) => {
      // Convert formData (ViewModel like) back to Domain Entity Omit<Todo,...>
      const domainData: Omit<
        Todo,
        "id" | "createdAt" | "updatedAt" | "tags"
      > & { tags?: string[] } = {
        title: formData.title || "", // Ensure title is defined
        completed: formData.completed || false,
        dueDate: formData.dueDate
          ? parseDateString(formData.dueDate)
          : undefined,
        isAllDay: formData.isAllDay,
        // Assuming tags are handled directly in the service/repo or extracted differently
        // If the form provided tags: tags: formData.tags
      };
      createTodo(domainData);
    },
    [createTodo],
  );
  const handleUpdateTodo = useCallback(
    // Receives data shaped like the ViewModel/Form
    (id: string, formData: FormModel<TodoViewModel>) => {
      // Convert formData (ViewModel like) back to Domain Entity Partial<Todo>
      const domainUpdates: Partial<Todo> = {
        // Only include fields that were potentially changed by the form
        ...(formData.title !== undefined && { title: formData.title }),
        ...(formData.completed !== undefined && {
          completed: formData.completed,
        }),
        // Handle date conversion carefully
        ...(formData.dueDate !== undefined && {
          dueDate: formData.dueDate
            ? parseDateString(formData.dueDate)
            : undefined,
        }),
        ...(formData.isAllDay !== undefined && { isAllDay: formData.isAllDay }),
        // If the form provided tags: ...(formData.tags !== undefined && { tags: formData.tags })
      };

      // Don't submit empty updates
      if (Object.keys(domainUpdates).length > 0) {
        updateTodo({ id, updates: domainUpdates });
      } else {
        console.warn("Update called with no changes from form data.");
      }
    },
    [updateTodo],
  );

  const renderTodoItem = useCallback(
    (viewModel: TodoViewModel) => {
      const actualViewType =
        currentView === "calendar"
          ? calendarViewType || "month"
          : currentView;

      return (
        <TodoItem
          key={viewModel.id}
          viewModel={viewModel}
          onEdit={handleEditTodo}
          viewType={actualViewType as EntityViewType}
        />
      );
    },
    [handleEditTodo, currentView, calendarViewType],
  );

  const handleCalendarAddItem = useCallback(
    ({ dueDate, isAllDay }: { dueDate?: string; isAllDay?: boolean }) => {
      setEditingTodoViewModel({
        // Pre-fill ViewModel for adding
        id: "",
        title: "",
        completed: false,
        tags: [],
        displayStatus: "Todo",
        dueDate,
        isAllDay,
      });
      setIsFormOpen(true);
    },
    [setEditingTodoViewModel, setIsFormOpen],
  );

  if (isLoading) {
    return (
      <LoadingState>
        <Spinner />
      </LoadingState>
    );
  }

  // how to render a Todo
  const defaultViewConfigs: ViewConfig<TodoViewModel, object>[] = [
    {
      id: "list",
      label: "List",
      component: TodoListView,
      config: {},
      getItemId: (viewModel) => viewModel.id,
      renderItem: renderTodoItem,
    },
    // {
    //   id: "table",
    //   label: "Table",
    //   component: TodoTableView,
    //   config: {},
    //   getItemId: (item) => item.id,
    //   renderItem: renderTodoItem,
    // },
    {
      id: "board",
      label: "Board",
      component: TodoBoardView,
      config: {},
      getItemId: (item) => item.id,
      onItemUpdate: (id, columnId) => {
        const completed = columnId === "completed";
        handleUpdateTodo(id, { completed });
      },
      renderItem: renderTodoItem,
    },
    {
      id: "calendar",
      label: "Calendar",
      component: TodoCalendarView,
      getItemId: (viewModel) => viewModel.id,
      renderItem: renderTodoItem,
      config: {
        dateField: "dueDate",
      },
      onAddItem: handleCalendarAddItem,
    },

    // {
    //   id: "month",
    //   label: "Month",
    //   component: TodoCalendarView,
    //   getItemId: (viewModel) => viewModel.id,
    //   renderItem: renderTodoItem,
    //   config: { dateField: "dueDate" },
    //   onAddItem: handleCalendarAddItem,
    // },
    // {
    //   id: "week",
    //   label: "Week",
    //   component: TodoCalendarView,
    //   getItemId: (viewModel) => viewModel.id,
    //   renderItem: renderTodoItem,
    //   config: { dateField: "dueDate" },
    //   onAddItem: handleCalendarAddItem,
    // },
    // {
    //   id: "day",
    //   label: "Day",
    //   component: TodoCalendarView,
    //   getItemId: (viewModel) => viewModel.id,
    //   renderItem: renderTodoItem,
    //   config: { dateField: "dueDate" },
    //   onAddItem: handleCalendarAddItem,
    // },
    // {
    //   id: "gallery",
    //   label: "Gallery",
    //   component: TodoGalleryView,
    //   config: {},
    //   getItemId: (item) => item.id,
    //   renderItem: renderTodoItem,
    // },
  ];
  const todoViewModels = (todos || []).map(mapTodoToViewModel);

  return (
    <EntityView<TodoViewModel>
      items={todoViewModels}
      defaultViewConfigs={defaultViewConfigs}
      getItemId={(viewModel) => viewModel.id}
      EntityForm={TodoForm as React.ComponentType<{
        onClose: () => void;
        onSubmit?: (data: unknown) => void;
        initialValues?: unknown;
      }>}
      onUpdateItem={handleUpdateTodo}
      onCreateItem={handleCreateTodo}
      isLoading={isLoading}
      renderItem={renderTodoItem}
      currentView={currentView}
      setCurrentView={setCurrentView}
      isFormOpen={isFormOpen}
      closeForm={closeForm}
      editingItem={editingTodoViewModel}
    />
  );
}
