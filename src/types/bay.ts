export type BayStatus = 'empty' | 'loading' | 'available' | 'used';

export interface Bay {
  id: string;
  status: BayStatus;
}

export interface BayRange {
  prefix: string;
  start: number;
  end: number;
}