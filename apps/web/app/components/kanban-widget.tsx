'use client';

import { useState, useEffect } from 'react';
import { Card } from '@repo/ui/card';
import { KanbanBoard } from '@repo/ui/kanban-board';
import { ErrorBoundary } from './error-boundary';

const defaultColumns = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', content: 'Learn TypeScript' },
      { id: '2', content: 'Build a side project' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: '3', content: 'Study React hooks' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '4', content: 'Set up development environment' },
    ],
  },
];

export function KanbanWidget() {
  const [columns, setColumns] = useState(defaultColumns);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage
  useEffect(() => {
    const savedColumns = localStorage.getItem('kanban-columns');
    if (savedColumns) {
      try {
        setColumns(JSON.parse(savedColumns));
      } catch (error) {
        console.error('Failed to parse saved columns:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleTaskMove = (result: any) => {
    const newColumns = [...columns];
    const sourceColIndex = newColumns.findIndex(col => col.id === result.source.droppableId);
    const destColIndex = newColumns.findIndex(col => col.id === result.destination.droppableId);
    
    const [movedTask] = newColumns[sourceColIndex].tasks.splice(result.source.index, 1);
    newColumns[destColIndex].tasks.splice(result.destination.index, 0, movedTask);
    
    setColumns(newColumns);
    // Save to localStorage
    localStorage.setItem('kanban-columns', JSON.stringify(newColumns));
  };

  const content = (
    <Card title="Tasks" className="col-span-full">
      <div className="py-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : (
          <KanbanBoard
            initialColumns={columns}
            onTaskMove={handleTaskMove}
          />
        )}
      </div>
    </Card>
  );

  return <ErrorBoundary>{content}</ErrorBoundary>;
} 