import React from 'react';

interface BayStatsProps {
  stats: {
    empty: number;
    loading: number;
    available: number;
    used: number;
    total: number;
  };
}

export const BayStats: React.FC<BayStatsProps> = ({ stats }) => {
  const orderedStats = [
    { value: stats.available, color: 'bg-green-500' },
    { value: stats.empty, color: 'bg-gray-300' },
    { value: stats.loading, color: 'bg-red-500' },
    { value: stats.used, color: 'bg-blue-500' },
  ];

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        {orderedStats.map((stat, index) => (
          <StatItem key={index} value={stat.value} color={stat.color} />
        ))}
      </div>
      <div className="text-base font-medium pl-4 border-l border-gray-200">
        {stats.total}
      </div>
    </div>
  );
};

const StatItem: React.FC<{ value: number; color: string }> = ({
  value,
  color,
}) => (
  <div className="flex items-center space-x-2">
    <div className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-base font-medium">{value}</span>
  </div>
);