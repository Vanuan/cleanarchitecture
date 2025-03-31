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
import {
  formatDateAsFullDayDisplay,
  parseDateString,
} from "../../../lib/utils/date";
import { EntityViewType } from "../organisms/EntityView";

interface Props {
  viewModel: TodoViewModel;
  viewType: EntityViewType;
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

  if (viewType === "week") {
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
                <TodoTag>
                  Due:{" "}
                  {formatDateAsFullDayDisplay(
                    parseDateString(viewModel.dueDate),
                  )}
                </TodoTag>
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

  if (viewType === "day") {
    return (
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

        <div className="flex-1 min-w-0">
          <h4
            className={`${viewModel.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
          >
            {viewModel.title}
          </h4>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <TodoTagIcon />
            <TodoStatusBadge $completed={viewModel.completed}>
              {viewModel.displayStatus}
            </TodoStatusBadge>
            {viewModel.tags.map((tag) => (
              <TodoTag key={tag}>{tag}</TodoTag>
            ))}
          </div>
        </div>

        <div className="flex space-x-2 ml-2">
          <TodoDeleteButton onClick={handleDelete}>
            <DeleteIcon />
          </TodoDeleteButton>
          <TodoEditButton onClick={handleEdit}>
            <EditIcon />
          </TodoEditButton>
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
              <TodoTag>
                Due:{" "}
                {formatDateAsFullDayDisplay(parseDateString(viewModel.dueDate))}
              </TodoTag>
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
