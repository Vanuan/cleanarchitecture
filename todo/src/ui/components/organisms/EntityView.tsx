import React, { useRef, useCallback, useEffect, useMemo } from "react";
import tw from "tailwind-styled-components";
import { createPortal } from "react-dom";
import { Entity } from "../../../domain/entities/entity";
import { CalendarViewType } from "../todo/views/calendar-hooks/types";

export type EntityViewType =
  | "list"
  | "board"
  | "table"
  | "gallery"
  | "calendar"
  | CalendarViewType;

export interface ViewConfig<T extends Entity, P = {}> {
  id: EntityViewType;
  label: string;
  component: React.ComponentType<{
    items: T[];
    config: P;
    getItemId: (item: T) => string;
    onItemUpdate?: (id: string, newValue: any) => void;
    renderItem: (item: T) => React.ReactNode;
    onAddItem?: (item: Partial<T>) => void;
    setCurrentView: (v: EntityViewType) => void;
    currentView: EntityViewType;
  }>;
  config?: P;
  getItemId?: (item: T) => string;
  onItemUpdate?: (id: string, newValue: any) => void;
  onAddItem?: (item: Partial<T>) => void;
  renderItem: (item: T) => React.ReactNode;
}

export type FormModel<T> = Partial<T>;

interface EntityViewProps<T extends Entity, P = {}> {
  items: T[];
  defaultViewConfigs: ViewConfig<T, P>[];
  customViewConfigs?: ViewConfig<T, P>[];
  getItemId: (item: T) => string;
  EntityForm: React.ComponentType<{
    onClose: () => void;
    onSubmit?: (data: any) => void;
    initialValues?: any;
  }>;
  onUpdateItem: (id: string, updates: Partial<T>) => void;
  onCreateItem: (newItem: Omit<T, "id" | "createdAt" | "updatedAt">) => void;
  addButtonText?: string;
  isLoading?: boolean;
  renderItem: (item: T) => React.ReactNode;

  // --- UI State Props ---
  currentView: EntityViewType;
  setCurrentView: (view: EntityViewType) => void;
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
  editingItem: FormModel<T> | null;
}

const Container = tw.div`
  w-full max-w-4xl mx-auto
`;

const ViewToggle = tw.div`
  flex justify-end mb-4 gap-2
`;

const ToggleButton = tw.button<{ $active?: boolean }>`
  px-4 py-2 rounded-md transition-colors duration-200
  ${({ $active }) =>
    $active ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}
`;

const AddButton = tw.button`
  inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500
  text-white hover:bg-blue-600 transition-colors
`;

const ModalBackdrop = tw.div`
  fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4 z-50
`;

const ModalContainer = tw.div`p-6 w-full max-w-lg relative`;

export function EntityView<T extends Entity, P = {}>({
  items,
  defaultViewConfigs,
  customViewConfigs,
  getItemId,
  EntityForm,
  onUpdateItem,
  onCreateItem,
  addButtonText = "Add Entity",
  isLoading = false,
  renderItem,
  currentView,
  setCurrentView,
  isFormOpen,
  openForm,
  closeForm,
  editingItem,
}: EntityViewProps<T, P>) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseForm = useCallback(() => {
    closeForm();
  }, [closeForm]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleCloseForm();
      }
    },
    [handleCloseForm],
  );

  // escape key handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFormOpen) handleCloseForm();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleCloseForm, isFormOpen]);

  const handleFormSubmit = useCallback(
    (data: FormModel<T>) => {
      if (editingItem?.id) {
        // Check if editingItem exists and has an id
        onUpdateItem(editingItem.id as string, data as Partial<T>);
      } else {
        onCreateItem(data as Omit<T, "id" | "createdAt" | "updatedAt">);
      }
      handleCloseForm();
    },
    [editingItem, onCreateItem, onUpdateItem, handleCloseForm],
  );

  const updatedFormProps = useMemo(
    () => ({
      initialValues: editingItem,
      onSubmit: handleFormSubmit,
      onClose: handleCloseForm,
    }),
    [editingItem, handleFormSubmit, handleCloseForm],
  );

  const mergedViewConfigs = useMemo(() => {
    const merged = [...defaultViewConfigs];

    customViewConfigs?.forEach((customConfig) => {
      const existingIndex = merged.findIndex(
        (config) => config.id === customConfig.id,
      );
      if (existingIndex !== -1) {
        merged[existingIndex] = { ...merged[existingIndex], ...customConfig };
      } else {
        merged.push(customConfig);
      }
    });
    return merged;
  }, [defaultViewConfigs, customViewConfigs]);

  const renderCurrentView = () => {
    const viewToFind = ["month", "week", "day"].includes(currentView)
      ? "calendar"
      : currentView;

    const currentViewConfig = mergedViewConfigs.find(
      (view) => view.id === viewToFind,
    );

    if (!currentViewConfig) {
      return <div>Invalid view configuration</div>;
    }
    const { component: ViewComponent, config } = currentViewConfig;

    const viewGetItemId = currentViewConfig.getItemId || getItemId;
    const viewOnItemUpdate = currentViewConfig.onItemUpdate;
    const viewOnAddItem = currentViewConfig.onAddItem;

    const componentProps: any = {
      items: items,
      config: config as P,
      getItemId: viewGetItemId || getItemId,
      renderItem,
      onItemUpdate: viewOnItemUpdate,
      onAddItem: viewOnAddItem,
      currentView,
      setCurrentView,
    };

    return <ViewComponent {...componentProps} />;
  };

  return (
    <Container>
      <ViewToggle>
        <AddButton onClick={openForm}>{addButtonText}</AddButton>
        {mergedViewConfigs.map((view) => (
          <ToggleButton
            key={view.id}
            $active={
              currentView === view.id ||
              // Also highlight calendar button when any calendar sub-view is active
              (view.id === "calendar" &&
                ["month", "week", "day"].includes(currentView))
            }
            onClick={() => setCurrentView(view.id)}
            aria-pressed={
              view.id === currentView ||
              (view.id === "calendar" &&
                ["month", "week", "day"].includes(currentView))
            }
          >
            {view.label}
          </ToggleButton>
        ))}
      </ViewToggle>

      {isFormOpen &&
        createPortal(
          <ModalBackdrop onClick={handleBackdropClick}>
            <ModalContainer ref={modalRef}>
              <EntityForm {...updatedFormProps} />
            </ModalContainer>
          </ModalBackdrop>,
          document.body,
        )}

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        renderCurrentView()
      )}
    </Container>
  );
}
