import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bay, BayStatus } from '../types/bay';
import { supabase } from '../lib/supabase';

export const useBays = () => {
  const [bays, setBays] = useState<Bay[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadBays();
    }
  }, [user]);

  const loadBays = async () => {
    try {
      const { data, error } = await supabase
        .from('bays')
        .select('*')
        .order('id');

      if (error) throw error;
      setBays(data || []);
    } catch (error) {
      console.error('Error loading bays:', error);
    }
  };

  const addBay = async (bay: Bay) => {
    try {
      const { error } = await supabase
        .from('bays')
        .insert([{ ...bay, user_id: user?.id }]);

      if (error) throw error;
      await loadBays();
    } catch (error) {
      console.error('Error adding bay:', error);
    }
  };

  const addBays = async (newBays: Bay[]) => {
    try {
      const { error } = await supabase
        .from('bays')
        .insert(newBays.map(bay => ({ ...bay, user_id: user?.id })));

      if (error) throw error;
      await loadBays();
    } catch (error) {
      console.error('Error adding bays:', error);
    }
  };

  const updateBayStatus = async (id: string, status: BayStatus) => {
    try {
      const { error } = await supabase
        .from('bays')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await loadBays();
    } catch (error) {
      console.error('Error updating bay status:', error);
    }
  };

  const deleteBays = async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from('bays')
        .delete()
        .in('id', ids);

      if (error) throw error;
      await loadBays();
    } catch (error) {
      console.error('Error deleting bays:', error);
    }
  };

  const resetBays = async (status: BayStatus) => {
    try {
      const { error } = await supabase
        .from('bays')
        .update({ status })
        .neq('id', '');  // Update all rows

      if (error) throw error;
      await loadBays();
    } catch (error) {
      console.error('Error resetting bays:', error);
    }
  };

  const getBayStats = () => {
    return bays.reduce(
      (acc, bay) => {
        acc[bay.status]++;
        acc.total++;
        return acc;
      },
      { empty: 0, loading: 0, available: 0, used: 0, total: 0 }
    );
  };

  return {
    bays,
    addBay,
    addBays,
    updateBayStatus,
    deleteBays,
    resetBays,
    getBayStats,
  };
};