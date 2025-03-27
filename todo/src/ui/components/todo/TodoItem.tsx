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
import { format } from "date-fns";

interface Props {
  viewModel: TodoViewModel;
  viewType: "list" | "board" | "table" | "calendar" | "gallery";
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
