"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortableItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const sortable_1 = require("@dnd-kit/sortable");
const utilities_1 = require("@dnd-kit/utilities");
const SortableItem = ({ id, content }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, } = (0, sortable_1.useSortable)({ id });
    const style = {
        transform: utilities_1.CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: setNodeRef, style: style }, attributes, listeners, { className: "bg-white dark:bg-gray-800 p-3 rounded mb-2 shadow-sm cursor-move", children: content })));
};
exports.SortableItem = SortableItem;
