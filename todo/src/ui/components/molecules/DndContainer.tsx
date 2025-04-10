import React, { useState, ReactNode, useRef, useEffect } from 'react';
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
  getColumnId: (item: T) => string | null;
  setColumnId: (item: T, columnId: string) => Promise<T>;
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
  const [currentDroppableId, setCurrentDroppableId] = useState<UniqueIdentifier | null>(null);
  
  // This is our temporary state to track items during drag
  const [temporaryItems, setTemporaryItems] = useState<T[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [finalDropId, setFinalDropId] = useState<UniqueIdentifier | null>(null);

  // Use refs to store column element positions
  const columnPositionsRef = useRef<Record<string, DOMRect>>({});

  // Update column positions whenever items or columns change
  useEffect(() => {
    const updateColumnPositions = () => {
      const positions: Record<string, DOMRect> = {};
      
      columns.forEach(columnId => {
        const element = document.querySelector(`[data-droppable-id="${columnId}"]`);
        if (element) {
          positions[columnId] = element.getBoundingClientRect();
        }
      });
      
      columnPositionsRef.current = positions;
    };
    
    updateColumnPositions();
    
    // Add resize listener to update positions
    window.addEventListener('resize', updateColumnPositions);
    return () => window.removeEventListener('resize', updateColumnPositions);
  }, [columns, items]);
  
  // Initialize temporary items whenever items change or when not dragging
  useEffect(() => {
    if (!isDragging) {
      setTemporaryItems([...items]);
      setFinalDropId(null);
    }
  }, [items, isDragging]);

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
    setIsDragging(true);
    setActiveId(event.active.id);
    setFinalDropId(null);

    // Find the current column of the dragged item
    const draggedItem = items.find(item => item.id === event.active.id);
    if (draggedItem) {
      const columnId = getColumnId(draggedItem);
      if (columnId) {
        setActiveColumn(columnId);
        setCurrentDroppableId(columnId);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setCurrentDroppableId(over.id);
      
      // Temporarily move the dragged item to the new column in our temporary state
      const activeItem = temporaryItems.find(item => item.id === active.id);
      
      if (activeItem) {
        // Create a new object for the active item with the new column
        const updatedItem = { ...activeItem } as T;
        
        // Update the temporary items array with the new column assignment
        setTemporaryItems(prev => 
          prev.map(item => 
            item.id === active.id ? updatedItem : item
          )
        );
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      // Set the final drop id to ensure item appears in the correct column
      // during the transition between drag end and state update
      setFinalDropId(over.id);

      // Update the real data model
      const activeItem = items.find(item => item.id === active.id);
      if (activeItem) {
        await setColumnId(activeItem, over.id.toString());
      }
    }
    
    // Reset all drag states
    setIsDragging(false);
    setActiveId(null);
    setActiveColumn(null);
    setCurrentDroppableId(null);
  };

    // Get the current column for an item, taking into account temporary drag state
    const getCurrentColumnId = (item: T): string => {
      // If this is the active item that was just dropped, use the final drop location
      if (item.id === activeId && finalDropId) {
        return finalDropId.toString();
      }
      
      // If this is the active item during drag, use the current droppable
      if (isDragging && item.id === activeId && currentDroppableId) {
        return currentDroppableId.toString();
      }
      
      // Otherwise, use the normal column logic
      return getColumnId(item) || columns[0].toString();
    };

  const activeItem = activeId ? items.find(item => item.id === activeId) : null;

  const ConnectedDraggable = ({ item }: { item: T }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: item.id,
    });

    const style = {
      transform: CSS.Translate.toString(transform),
      opacity: activeId === item.id ? 0 : 1,
      transition: 'opacity 150ms ease-out',
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
      <div data-droppable-id={id} ref={setNodeRef}>
        <DroppableComponent
          id={id}
          isOver={isOver}
          isActive={activeColumn === id || currentDroppableId === id}
          dropRef={setNodeRef}
          additionalProps={getDroppableProps ? getDroppableProps(id) : undefined}
        >
          {children}
        </DroppableComponent>
      </div>
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
                {/* Use temporaryItems for rendering during drag operations */}
                {temporaryItems
                  .filter(item => getCurrentColumnId(item) === columnId)
                  .map(item => (
                    <ConnectedDraggable key={item.id} item={item} />
                  ))}
              </ConnectedDroppable>
            ))}
          </>
        )}
        <DragOverlay>
          {activeItem && DragOverlayComponent ? (
            <DragOverlayComponent item={activeItem} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </ContainerComponent>
  );
};