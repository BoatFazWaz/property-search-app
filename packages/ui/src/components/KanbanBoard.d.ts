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
interface KanbanBoardProps {
    initialColumns: Column[];
    onTaskMove?: (result: any) => void;
}
export declare const KanbanBoard: React.FC<KanbanBoardProps>;
export {};
//# sourceMappingURL=KanbanBoard.d.ts.map