export interface TodoViewModel {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  isAllDay?: boolean;
  priority?: string;
  tags: string[];
  displayStatus: string; // "Done" or "Todo"
}
