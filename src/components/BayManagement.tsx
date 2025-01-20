import React, { useState } from 'react';
import { BayGrid } from './BayGrid';
import { BayStats } from './BayStats';
import { AddBayModal } from './AddBayModal';
import { ResetModal } from './ResetModal';
import { Layout } from './Layout';
import { useBays } from '../hooks/useBays';
import { getNextStatus } from '../utils/bayUtils';

export const BayManagement = () => {
  const {
    bays,
    addBays,
    updateBayStatus,
    deleteBays,
    resetBays,
    getBayStats,
  } = useBays();

  const [isLocked, setIsLocked] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedBays, setSelectedBays] = useState<string[]>([]);

  const handleBayClick = (id: string) => {
    if (deleteMode) {
      setSelectedBays((prev) =>
        prev.includes(id)
          ? prev.filter((bayId) => bayId !== id)
          : [...prev, id]
      );
    } else if (!isLocked) {
      const bay = bays.find((b) => b.id === id);
      if (bay) {
        updateBayStatus(id, getNextStatus(bay.status));
      }
    }
  };

  const handleDelete = () => {
    if (selectedBays.length > 0) {
      if (window.confirm('Are you sure you want to delete the selected bays?')) {
        deleteBays(selectedBays);
        setSelectedBays([]);
        setDeleteMode(false);
      }
    }
  };

  const filteredBays = showOnlyAvailable
    ? bays.filter((bay) => bay.status === 'available')
    : bays;

  return (
    <Layout
      isLocked={isLocked}
      showOnlyAvailable={showOnlyAvailable}
      onLockToggle={() => setIsLocked(!isLocked)}
      onFilterToggle={() => setShowOnlyAvailable(!showOnlyAvailable)}
      onAddClick={() => setShowAddModal(true)}
      onResetClick={() => setShowResetModal(true)}
      onDeleteClick={() => {
        if (deleteMode && selectedBays.length > 0) {
          handleDelete();
        } else {
          setDeleteMode(!deleteMode);
          setSelectedBays([]);
        }
      }}
    >
      <div className="space-y-4">
        <BayStats stats={getBayStats()} />
        <BayGrid
          bays={filteredBays}
          onBayClick={handleBayClick}
          deleteMode={deleteMode}
          selectedBays={selectedBays}
        />
        <AddBayModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={addBays}
        />
        <ResetModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          onReset={resetBays}
        />
      </div>
    </Layout>
  );
};