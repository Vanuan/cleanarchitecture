export interface TodoViewModel {
  id: string;
  title: string;
  completed: boolean;
  tags: string[];
  displayStatus: string; // "Done" or "Todo"
}
