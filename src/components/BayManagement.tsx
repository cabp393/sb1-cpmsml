import React, { useRef, useState } from 'react';
import { BayGrid } from './BayGrid';
import { BayStats } from './BayStats';
import { AddBayModal } from './AddBayModal';
import { ResetModal } from './ResetModal';
import { Layout } from './Layout';
import { useBays } from '../hooks/useBays';
import { getNextStatus } from '../utils/bayUtils';
import { CopyBaysModal } from './CopyBaysModal';
import { BayStatus } from '../types/bay';
import { Toast } from './Toast';

type CopyGrouping = 'all' | BayStatus;

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
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedBays, setSelectedBays] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

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

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 3000);
  };

  const handleCopy = async (grouping: CopyGrouping) => {
    const baysToCopy =
      grouping === 'all'
        ? bays
        : bays.filter((bay) => bay.status === grouping);

    const text = baysToCopy
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((bay) => bay.id)
      .join('\n');

    if (!text) {
      showToast('No hay bahías para copiar');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast('Copiado al portapapeles');
      setShowCopyModal(false);
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (success) {
        showToast('Copiado al portapapeles');
        setShowCopyModal(false);
      } else {
        showToast('No se pudo copiar al portapapeles');
      }
    }
  };

  return (
    <Layout
      isLocked={isLocked}
      showOnlyAvailable={showOnlyAvailable}
      onLockToggle={() => setIsLocked(!isLocked)}
      onFilterToggle={() => setShowOnlyAvailable(!showOnlyAvailable)}
      onAddClick={() => setShowAddModal(true)}
      onResetClick={() => setShowResetModal(true)}
      onCopyClick={() => setShowCopyModal(true)}
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
        <CopyBaysModal
          isOpen={showCopyModal}
          onClose={() => setShowCopyModal(false)}
          onCopy={handleCopy}
        />
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </Layout>
  );
};
