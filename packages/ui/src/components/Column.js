"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@dnd-kit/core");
const sortable_1 = require("@dnd-kit/sortable");
const SortableItem_1 = require("./SortableItem");
const Column = ({ id, title, tasks }) => {
    const { setNodeRef } = (0, core_1.useDroppable)({
        id,
    });
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 w-72", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-100 dark:bg-gray-700 rounded-lg p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold mb-4 text-gray-700 dark:text-gray-200", children: title }), (0, jsx_runtime_1.jsx)("div", { ref: setNodeRef, className: "min-h-[200px]", children: (0, jsx_runtime_1.jsx)(sortable_1.SortableContext, { items: tasks.map(task => task.id), strategy: sortable_1.verticalListSortingStrategy, children: tasks.map((task) => ((0, jsx_runtime_1.jsx)(SortableItem_1.SortableItem, { id: task.id, content: task.content }, task.id))) }) })] }) }));
};
exports.Column = Column;
