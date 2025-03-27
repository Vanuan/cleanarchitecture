import { useUpdateTodo, useDeleteTodo } from "../../hooks/useTodos";
import tw from "tailwind-styled-components";
import { TodoViewModel } from "../../viewmodels/TodoViewModel";
import {
  TodoCard,
  TodoToggleButton,
  TodoTitle,
  TodoStatusBadge,
  TodoTag,
  TodoDeleteButton,
  TodoItemLayout,
  TodoContentArea,
  TagsContainer,
} from "./styles";
import {
  TodoCheckIcon,
  TodoCircleIcon,
  TodoTagIcon,
  DeleteIcon,
} from "./icons";

interface Props {
  viewModel: TodoViewModel;
  viewType: "list" | "board" | "table";
}

export function TodoItem({ viewModel, viewType }: Props) {
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
          </TagsContainer>
        </TodoContentArea>

        <TodoDeleteButton onClick={handleDelete}>
          <DeleteIcon />
        </TodoDeleteButton>
      </TodoItemLayout>
    </TodoCard>
  );
}
