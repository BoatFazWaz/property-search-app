import React from 'react';
interface Task {
    id: string;
    content: string;
}
interface ColumnProps {
    id: string;
    title: string;
    tasks: Task[];
}
export declare const Column: React.FC<ColumnProps>;
export {};
//# sourceMappingURL=Column.d.ts.map