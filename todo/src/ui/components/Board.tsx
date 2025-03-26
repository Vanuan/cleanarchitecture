import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import tw from "tailwind-styled-components";

const GridView = tw.div`
  grid grid-cols-2 gap-4
`;

const Column = tw.div`
  flex flex-col gap-3 p-4 bg-gray-50 rounded-lg min-h-[200px]
`;

const ColumnTitle = tw.h2`
  text-lg font-semibold mb-2 text-gray-700
`;

interface BoardProps<T> {
  items: T[];
  columns: {
    id: string;
    title: string;
    filter: (item: T) => boolean;
  }[];
  onItemUpdate: (id: string, columnId: string) => void;
  renderItem: (item: T) => React.ReactNode;
  getItemId: (item: T) => string;
}

export function Board<T>({
  items,
  columns,
  onItemUpdate,
  renderItem,
  getItemId,
}: BoardProps<T>) {
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const item = items.find((item) => getItemId(item) === draggableId);

    if (!item) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      onItemUpdate(draggableId, destination.droppableId);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <GridView>
        {columns.map((column) => (
          <StrictModeDroppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <Column ref={provided.innerRef} {...provided.droppableProps}>
                <ColumnTitle>{column.title}</ColumnTitle>
                {items.filter(column.filter).map((item, index) => (
                  <Draggable
                    key={getItemId(item)}
                    draggableId={getItemId(item)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {renderItem(item)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Column>
            )}
          </StrictModeDroppable>
        ))}
      </GridView>
    </DragDropContext>
  );
}
