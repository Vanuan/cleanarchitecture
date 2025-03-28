import { useUpdateTodo, useDeleteTodo } from "../../hooks/useTodos";
import { TodoViewModel } from "../../viewmodels/TodoViewModel";
import {
  TodoCard,
  TodoToggleButton,
  TodoTitle,
  TodoStatusBadge,
  TodoTag,
  TodoDeleteButton,
  TodoEditButton,
  TodoItemLayout,
  TodoContentArea,
  TagsContainer,
} from "./styles";
import {
  TodoCheckIcon,
  TodoCircleIcon,
  TodoTagIcon,
  DeleteIcon,
  EditIcon,
} from "./icons";
import { format, parseISO } from "date-fns";

interface Props {
  viewModel: TodoViewModel;
  viewType:
    | "list"
    | "board"
    | "table"
    | "calendar"
    | "gallery"
    | "month"
    | "agenda"
    | "week-scroll";
  onEdit: (todo: TodoViewModel) => void;
}

export function TodoItem({ viewModel, viewType, onEdit }: Props) {
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleCompleteToggle = () => {
    updateTodo({
      id: viewModel.id,
      updates: { completed: !viewModel.completed },
    });
  };

  const handleDelete = () => {
    deleteTodo(viewModel.id);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return format(date, "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return null;
    }
  };

  const formatTime = (dateString: string | undefined) => {
    if (!dateString) return null;
    try {
      const date = parseISO(dateString);
      return format(date, "h:mm a");
    } catch (error) {
      console.error("Error formatting time:", error);
      return null;
    }
  };

  const handleEdit = () => {
    onEdit(viewModel);
  };

  if (viewType === "table") {
    return (
      <>
        <TodoToggleButton
          $completed={viewModel.completed}
          onClick={handleCompleteToggle}
        >
          {viewModel.completed ? (
            <TodoCheckIcon $completed={viewModel.completed} />
          ) : (
            <TodoCircleIcon $completed={viewModel.completed} />
          )}
        </TodoToggleButton>
        <TodoDeleteButton onClick={handleDelete}>
          <DeleteIcon />
        </TodoDeleteButton>
        <TodoEditButton onClick={handleEdit}>
          <EditIcon />
        </TodoEditButton>
      </>
    );
  }

  if (viewType === "week") {
    return (
      <div
        className={`p-1 rounded border ${
          viewModel.completed
            ? "bg-gray-50 border-gray-200 text-gray-600"
            : "bg-blue-50 border-blue-200 text-blue-700"
        } mb-1 cursor-pointer hover:shadow-sm transition-shadow`}
        onClick={handleEdit}
      >
        <div className="flex items-center space-x-1">
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={viewModel.completed}
              onChange={(e) => {
                e.stopPropagation();
                handleCompleteToggle();
              }}
              className="h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div
            className={`text-xs truncate ${viewModel.completed ? "line-through" : ""}`}
          >
            {viewModel.title}
          </div>
        </div>
        {viewModel.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {viewModel.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="inline-block px-1 py-0.5 rounded-sm bg-blue-100 text-blue-800 text-xs"
              >
                {tag}
              </span>
            ))}
            {viewModel.tags.length > 1 && (
              <span className="text-gray-500 text-xs">
                +{viewModel.tags.length - 1}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  if (viewType === "month") {
    return (
      <div
        className={`text-xs p-1 mb-1 rounded ${
          viewModel.completed
            ? "bg-gray-100 text-gray-500"
            : "bg-blue-50 text-blue-700"
        } cursor-pointer hover:opacity-80`}
        onClick={handleEdit}
      >
        <div
          className={`truncate ${viewModel.completed ? "line-through" : ""}`}
        >
          {viewModel.title}
        </div>
      </div>
    );
  }

  if (viewType === "week-scroll") {
    return (
      <div className="p-1 text-xs h-full flex flex-col">
        <div
          className={`font-medium truncate ${viewModel.completed ? "line-through text-gray-500" : ""}`}
        >
          {viewModel.title}
        </div>
        {viewModel.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {viewModel.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
            {viewModel.tags.length > 1 && (
              <span className="text-gray-500 text-xs">
                +{viewModel.tags.length - 1}
              </span>
            )}
          </div>
        )}
        {viewModel.dueDate && (
          <div className="text-gray-500 mt-auto text-xs flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {formatTime(viewModel.dueDate)}
          </div>
        )}
      </div>
    );
  }

  if (viewType === "agenda") {
    return (
      <div className="p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
        <div className="flex items-start">
          <TodoToggleButton
            $completed={viewModel.completed}
            onClick={handleCompleteToggle}
          >
            {viewModel.completed ? (
              <TodoCheckIcon $completed={viewModel.completed} />
            ) : (
              <TodoCircleIcon $completed={viewModel.completed} />
            )}
          </TodoToggleButton>

          <TodoContentArea>
            <TodoTitle $completed={viewModel.completed}>
              {viewModel.title}
            </TodoTitle>
            <TagsContainer>
              <TodoTagIcon />
              <TodoStatusBadge $completed={viewModel.completed}>
                {viewModel.displayStatus}
              </TodoStatusBadge>
              {viewModel.tags.map((tag) => (
                <TodoTag key={tag}>{tag}</TodoTag>
              ))}
              {viewModel.dueDate && (
                <TodoTag>Due: {formatDate(viewModel.dueDate)}</TodoTag>
              )}
            </TagsContainer>
          </TodoContentArea>

          <div className="flex">
            <TodoEditButton onClick={handleEdit}>
              <EditIcon />
            </TodoEditButton>
            <TodoDeleteButton onClick={handleDelete}>
              <DeleteIcon />
            </TodoDeleteButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TodoCard $completed={viewModel.completed}>
      <TodoItemLayout>
        <TodoToggleButton
          $completed={viewModel.completed}
          onClick={handleCompleteToggle}
        >
          {viewModel.completed ? (
            <TodoCheckIcon $completed={viewModel.completed} />
          ) : (
            <TodoCircleIcon $completed={viewModel.completed} />
          )}
        </TodoToggleButton>

        <TodoContentArea>
          <TodoTitle $completed={viewModel.completed}>
            {viewModel.title}
          </TodoTitle>
          <TagsContainer>
            <TodoTagIcon />
            <TodoStatusBadge $completed={viewModel.completed}>
              {viewModel.displayStatus}
            </TodoStatusBadge>
            {viewModel.tags.map((tag) => (
              <TodoTag key={tag}>{tag}</TodoTag>
            ))}
            {viewModel.dueDate && (
              <TodoTag>Due: {formatDate(viewModel.dueDate)}</TodoTag>
            )}
          </TagsContainer>
        </TodoContentArea>

        <TodoDeleteButton onClick={handleDelete}>
          <DeleteIcon />
        </TodoDeleteButton>
        <TodoEditButton onClick={handleEdit}>
          <EditIcon />
        </TodoEditButton>
      </TodoItemLayout>
    </TodoCard>
  );
}
