'use client';

import React from 'react';
import { KanbanBoard } from "@repo/ui/kanban-board";

export default function DashboardPage(): React.ReactElement {
  const initialColumns = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', content: 'Research market trends' },
        { id: '2', content: 'Review property listings' }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: '3', content: 'Contact real estate agents' }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: '4', content: 'Set budget parameters' }
      ]
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Property Search Dashboard</h1>
      <KanbanBoard initialColumns={initialColumns} />
    </div>
  );
} 