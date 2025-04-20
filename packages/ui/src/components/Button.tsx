import React, { ButtonHTMLAttributes } from 'react';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${props.className || ''}`}
    />
  );
}; 