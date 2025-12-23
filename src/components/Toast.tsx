import React from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-gray-900 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-3">
        <span className="text-sm">{message}</span>
        <button
          onClick={onClose}
          className="text-xs text-gray-300 hover:text-white"
          aria-label="Close toast"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
