"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button = (props) => {
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({}, props, { className: `px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${props.className || ''}` })));
};
exports.Button = Button;
