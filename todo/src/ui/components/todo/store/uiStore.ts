import { create } from "zustand";
import { EntityViewType } from "../../../components/organisms/EntityView";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";
import { CalendarViewType } from "../views/calendar-hooks/types";

interface UiState {
  currentView: EntityViewType;
  setCurrentView: (view: EntityViewType) => void;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  editingTodo: TodoViewModel | null;
  setEditingTodo: (todo: TodoViewModel | null) => void;

  calendarViewType: CalendarViewType;
  setCalendarViewType: (view: CalendarViewType) => void;
}

const useUiStore = create<UiState>((set) => ({
  currentView: "list", // Default view
  setCurrentView: (view) => set({ currentView: view }),
  isFormOpen: false,
  setIsFormOpen: (open) => set({ isFormOpen: open }),
  editingTodo: null,
  setEditingTodo: (todo) => set({ editingTodo: todo }),

  calendarViewType: "month",
  setCalendarViewType: (view) => set({ calendarViewType: view }),
}));

export default useUiStore;
