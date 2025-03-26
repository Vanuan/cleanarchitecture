import { useUpdateTodo, useDeleteTodo } from "../../hooks/useTodos";
import tw from "tailwind-styled-components";
import { TodoViewModel } from "../../viewmodels/TodoViewModel";

const ListItem = tw.div`
  flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm
  border border-gray-200 hover:shadow-md transition-shadow duration-200
`;

const Checkbox = tw.input`
  w-5 h-5 cursor-pointer accent-blue-500
`;

const Title = tw.span<{ $completed?: boolean }>`
  flex-1 text-gray-800
  ${({ $completed }) => ($completed ? "line-through text-gray-400" : "")}
`;

const Tag = tw.span<{ $completed?: boolean }>`
  px-2 py-1 text-sm rounded-full
  ${({ $completed }) =>
    $completed
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"}
`;

const TagsContainer = tw.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;
const DeleteButton = tw.button`
  px-3 py-1 text-sm text-red-500 hover:text-red-700
  hover:bg-red-50 rounded transition-colors duration-200
`;

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
        <Checkbox
          type="checkbox"
          checked={viewModel.completed}
          onChange={handleCompleteToggle}
        />
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </>
    );
  }

  return (
    <ListItem>
      <Checkbox
        type="checkbox"
        checked={viewModel.completed}
        onChange={handleCompleteToggle}
      />
      <Title $completed={viewModel.completed}>{viewModel.title}</Title>
      {viewType === "list" && (
        <Tag $completed={viewModel.completed}>{viewModel.displayStatus}</Tag>
      )}
      {viewType === "list" && (
        <TagsContainer>
          {viewModel.tags.map((tag) => (
            <Tag key={tag} $completed={viewModel.completed}>
              {tag}
            </Tag>
          ))}
        </TagsContainer>
      )}
      {viewType === "table" && (
        <TagsContainer>
          {viewModel.tags.map((tag) => (
            <Tag key={tag} $completed={viewModel.completed}>
              {tag}
            </Tag>
          ))}
        </TagsContainer>
      )}

      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
    </ListItem>
  );
}
