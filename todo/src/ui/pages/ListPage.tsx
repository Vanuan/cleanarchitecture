import { useEffect } from "react";
import { TodosView } from "../components/todo/TodosView";
import useUiStore from "../components/todo/store/uiStore";

export default function ListPage() {
  const setCurrentView = useUiStore((state) => state.setCurrentView);

  useEffect(() => {
    setCurrentView("list");
  }, [setCurrentView]);

  return <TodosView />;
}
