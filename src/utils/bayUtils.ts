import { Bay, BayStatus } from '../types/bay';

export const generateBayId = (prefix: string, number: number): string => {
  return `${prefix}${number.toString().padStart(2, '0')}`;
};

export const getNextStatus = (currentStatus: BayStatus): BayStatus => {
  const statusOrder: BayStatus[] = ['empty', 'loading', 'available', 'used'];
  const currentIndex = statusOrder.indexOf(currentStatus);
  return statusOrder[(currentIndex + 1) % statusOrder.length];
};

export const getBayStatusColor = (status: BayStatus): string => {
  const colors = {
    empty: 'bg-gray-300',
    loading: 'bg-red-500',
    available: 'bg-green-500',
    used: 'bg-blue-500',
  };
  return colors[status];
};

export const generateBaysFromRange = (prefix: string, start: number, end: number): Bay[] => {
  const bays: Bay[] = [];
  for (let i = start; i <= end; i++) {
    bays.push({
      id: generateBayId(prefix, i),
      status: 'empty',
    });
  }
  return bays;
};