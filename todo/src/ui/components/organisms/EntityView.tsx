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
  | CalendarViewType;

// Generic Types (Less Domain Specific)
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
    // Calendar views
    setCurrentView: (v: CalendarViewType) => void;
    currentView: CalendarViewType;
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
  openForm: () => void; // More specific action
  closeForm: () => void; // More specific action
  editingItem: FormModel<T> | null; // The item being edited (or null)
}

const Container = tw.div`
  w-full max-w-4xl mx-auto p-4
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
      initialValues: editingItem, // Use prop directly
      onSubmit: handleFormSubmit,
      onClose: handleCloseForm, // Use the passed-in prop
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
    const currentViewConfig = mergedViewConfigs.find(
      (view) => view.id === currentView,
    );
    if (!currentViewConfig) {
      return <div>Invalid view configuration</div>;
    }
    const { component: ViewComponent, config } = currentViewConfig;

    // Use the view config's getItemId, onItemUpdate, onAddItem if provided,
    // otherwise use the props passed to EntityView
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
    };
    if (["month", "week", "day"].includes(currentView)) {
      componentProps.currentView = currentView as CalendarViewType;
      componentProps.setCurrentView = setCurrentView as (
        view: CalendarViewType,
      ) => void;
    }

    return <ViewComponent {...componentProps} />;
  };

  return (
    <Container>
      <ViewToggle>
        <AddButton onClick={openForm}>{addButtonText}</AddButton>
        {mergedViewConfigs.map((view) => (
          <ToggleButton
            key={view.id}
            $active={currentView === view.id}
            onClick={() => setCurrentView(view.id)}
            aria-pressed={currentView === view.id}
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
