import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Plus, RotateCcw, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MoreOptionsMenuProps {
  onAddClick: () => void;
  onResetClick: () => void;
  onDeleteClick: () => void;
}

export const MoreOptionsMenu: React.FC<MoreOptionsMenuProps> = ({
  onAddClick,
  onResetClick,
  onDeleteClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        title="More Options"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
          <button
            onClick={() => {
              onAddClick();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
            <span>Add Bay</span>
          </button>
          <button
            onClick={() => {
              onDeleteClick();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Bays</span>
          </button>
          <button
            onClick={() => {
              onResetClick();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All</span>
          </button>
          <hr className="my-1 border-gray-200" />
          <button
            onClick={signOut}
            className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-red-600"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};