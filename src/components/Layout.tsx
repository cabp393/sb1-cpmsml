import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Filter, Lock, Unlock, MoreVertical } from 'lucide-react';
import { MoreOptionsMenu } from './MoreOptionsMenu';

interface LayoutProps {
  children: React.ReactNode;
  isLocked: boolean;
  showOnlyAvailable: boolean;
  onLockToggle: () => void;
  onFilterToggle: () => void;
  onAddClick: () => void;
  onResetClick: () => void;
  onDeleteClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isLocked,
  showOnlyAvailable,
  onLockToggle,
  onFilterToggle,
  onAddClick,
  onResetClick,
  onDeleteClick,
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">Bay Management</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={onLockToggle}
              className={`p-2 rounded-full ${
                isLocked
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              title={isLocked ? 'Unlock Bays' : 'Lock Bays'}
            >
              {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
            </button>
            <button
              onClick={onFilterToggle}
              className={`p-2 rounded-full ${
                showOnlyAvailable
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              title={showOnlyAvailable ? 'Show All' : 'Show Available Only'}
            >
              <Filter className="w-5 h-5" />
            </button>
            <MoreOptionsMenu
              onAddClick={onAddClick}
              onResetClick={onResetClick}
              onDeleteClick={onDeleteClick}
            />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4">{children}</main>
    </div>
  );
};