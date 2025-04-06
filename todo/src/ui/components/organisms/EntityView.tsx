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

export interface ViewConfig<T extends Entity, P = object> {
  id: EntityViewType;
  label: string;
  component: React.ComponentType<{
    items: T[];
    config: P;
    getItemId: (item: T) => string;
    onItemUpdate?: (id: string, newValue: unknown) => void;
    renderItem: (item: T) => React.ReactNode;
    onAddItem?: (item: Partial<T>) => void;
    setCurrentView: (v: EntityViewType) => void;
    currentView: EntityViewType;
  }>;
  config?: P;
  getItemId?: (item: T) => string;
  onItemUpdate?: (id: string, newValue: unknown) => void;
  onAddItem?: (item: Partial<T>) => void;
  renderItem: (item: T) => React.ReactNode;
}

export type FormModel<T> = Partial<T>;

interface EntityViewProps<T extends Entity, P = object> {
  items: T[];
  defaultViewConfigs: ViewConfig<T, P>[];
  customViewConfigs?: ViewConfig<T, P>[];
  getItemId: (item: T) => string;
  EntityForm: React.ComponentType<{
    onClose: () => void;
    onSubmit?: (data: unknown) => void;
    initialValues?: unknown;
  }>;
  onUpdateItem: (id: string, updates: Partial<T>) => void;
  onCreateItem: (newItem: Omit<T, "id" | "createdAt" | "updatedAt">) => void;
  isLoading?: boolean;
  renderItem: (item: T) => React.ReactNode;
  currentView: EntityViewType;
  setCurrentView: (view: EntityViewType) => void;
  isFormOpen: boolean;
  closeForm: () => void;
  editingItem: FormModel<T> | null;
}

const Container = tw.div`
  w-full max-w-4xl mx-auto
`;

const ModalBackdrop = tw.div`
  fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4 z-50
`;

const ModalContainer = tw.div`p-6 w-full max-w-lg relative`;

export function EntityView<T extends Entity, P = object>({
  items,
  defaultViewConfigs,
  customViewConfigs,
  getItemId,
  EntityForm,
  onUpdateItem,
  onCreateItem,
  isLoading = false,
  renderItem,
  currentView,
  setCurrentView,
  isFormOpen,
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFormOpen) handleCloseForm();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleCloseForm, isFormOpen]);

  const handleFormSubmit = useCallback(
    (data: unknown) => {
      if (editingItem?.id) {
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

    const componentProps = {
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
