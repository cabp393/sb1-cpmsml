import React, { useState } from 'react';
import { generateBaysFromRange } from '../utils/bayUtils';
import { Bay } from '../types/bay';

interface AddBayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bays: Bay[]) => void;
}

export const AddBayModal: React.FC<AddBayModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [mode, setMode] = useState<'single' | 'range'>('single');
  const [bayId, setBayId] = useState('');
  const [prefix, setPrefix] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'single') {
      onAdd([{ id: bayId, status: 'empty' }]);
    } else {
      const bays = generateBaysFromRange(
        prefix,
        parseInt(start),
        parseInt(end)
      );
      onAdd(bays);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Bay</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              mode === 'single' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setMode('single')}
          >
            Single Bay
          </button>
          <button
            className={`px-4 py-2 rounded ${
              mode === 'range' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setMode('range')}
          >
            Range
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'single' ? (
            <input
              type="text"
              value={bayId}
              onChange={(e) => setBayId(e.target.value)}
              placeholder="Bay ID (e.g., A01 or 101)"
              pattern="[A-Za-z0-9][0-9]{2}"
              className="w-full p-2 border rounded"
              required
            />
          ) : (
            <>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="Prefix (e.g., A or 1)"
                pattern="[A-Za-z0-9]"
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  placeholder="Start"
                  min="1"
                  max="99"
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  placeholder="End"
                  min="1"
                  max="99"
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
            </>
          )}
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};