export interface TodoViewModel {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  endDate?: string;
  isAllDay?: boolean;
  priority?: string;
  tags: string[];
  displayStatus: string; // "Done" or "Todo"
}
