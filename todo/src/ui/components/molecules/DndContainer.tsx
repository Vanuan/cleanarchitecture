import React, { useState, ReactNode } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  useDroppable,
  useDraggable,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// Base item type
export type BaseItem = {
  id: string;
};

// Draggable component props
export interface DraggableComponentProps<T extends BaseItem, P = object> {
  item: T;
  isDragging?: boolean;
  dragHandleProps?: object;
  dragRef?: (node: HTMLElement | null) => void;
  additionalProps?: P;
}

// Droppable component props
export interface DroppableComponentProps<P = object> {
  id: UniqueIdentifier;
  isActive?: boolean;
  isOver?: boolean;
  dropRef?: (node: HTMLElement | null) => void;
  children?: ReactNode;
  additionalProps?: P;
}

// Main container props
interface DndContainerProps<T extends BaseItem, DP = object, DpP = object> {
  items: T[];
  columns: string[];
  onItemsChange: (items: T[]) => void;
  getColumnId: (item: T) => string | null;
  setColumnId: (item: T, columnId: string) => T;
  children?: ReactNode;
  draggableComponent: React.ComponentType<DraggableComponentProps<T, DP>>;
  droppableComponent: React.ComponentType<DroppableComponentProps<DpP>>;
  dragOverlayComponent?: React.ComponentType<{ item: T }>;
  containerComponent: React.ComponentType<{ children?: ReactNode; style?: React.CSSProperties }>;
  getDraggableProps?: (item: T) => DP;
  getDroppableProps?: (columnId: string) => DpP;
}


export const DndContainer = <T extends BaseItem, DP = object, DpP = object>({
  items,
  columns,
  onItemsChange,
  getColumnId,
  setColumnId,
  children,
  draggableComponent: DraggableComponent,
  droppableComponent: DroppableComponent,
  dragOverlayComponent: DragOverlayComponent,
  containerComponent: ContainerComponent,
  getDraggableProps,
  getDroppableProps,
}: DndContainerProps<T, DP, DpP>) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeColumn, setActiveColumn] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over) {
      setActiveColumn(over.id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      const activeItem = items.find(item => item.id === active.id);
      if (activeItem) {
        const updatedItem = setColumnId(activeItem, over.id.toString());
        onItemsChange(items.map(item => item.id === active.id ? updatedItem : item));
      }
    }

    setActiveId(null);
    setActiveColumn(null);
  };

  const activeItem = activeId ? items.find(item => item.id === activeId) : null;

  const ConnectedDraggable = ({ item }: { item: T }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: item.id,
    });

    const style = {
      transform: CSS.Translate.toString(transform),
      opacity: activeId === item.id ? 0 : 1,
    };

    return (
      <div ref={setNodeRef} style={style}>
        <DraggableComponent
          item={item}
          isDragging={activeId === item.id}
          dragHandleProps={{ ...listeners, ...attributes }}
          dragRef={setNodeRef}
          additionalProps={getDraggableProps ? getDraggableProps(item) : undefined}
        />
      </div>
    );
  };

  const ConnectedDroppable = ({ id, children }: { id: string; children?: ReactNode }) => {
    const { isOver, setNodeRef } = useDroppable({ id });

    return (
      <DroppableComponent
        id={id}
        isOver={isOver}
        isActive={activeColumn === id}
        dropRef={setNodeRef}
        additionalProps={getDroppableProps ? getDroppableProps(id) : undefined}
      >
        {children}
      </DroppableComponent>
    );
  };

  return (
    <ContainerComponent style={{ touchAction: 'none' }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {children || (
          <>
            {columns.map(columnId => (
              <ConnectedDroppable key={columnId} id={columnId}>
                {items.filter(item => getColumnId(item) === columnId).map(item => (
                  <ConnectedDraggable key={item.id} item={item} />
                ))}
              </ConnectedDroppable>
            ))}
          </>
        )}
        <DragOverlay>
          {activeItem && (DragOverlayComponent ? (
            <DragOverlayComponent item={activeItem} />
          ) : (
            <div style={{
              padding: '20px',
              backgroundColor: 'lightgreen',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}>
              {activeItem.id}
            </div>
          ))}
        </DragOverlay>
      </DndContext>
    </ContainerComponent>
  );
};