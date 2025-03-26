import { useUpdateTodo, useDeleteTodo } from "../../hooks/useTodos";
import { Todo } from "../../../domain/entities/todo";
import tw from "tailwind-styled-components";

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
  todo: Todo;
  viewType: "list" | "board";
}

export function TodoItem({ todo, viewType }: Props) {
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleCompleteToggle = () => {
    updateTodo({ id: todo.id, updates: { completed: !todo.completed } });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <ListItem>
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={handleCompleteToggle}
      />
      <Title $completed={todo.completed}>{todo.title}</Title>
      {viewType === "list" && (
        <Tag $completed={todo.completed}>
          {todo.completed ? "Done" : "Todo"}
        </Tag>
      )}
      {viewType === "list" && (
        <TagsContainer>
          {todo.tags.map((tag) => (
            <Tag key={tag} $completed={todo.completed}>
              {tag}
            </Tag>
          ))}
        </TagsContainer>
      )}
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
    </ListItem>
  );
}
