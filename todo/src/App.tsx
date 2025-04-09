import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodosView } from "./ui/components/todo/TodosView";
import { TodoService } from "./application/usecases/todo.service";
import { LocalStorageTodoRepository } from "./infrastructure/repositories/localstorage.todo.repository";
import { ServiceContext } from "./ui/hooks/useService";
import { useState, useEffect } from "react";
import { MainLayout } from "./ui/components/layouts/MainLayout";
import { EntityViewType } from "./ui/components/organisms/EntityView";
import useUiStore from "./ui/components/todo/store/uiStore";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [todoRepository] = useState(() => new LocalStorageTodoRepository());
  const [todoService] = useState(() => new TodoService(todoRepository));
  
  // Get state and actions from uiStore
  const currentView = useUiStore((state) => state.currentView);
  const setCurrentView = useUiStore((state) => state.setCurrentView);
  const setIsFormOpen = useUiStore((state) => state.setIsFormOpen);
  const setEditingTodo = useUiStore((state) => state.setEditingTodo);
  const setStyleVariant = useUiStore((state) => state.setStyleVariant);

  useEffect(() => {
    setStyleVariant("inverted");
  }, [setStyleVariant]);

  const handleAddClick = () => {
    setEditingTodo(null); // Reset any existing editing state
    setIsFormOpen(true);
  };

  const viewConfigs: Array<{
    id: EntityViewType;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "list",
      label: "List",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      id: "board",
      label: "Board",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={todoService}>
        <MainLayout
          currentView={currentView}
          onViewChange={setCurrentView}
          onAddClick={handleAddClick}
          viewConfigs={viewConfigs}
        >
          <div className="max-w-7xl mx-auto">
            <TodosView />
          </div>
        </MainLayout>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
