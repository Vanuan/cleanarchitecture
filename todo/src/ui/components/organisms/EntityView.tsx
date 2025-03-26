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

// Generic Types (Less Domain Specific)
export interface ViewConfig<T extends Entity, P = {}> {
  id: string;
  label: string;
  component: React.ComponentType<{
    items: T[];
    config: P;
    getItemId: (item: T) => string;
    onItemUpdate?: (id: string, newValue: any) => void;
    renderItem: (item: T) => React.ReactNode; // Make renderItem required
  }>;
  config?: P;
}

interface EntityViewProps<T extends Entity, P = {}> {
  items: T[];
  defaultViewConfigs: ViewConfig<T, P>[];
  customViewConfigs?: ViewConfig<T, P>[];
  defaultView: string;
  getItemId: (item: T) => string;
  EntityForm: React.ComponentType<{ onClose: () => void }>;
  formProps: any;
  addButtonText?: string;
  isLoading?: boolean;
  renderItem: (item: T, viewType: string) => React.ReactNode; // Pass the renderItem down
}

const Container = tw.div`
  w-full max-w-4xl mx-auto p-4
`;

const ViewToggle = tw.div`
  flex justify-end mb-4 gap-2
`;

const ToggleButton = tw.button<{ $active?: boolean }>`
  px-4 py-2 rounded-lg transition-colors duration-200
  ${({ $active }) =>
    $active
      ? "bg-blue-500 text-white"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
`;

const AddButton = tw.button`
  px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200
`;

const ModalBackdrop = tw.div`
  fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-40
  flex items-center justify-center
`;

const ModalContainer = tw.div`
  bg-white rounded-lg shadow-xl z-50 w-full max-w-md p-6 relative
`;

const CloseButton = tw.button`
  absolute top-2 right-2 text-gray-500 hover:text-gray-700
`;

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
  renderItem, // Get renderItem from here
}: EntityViewProps<T, P>) {
  const [currentView, setCurrentView] = useState(defaultView);
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  const mergedViewConfigs = useMemo(() => {
    const customConfigMap = new Map(
      customViewConfigs?.map((config) => [config.id, config.component]),
    );
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
    const {
      component: ViewComponent,
      config,
      getItemId,
      onItemUpdate,
    } = currentViewConfig;
    return (
      <ViewComponent
        items={items}
        config={config}
        getItemId={getItemId}
        onItemUpdate={onItemUpdate}
        renderItem={renderItem} // pass renderItem down to the view component
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
              <CloseButton onClick={toggleForm} aria-label="Close modal">
                ×
              </CloseButton>
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
