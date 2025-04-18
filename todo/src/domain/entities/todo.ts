export interface Todo {
  id: string;
  title: string;
  tags: string[];
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  isAllDay?: boolean;
}
