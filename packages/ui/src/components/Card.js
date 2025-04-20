"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Card = ({ title, children, className = '' }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "px-4 py-3 border-b border-gray-200 dark:border-gray-700", children: (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white", children: title }) }), (0, jsx_runtime_1.jsx)("div", { className: "p-4", children: children })] }));
};
exports.Card = Card;
