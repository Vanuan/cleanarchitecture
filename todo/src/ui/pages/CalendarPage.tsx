import { useEffect } from "react";
import { TodosView } from "../components/todo/TodosView";
import useUiStore from "../components/todo/store/uiStore";

export default function CalendarPage() {
  const setCurrentView = useUiStore((state) => state.setCurrentView);

  useEffect(() => {
    setCurrentView("calendar");
  }, [setCurrentView]);

  return <TodosView />;
}
