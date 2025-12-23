import React, { useState } from 'react';
import { BayStatus } from '../types/bay';

type CopyGrouping = 'all' | BayStatus;

interface CopyBaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: (grouping: CopyGrouping) => void;
}

const groupingOptions: { value: CopyGrouping; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'empty', label: 'Empty' },
  { value: 'loading', label: 'Loading' },
  { value: 'available', label: 'Available' },
  { value: 'used', label: 'Used' },
];

export const CopyBaysModal: React.FC<CopyBaysModalProps> = ({
  isOpen,
  onClose,
  onCopy,
}) => {
  const [grouping, setGrouping] = useState<CopyGrouping>('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Copiar bahías</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Agrupación</label>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value as CopyGrouping)}
              className="w-full p-2 border rounded"
            >
              {groupingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onCopy(grouping)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Copiar
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
