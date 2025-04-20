import React, { useState } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
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

interface TaskMoveResult {
  source: {
    index: number;
    droppableId: string;
  };
  destination: {
    index: number;
    droppableId: string;
  };
  draggableId: string;
}

interface KanbanBoardProps {
  initialColumns: Column[];
  onTaskMove?: (result: TaskMoveResult) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialColumns, onTaskMove }) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = () => {
    // We're not using activeId anymore, so we can remove this handler
    // or keep it for future use
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

    if (onTaskMove) {
      onTaskMove({
        source: { index: activeIndex, droppableId: columns[activeContainer].id },
        destination: { index: overIndex, droppableId: columns[overContainer].id },
        draggableId: activeId as string,
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