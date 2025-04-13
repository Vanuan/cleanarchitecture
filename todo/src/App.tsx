import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoService } from "./application/usecases/todo.service";
import { LocalStorageTodoRepository } from "./infrastructure/repositories/localstorage.todo.repository";
import { ServiceContext } from "./ui/hooks/useService";
import { useState, useEffect } from "react";
import { MainLayout } from "./ui/components/layouts/MainLayout";
import useUiStore from "./ui/components/todo/store/uiStore";
import { viewRoutes } from "./ui/routes/viewRoutes";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [todoRepository] = useState(() => new LocalStorageTodoRepository());
  const [todoService] = useState(() => new TodoService(todoRepository));

  const setIsFormOpen = useUiStore((state: any) => state.setIsFormOpen);
  const setEditingTodo = useUiStore((state: any) => state.setEditingTodo);
  const setStyleVariant = useUiStore((state: any) => state.setStyleVariant);

  useEffect(() => {
    setStyleVariant("inverted");
  }, [setStyleVariant]);

  const handleAddClick = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  // Routing logic
  function RouterAdapter() {
    return (
      <MainLayout onAddClick={handleAddClick}>
        <div className="max-w-7xl mx-auto">
          <Routes>
            {viewRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to={viewRoutes[0].path} replace />} />
          </Routes>
        </div>
      </MainLayout>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={todoService}>
        <BrowserRouter>
          <RouterAdapter />
        </BrowserRouter>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
