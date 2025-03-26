import { useState } from "react";
import tw from "tailwind-styled-components";
import { Board } from "../molecules/Board";
import { List } from "../molecules/List";

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

type ViewType = "list" | "board";

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, viewType: ViewType) => React.ReactNode;
  getItemId: (item: T) => string;
  onItemUpdate?: (id: string, columnId: string) => void; // Optional, for Board view
  boardColumns?: {
    id: string;
    title: string;
    filter: (item: T) => boolean;
  }[]; // Optional, for Board view
}

export function EntityList<T>({
  items,
  renderItem,
  getItemId,
  onItemUpdate,
  boardColumns,
}: EntityListProps<T>) {
  const [viewType, setViewType] = useState<ViewType>("list");

  return (
    <Container>
      <ViewToggle>
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
