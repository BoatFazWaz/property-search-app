import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface Task {
  id: string;
  content: string;
}

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex-shrink-0 w-72">
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">
          {title}
        </h3>
        <div ref={setNodeRef} className="min-h-[200px]">
          <SortableContext
            items={tasks.map(task => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <SortableItem
                key={task.id}
                id={task.id}
                content={task.content}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}; 