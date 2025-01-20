import React, { useState } from 'react';
import { BayStatus } from '../types/bay';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: (status: BayStatus) => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onReset,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<BayStatus>('empty');

  if (!isOpen) return null;

  const handleReset = () => {
    onReset(selectedStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Reset All Bays</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Reset to status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as BayStatus)}
              className="w-full p-2 border rounded"
            >
              <option value="empty">Empty</option>
              <option value="loading">Loading</option>
              <option value="available">Available</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reset All
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};