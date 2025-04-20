import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Column } from './Column';

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface KanbanBoardProps {
  initialColumns: Column[];
  onTaskMove?: (result: any) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialColumns, onTaskMove }) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainer = findContainer(activeId as string);
    const overContainer = findContainer(overId as string);

    if (!activeContainer || !overContainer) return;

    const activeIndex = columns[activeContainer].tasks.findIndex(
      task => task.id === activeId
    );
    const overIndex = columns[overContainer].tasks.findIndex(
      task => task.id === overId
    );

    if (activeContainer === overContainer) {
      // Moving within the same column
      const newColumns = [...columns];
      newColumns[activeContainer].tasks = arrayMove(
        newColumns[activeContainer].tasks,
        activeIndex,
        overIndex
      );
      setColumns(newColumns);
    } else {
      // Moving to a different column
      const newColumns = [...columns];
      const [movedTask] = newColumns[activeContainer].tasks.splice(activeIndex, 1);
      newColumns[overContainer].tasks.splice(overIndex, 0, movedTask);
      setColumns(newColumns);
    }

    setActiveId(null);
    if (onTaskMove) {
      onTaskMove({
        source: { index: activeIndex, droppableId: columns[activeContainer].id },
        destination: { index: overIndex, droppableId: columns[overContainer].id },
        draggableId: activeId,
      });
    }
  };

  const findContainer = (id: string) => {
    return columns.findIndex(column =>
      column.tasks.some(task => task.id === id)
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </div>
    </DndContext>
  );
}; 