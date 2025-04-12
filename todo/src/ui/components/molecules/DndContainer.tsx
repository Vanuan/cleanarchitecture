import React, { useState, ReactNode, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
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
  pointerWithin,
  rectIntersection,
} from '@dnd-kit/core';

// Base item type
export type BaseItem = {
  id: string;
  status?: 'idle' | 'pending' | 'error'; // Add status for optimistic updates
};

// Draggable component props
export interface DraggableComponentProps<T extends BaseItem, P = object> {
  item: T;
  isDragging?: boolean;
  isPreview?: boolean;
  isPending?: boolean;
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
  onError?: (error: Error, item: T, targetColumnId: string) => void;
  errorTimeout?: number; // Time in ms to clear error state automatically
}

export const DndContainer = <T extends BaseItem, DP = object, DpP = object>({
  items: initialItems,
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
  onError,
  errorTimeout = 3000,
}: DndContainerProps<T, DP, DpP>) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeColumn, setActiveColumn] = useState<UniqueIdentifier | null>(null);
  const [currentDroppableId, setCurrentDroppableId] = useState<UniqueIdentifier | null>(null);
  const [isDropped, setIsDropped] = useState(false);
  
  // State for items with optimistic updates
  const [items, setItems] = useState<T[]>(initialItems.map(item => ({
    ...item,
    status: item.status || 'idle'
  })));

  // Cleanup function to reset drag state
  const resetDragState = () => {
    setActiveId(null);
    setActiveColumn(null);
    setCurrentDroppableId(null);
    setIsDropped(false);
  };

  // Update items when initialItems change (but not during drag operations)
  useEffect(() => {
    if (!activeId) {
      setItems(prev => {
        // Keep status for items that already exist
        const newItems = initialItems.map(item => {
          const existingItem = prev.find(i => i.id === item.id);
          return {
            ...item,
            status: existingItem?.status || 'idle'
          };
        });
        
        return newItems;
      });
    }
  }, [initialItems, activeId]);

  // Configure sensors with more tolerant settings for mobile
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Increased activation distance for better mobile detection
      activationConstraint: {
        distance: 8, // Increased from 5 for better touch detection
      },
    }),
    useSensor(TouchSensor, {
      // More forgiving touch settings for mobile
      activationConstraint: {
        delay: 100, // Reduced from 150ms for faster response
        tolerance: 8, // Increased from 5px for better mobile detection
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    
    // Find the source column for the dragged item
    const activeItem = items.find(item => item.id === active.id);
    if (activeItem) {
      const column = getColumnId(activeItem);
      if (column) {
        setActiveColumn(column);
        setCurrentDroppableId(active.id);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    // Only update if over a valid droppable and not the current one
    if (over && active.id !== over.id) {
      setCurrentDroppableId(over.id);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDropped(true);
    
    try {
      if (over) {
        const activeItem = items.find(item => item.id === active.id);
        if (activeItem) {
          const sourceColumn = getColumnId(activeItem);
          const destColumn = over.id.toString();
          
          // Skip if no change in column
          if (sourceColumn === destColumn) {
            resetDragState();
            return;
          }
          
          // Optimistically update the UI
          setItems(prevItems => 
            prevItems.map(item => 
              item.id === activeItem.id 
                ? { ...item, status: 'pending' } 
                : item
            )
          );
          
          try {
            // Call API to update the item
            const updatedItem = await setColumnId(activeItem, destColumn);
            
            // Update with the server response
            setItems(prevItems => 
              prevItems.map(item => 
                item.id === activeItem.id 
                  ? { ...updatedItem, status: 'idle' } 
                  : item
              )
            );
          } catch (error) {
            // Show error state
            setItems(prevItems => 
              prevItems.map(item => 
                item.id === activeItem.id 
                  ? { ...item, status: 'error' } 
                  : item
              )
            );
            
            // Call error handler if provided
            if (onError && error instanceof Error) {
              onError(error, activeItem, destColumn);
            } else {
              console.error('Error updating item:', error);
            }
            
            // Clear error state after timeout
            setTimeout(() => {
              setItems(prevItems => 
                prevItems.map(item => 
                  item.id === activeItem.id && item.status === 'error'
                    ? { ...item, status: 'idle' } 
                    : item
                )
              );
            }, errorTimeout);
          }
        }
      }
    } finally {
      // Reset drag state with a slight delay to allow animations to complete
      setTimeout(() => {
        resetDragState();
      }, 150);
    }
  };

  // Calculate the current column for an item
  const getCurrentColumnId = (item: T): string => {
    // If this is the active item that was just dropped, show it in its destination
    if (item.id === activeId && currentDroppableId && columns.includes(currentDroppableId.toString())) {
      return currentDroppableId.toString();
    }
    
    // Otherwise, use the normal column logic
    return getColumnId(item) || columns[0].toString();
  };

  const activeItem = activeId ? items.find(item => item.id === activeId) : null;

  const ConnectedDraggable = ({ item }: { item: T }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: item.id,
    });
  
    // Determine the column this item belongs to
    const columnId = getCurrentColumnId(item);
    const isPreview = activeId === item.id && currentDroppableId?.toString() === columnId;
    const isPending = item.status === 'pending';
  
    return (
      <div 
        ref={setNodeRef} 
        style={{
          opacity: activeId === item.id && !isPreview ? 0.5 : 1,
          transition: 'opacity 150ms ease-out, transform 150ms ease-out',
        }}
      >
        <DraggableComponent
          item={item}
          isDragging={activeId === item.id}
          isPreview={isPreview}
          isPending={isPending}
          dragHandleProps={{ ...listeners, ...attributes }}
          dragRef={setNodeRef}
          additionalProps={getDraggableProps ? getDraggableProps(item) : undefined}
        />
      </div>
    );
  };


  const ConnectedDroppable = ({ id, children }: { id: string; children?: ReactNode }) => {
    const { isOver, setNodeRef } = useDroppable({
      id,
      data: {
        accepts: ['task'], // Add data to make drop targeting logic more robust
      }
    });
    
    const isActive = activeColumn === id || currentDroppableId === id;

    return (
      <div 
        data-droppable-id={id} 
        ref={setNodeRef} 
        style={{
          position: 'relative', // Ensure proper stacking context
          height: '100%', // Fill container height
          // Add minimal styling to ensure column is properly targetable
          minHeight: '100px',
        }}
      >
        <DroppableComponent
          id={id}
          isOver={isOver}
          isActive={isActive}
          dropRef={setNodeRef}
          additionalProps={getDroppableProps ? getDroppableProps(id) : undefined}
        >
          {children}
        </DroppableComponent>
      </div>
    );
  };

  return (
    <ContainerComponent>
      <DndContext
        sensors={sensors}
        // Use multiple collision detection algorithms for better mobile support
        collisionDetection={(args) => {
          // First try pointerWithin which works well for touch
          const pointerCollisions = pointerWithin(args);
          if (pointerCollisions.length > 0) {
            return pointerCollisions;
          }
          
          // Fall back to intersection if pointer detection fails
          return rectIntersection(args);
        }}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {children || (
          <>
            {columns.map(columnId => (
              <ConnectedDroppable key={columnId} id={columnId}>
                {items
                  .filter(item => getCurrentColumnId(item) === columnId)
                  .map(item => (
                    <ConnectedDraggable key={item.id} item={item} />
                  ))}
              </ConnectedDroppable>
            ))}
          </>
        )}
        <DragOverlay>
          {activeItem && DragOverlayComponent && !isDropped ? (
            <DragOverlayComponent item={activeItem} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </ContainerComponent>
  );
};
