import { useUpdateTodo, useDeleteTodo } from "../../hooks/useTodos";
import { TodoViewModel } from "../../viewmodels/TodoViewModel";
import {
  TodoTitle,
  TodoItemLayout,
  TodoContentArea,
  TagsContainer,
} from "./styles";
import {
  TodoCheckIcon,
  TodoCircleIcon,
  DeleteIcon,
  EditIcon,
} from "./icons";
import {
  parseDateString,
  isDateWithinDays,
  formatDateAsShortDate,
} from "../../../lib/utils/date";
import { EntityViewType } from "../organisms/EntityView";
import {
  BoardItemCard,
  BoardTag,
  BoardDueDateTag,
  BoardEditButton,
  BoardDeleteButton,
} from "./styles";
import {
  BoardCheckIcon,
  BoardCircleIcon,
  BoardTagIcon,
  BoardClockIcon,
  BoardEditIcon,
  BoardDeleteIcon,
} from "./icons";

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

  const isDueSoon = () => {
    if (!viewModel.dueDate) return false;
    const dueDate = parseDateString(viewModel.dueDate);
    return dueDate ? isDateWithinDays(dueDate, 2) : false;
  };

  if (viewType === "board" || viewType === "list" || viewType === "week" || viewType === "day") {
    return (
      <BoardItemCard $completed={viewModel.completed}>
        <TodoItemLayout>
          <button
            className={`mt-1 transition-colors ${
              viewModel.completed
                ? "text-emerald-500 hover:text-emerald-600"
                : "text-gray-400 hover:text-blue-500"
            }`}
            onClick={handleCompleteToggle}
            aria-label={
              viewModel.completed ? "Mark as incomplete" : "Mark as complete"
            }
          >
            {viewModel.completed ? <BoardCheckIcon /> : <BoardCircleIcon />}
          </button>

          <TodoContentArea>
            <TodoTitle $completed={viewModel.completed}>
              {viewModel.title}
            </TodoTitle>
            <TagsContainer>
              {viewModel.tags && viewModel.tags.length > 0 && (
                <>
                  {viewModel.tags.map((tag, i) => {
                    const tagType = tag.toLowerCase() === 'todo' ? 'todo' : tag.toLowerCase() === 'done' ? 'done' : 'other';
                    return (
                      <BoardTag key={`${viewModel.id}-tag-${i}`} $tagType={tagType}>
                        <BoardTagIcon />
                        {tag}
                      </BoardTag>
                    );
                  })}
                </>
              )}
              {viewModel.dueDate && (
                <BoardDueDateTag $isDueSoon={isDueSoon() && !viewModel.completed}>
                  <BoardClockIcon />
                  {formatDateAsShortDate(parseDateString(viewModel.dueDate))}
                </BoardDueDateTag>
              )}
            </TagsContainer>
          </TodoContentArea>

          <div className="flex space-x-1">
            <BoardEditButton onClick={handleEdit} aria-label="Edit task">
              <BoardEditIcon />
            </BoardEditButton>
            <BoardDeleteButton onClick={handleDelete} aria-label="Delete task">
              <BoardDeleteIcon />
            </BoardDeleteButton>
          </div>
        </TodoItemLayout>
      </BoardItemCard>
    );
  }

  if (viewType === "table") {
    return (
      <>
        <button
          className={`mt-1 transition-colors ${
            viewModel.completed
              ? "text-green-500 hover:text-green-600"
              : "text-gray-400 hover:text-blue-500"
          }`}
          onClick={handleCompleteToggle}
        >
          {viewModel.completed ? (
            <TodoCheckIcon $completed={viewModel.completed} />
          ) : (
            <TodoCircleIcon $completed={viewModel.completed} />
          )}
        </button>
        <button onClick={handleDelete}>
          <DeleteIcon />
        </button>
        <button onClick={handleEdit}>
          <EditIcon />
        </button>
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

  console.warn(`Unhandled viewType in TodoItem: ${viewType}`);
  return null;
}
