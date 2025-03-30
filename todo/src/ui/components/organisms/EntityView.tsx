import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import tw from "tailwind-styled-components";
import { createPortal } from "react-dom";
import { Entity } from "../../../domain/entities/entity";

export type ViewType =
  | "list"
  | "board"
  | "table"
  | "gallery"
  | "month"
  | "week"
  | "day";

// Generic Types (Less Domain Specific)
export interface ViewConfig<T extends Entity, P = {}> {
  id: ViewType;
  label: string;
  component: React.ComponentType<{
    items: T[];
    config: P;
    getItemId: (item: T) => string;
    onItemUpdate?: (id: string, newValue: any) => void;
    renderItem: (item: T) => React.ReactNode;
    onAddItem?: (item: Partial<T>) => void;
  }>;
  config?: P;
  getItemId?: (item: T) => string;
  onItemUpdate?: (id: string, newValue: any) => void;
  onAddItem?: (item: Partial<T>) => void;
  renderItem: (item: T, viewType: ViewType) => React.ReactNode;
}

interface EntityViewProps<T extends Entity, P = {}> {
  items: T[];
  defaultViewConfigs: ViewConfig<T, P>[];
  customViewConfigs?: ViewConfig<T, P>[];
  defaultView: ViewType;
  getItemId: (item: T) => string;
  EntityForm: React.ComponentType<{ onClose: () => void }>;
  formProps: any;
  addButtonText?: string;
  isLoading?: boolean;
  renderItem: (item: T, viewType: ViewType) => React.ReactNode;
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
  defaultView,
  getItemId,
  EntityForm,
  formProps,
  addButtonText = "Add Entity",
  isLoading = false,
  renderItem,
}: EntityViewProps<T, P>) {
  const [currentView, setCurrentView] = useState<ViewType>(defaultView);
  const [isFormOpen, setIsFormOpen] = useState(!!formProps.initialValues);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleForm = useCallback(() => setIsFormOpen((prev) => !prev), []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        toggleForm();
    },
    [toggleForm],
  );

  // escape key handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFormOpen) toggleForm();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isFormOpen, toggleForm]);

  useEffect(() => {
    setIsFormOpen(!!formProps.initialValues);
  }, [formProps.initialValues]);

  const mergedViewConfigs = useMemo(() => {
    const merged = [...defaultViewConfigs];

    customViewConfigs?.forEach((customConfig) => {
      const existingIndex = merged.findIndex(
        (config) => config.id === customConfig.id,
      );
      if (existingIndex !== -1) {
        merged[existingIndex] = customConfig; // Override default
      } else {
        merged.push(customConfig); // Add new config
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

    // Create a wrapper for renderItem to match the expected signature
    const viewRenderItem = (item: T) => renderItem(item, currentView);

    return (
      <ViewComponent
        items={items}
        config={config as P}
        getItemId={viewGetItemId}
        onItemUpdate={viewOnItemUpdate}
        renderItem={viewRenderItem}
        onAddItem={viewOnAddItem}
      />
    );
  };

  return (
    <Container>
      <ViewToggle>
        <AddButton onClick={toggleForm}>{addButtonText}</AddButton>
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
              <EntityForm {...formProps} onClose={toggleForm} />
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
