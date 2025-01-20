import React from 'react';
import { Bay } from '../types/bay';
import { getBayStatusColor } from '../utils/bayUtils';

interface BayGridProps {
  bays: Bay[];
  onBayClick: (id: string) => void;
  deleteMode?: boolean;
  selectedBays?: string[];
}

export const BayGrid: React.FC<BayGridProps> = ({
  bays,
  onBayClick,
  deleteMode = false,
  selectedBays = [],
}) => {
  const groupedBays = bays.reduce((acc, bay) => {
    const prefix = bay.id[0];
    if (!acc[prefix]) acc[prefix] = [];
    acc[prefix].push(bay);
    return acc;
  }, {} as Record<string, Bay[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedBays)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([prefix, prefixBays], index, array) => (
          <div key={prefix}>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {prefixBays
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((bay) => (
                  <button
                    key={bay.id}
                    onClick={() => onBayClick(bay.id)}
                    className={`
                      p-2 rounded text-sm font-medium text-white
                      transition-all duration-200 truncate
                      ${getBayStatusColor(bay.status)}
                      ${deleteMode && selectedBays.includes(bay.id) ? 'ring-2 ring-red-400' : ''}
                      hover:opacity-80
                    `}
                  >
                    {bay.id}
                  </button>
                ))}
            </div>
            {index < array.length - 1 && (
              <hr className="my-4 border-gray-200" />
            )}
          </div>
        ))}
    </div>
  );
};