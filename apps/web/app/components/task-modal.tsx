'use client';

import { useState, useEffect } from 'react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { content: string; columnId: string }) => void;
  columns: { id: string; title: string }[];
}

export function TaskModal({ isOpen, onClose, onSave, columns }: TaskModalProps) {
  const [content, setContent] = useState('');
  const [columnId, setColumnId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setContent('');
      setColumnId(columns[0]?.id || '');
    }
  }, [isOpen, columns]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && columnId) {
      onSave({ content: content.trim(), columnId });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Description
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              placeholder="Enter task description..."
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Column
            </label>
            <select
              value={columnId}
              onChange={(e) => setColumnId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600
                       hover:bg-primary-700 rounded-md"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 