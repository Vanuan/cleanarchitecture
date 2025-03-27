import { useState, useEffect } from "react";
import { useCreateTodo } from "../../hooks/useTodos";
import {
  ModalContent,
  CloseButton,
  ModalTitle,
  FormFieldContainer,
  InputField,
  TextAreaField,
  SubmitButton,
  TitleBar,
} from "./styles";
import { CloseIcon, SubmitIcon } from "./icons";

interface TodoFormProps {
  onClose: () => void;
  onSubmit?: (data: any) => void; // Optional onSubmit prop
  initialValues?: {
    title: string;
    dueDate?: string;
    completed?: boolean;
  };
}

export function TodoForm({ onClose, initialValues, onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [completed, setCompleted] = useState(initialValues?.completed || false);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);

  const { mutate: createTodo } = useCreateTodo();

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || "");
      setDueDate(initialValues.dueDate || undefined);
      setCompleted(initialValues.completed || false);
    }
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const todoData = {
      title,
      completed,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };
    if (onSubmit) {
      onSubmit(todoData);
    } else {
      createTodo(todoData);
    }

    setTitle("");
    setDueDate(undefined);
    onClose();
  };

  return (
    <ModalContent onSubmit={handleSubmit}>
      <TitleBar>
        {" "}
        {/* Use the new TitleBar component */}
        <ModalTitle>{onSubmit ? "Edit Todo" : "New Todo"}</ModalTitle>
        <CloseButton type="button" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </TitleBar>
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
            hidden
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            placeholder="Add a description (optional)"
          />
        </div>
        <div>
          <InputField
            type="date"
            value={dueDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDueDate(e.target.value)
            }
            placeholder="Due Date (optional)"
          />
        </div>
        <div className="flex justify-end">
          <SubmitButton type="submit" $disabled={!title.trim()}>
            <SubmitIcon />
            {onSubmit ? "Update Todo" : "Add Todo"}
          </SubmitButton>
        </div>
      </FormFieldContainer>
    </ModalContent>
  );
}
