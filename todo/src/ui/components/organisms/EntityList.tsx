import { useState, useRef } from "react";
import tw from "tailwind-styled-components";
import { Board } from "../molecules/Board";
import { List } from "../molecules/List";
import { createPortal } from "react-dom"; // Import createPortal

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

type ViewType = "list" | "board";

interface EntityListProps<T, F> {
  items: T[];
  renderItem: (item: T, viewType: ViewType) => React.ReactNode;
  getItemId: (item: T) => string;
  onItemUpdate?: (id: string, columnId: string) => void; // Optional, for Board view
  boardColumns?: {
    id: string;
    title: string;
    filter: (item: T) => boolean;
  }[]; // Optional, for Board view
  EntityForm: React.ComponentType<F & { onClose: () => void }>; // Updated type definition
  formProps: F;
  addButtonText?: string;
}

export function EntityList<T, F>({
  items,
  renderItem,
  getItemId,
  onItemUpdate,
  boardColumns,
  EntityForm,
  formProps,
  addButtonText = "Add Entity",
}: EntityListProps<T, F>) {
  const [viewType, setViewType] = useState<ViewType>("list");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      toggleForm();
    }
  };

  return (
    <Container>
      <ViewToggle>
        <AddButton onClick={toggleForm}>{addButtonText}</AddButton>
        <ToggleButton
          $active={viewType === "list"}
          onClick={() => setViewType("list")}
        >
          List View
        </ToggleButton>
        <ToggleButton
          $active={viewType === "board"}
          onClick={() => setViewType("board")}
        >
          Board View
        </ToggleButton>
      </ViewToggle>

      {isFormOpen &&
        createPortal(
          <ModalBackdrop onClick={handleBackdropClick}>
            <ModalContainer ref={modalRef}>
              <CloseButton onClick={toggleForm}>&times;</CloseButton>
              <EntityForm {...formProps} onClose={toggleForm} />
            </ModalContainer>
          </ModalBackdrop>,
          document.body,
        )}

      {viewType === "list" ? (
        <List items={items} renderItem={(item) => renderItem(item, "list")} />
      ) : boardColumns && onItemUpdate ? (
        <Board
          items={items}
          columns={boardColumns}
          onItemUpdate={onItemUpdate}
          renderItem={(item) => renderItem(item, "board")}
          getItemId={getItemId}
        />
      ) : (
        <div>Board view requires boardColumns and onItemUpdate props.</div>
      )}
    </Container>
  );
}
