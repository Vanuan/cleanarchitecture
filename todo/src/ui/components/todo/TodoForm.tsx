import { useState } from "react";
import { useCreateTodo } from "../../hooks/useTodos";
import tw from "tailwind-styled-components";

const Form = tw.form`
  flex flex-col gap-4 w-full
`;

const Input = tw.input`
  flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
`;

const Button = tw.button`
  px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
  transition-colors duration-200 font-medium
`;

interface TodoFormProps {
  onClose: () => void;
}

export function TodoForm({ onClose }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const { mutate: createTodo } = useCreateTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await createTodo({ title, completed: false });
    setTitle("");
    onClose(); // close the modal
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add todo"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <Button type="submit">Add</Button>
    </Form>
  );
}
