import React from 'react';
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
export declare const KanbanBoard: React.FC<KanbanBoardProps>;
export {};
//# sourceMappingURL=KanbanBoard.d.ts.map