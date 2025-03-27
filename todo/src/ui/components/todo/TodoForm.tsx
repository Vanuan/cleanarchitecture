import { useState } from "react";
import { useCreateTodo } from "../../hooks/useTodos";
import {
  ModalContent,
  CloseButton,
  ModalTitle,
  FormFieldContainer,
  InputField,
  TextAreaField,
  SubmitButton,
} from "./styles";
import { CloseIcon, SubmitIcon } from "./icons";

interface TodoFormProps {
  onClose: () => void;
}

export function TodoForm({ onClose }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: createTodo } = useCreateTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await createTodo({ title, completed: false });
    setTitle("");
    onClose(); // close the modal
  };

  return (
    <ModalContent onSubmit={handleSubmit}>
      <CloseButton type="button" onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <ModalTitle>New Todo</ModalTitle>
      <FormFieldContainer>
        <div>
          <InputField
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div>
          <TextAreaField
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            placeholder="Add a description (optional)"
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton type="submit" $disabled={!title.trim()}>
            <SubmitIcon />
            Add Todo
          </SubmitButton>
        </div>
      </FormFieldContainer>
    </ModalContent>
  );
}
