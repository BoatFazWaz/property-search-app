"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanBoard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const core_1 = require("@dnd-kit/core");
const sortable_1 = require("@dnd-kit/sortable");
const Column_1 = require("./Column");
const KanbanBoard = ({ initialColumns, onTaskMove }) => {
    const [columns, setColumns] = (0, react_1.useState)(initialColumns);
    const sensors = (0, core_1.useSensors)((0, core_1.useSensor)(core_1.PointerSensor), (0, core_1.useSensor)(core_1.KeyboardSensor, {
        coordinateGetter: sortable_1.sortableKeyboardCoordinates,
    }));
    const handleDragStart = () => {
        // We're not using activeId anymore, so we can remove this handler
        // or keep it for future use
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over)
            return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId)
            return;
        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);
        if (!activeContainer || !overContainer)
            return;
        const activeIndex = columns[activeContainer].tasks.findIndex(task => task.id === activeId);
        const overIndex = columns[overContainer].tasks.findIndex(task => task.id === overId);
        if (activeContainer === overContainer) {
            // Moving within the same column
            const newColumns = [...columns];
            newColumns[activeContainer].tasks = (0, sortable_1.arrayMove)(newColumns[activeContainer].tasks, activeIndex, overIndex);
            setColumns(newColumns);
        }
        else {
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
                draggableId: activeId,
            });
        }
    };
    const findContainer = (id) => {
        return columns.findIndex(column => column.tasks.some(task => task.id === id));
    };
    return ((0, jsx_runtime_1.jsx)(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCorners, onDragStart: handleDragStart, onDragEnd: handleDragEnd, children: (0, jsx_runtime_1.jsx)("div", { className: "flex gap-4 overflow-x-auto pb-4", children: columns.map(column => ((0, jsx_runtime_1.jsx)(Column_1.Column, { id: column.id, title: column.title, tasks: column.tasks }, column.id))) }) }));
};
exports.KanbanBoard = KanbanBoard;
