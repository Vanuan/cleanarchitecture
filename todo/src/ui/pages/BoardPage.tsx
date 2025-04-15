import { useEffect } from "react";
import { TodosView } from "../components/todo/TodosView";
import useUiStore from "../components/todo/store/uiStore";

export default function BoardPage() {
  const setCurrentView = useUiStore((state) => state.setCurrentView);

  useEffect(() => {
    setCurrentView("board");
  }, [setCurrentView]);

  return <TodosView />;
}
