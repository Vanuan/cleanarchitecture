import { useState, useEffect, useCallback } from "react";
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
import { Switch } from "@headlessui/react";
import {
  parseDateString,
  cloneDate,
  serializeDate,
  formatDateAsFormValue,
  formatTimeAsFormValue,
} from "../../../lib/utils/date";
import { Todo } from "../../../domain/entities/todo";

type TodoFormModel = {
  title: string;
  dueDate?: string;
  completed: boolean;
  isAllDay?: boolean;
};

interface TodoFormProps {
  onClose: () => void;
  onSubmit?: (data: TodoFormModel) => void;
  initialValues?: TodoFormModel;
}

export function TodoForm({ onClose, initialValues, onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [completed, setCompleted] = useState(initialValues?.completed || false);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(
    parseDateString(initialValues?.dueDate),
  );
  const [isAllDay, setIsAllDay] = useState(initialValues?.isAllDay || false);

  const { mutate: createTodo } = useCreateTodo();

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || "");
      setDueDate(parseDateString(initialValues.dueDate));
      setCompleted(initialValues.completed || false);
      setIsAllDay(initialValues.isAllDay || false);
    }
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) return;

      const todoFormData: TodoFormModel = {
        title,
        completed,
        dueDate: dueDate ? serializeDate(dueDate) : undefined,
        isAllDay: dueDate ? isAllDay : undefined,
      };

      const todoEntityData: Omit<
        Todo,
        "id" | "createdAt" | "updatedAt" | "tags"
      > = {
        ...todoFormData,
        dueDate: dueDate || undefined,
      };

      if (onSubmit) {
        onSubmit(todoFormData);
      } else {
        createTodo(todoEntityData);
      }

      setTitle("");
      setDueDate(undefined);
      onClose();
    },
    [title, completed, dueDate, isAllDay, onSubmit, createTodo, onClose],
  );

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = parseDateString(e.target.value);
      if (date) {
        setDueDate(date);
      }
    },
    [setDueDate],
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!dueDate) return;

      const [hours, minutes] = e.target.value.split(":").map(Number);
      const newDate = cloneDate(dueDate);
      newDate.setHours(hours, minutes);
      setDueDate(newDate);
    },
    [dueDate],
  );

  return (
    <ModalContent onSubmit={handleSubmit}>
      <TitleBar>
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
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <div className="mt-1">
            <InputField
              type="date"
              value={dueDate ? formatDateAsFormValue(dueDate) : ""}
              onChange={handleDateChange}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          {dueDate && (
            <div className="mt-2 flex items-center">
              <Switch
                checked={isAllDay}
                onChange={setIsAllDay}
                className={`${
                  isAllDay ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-3`}
              >
                <span
                  className={`${
                    isAllDay ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <span className="text-sm text-gray-700">All day</span>

              {!isAllDay && (
                <div className="ml-4">
                  <input
                    type="time"
                    value={dueDate ? formatTimeAsFormValue(dueDate) : ""}
                    onChange={handleTimeChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
          )}
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
