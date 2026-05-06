/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface SipocRow {
  id: string;
  supplier: string;
  input: string;
  processStep: string;
  output: string;
  customer: string;
  isAutomated: boolean;
  hasDigitalFootprint: boolean;
}

interface ToolkitState {
  sipocRows: SipocRow[];
  // Logic to update a single cell
  updateSipocCell: (id: string, field: keyof SipocRow, value: any) => void;
  // Logic to add a row (Playbook suggests 5-7 steps)
  addSipocRow: () => void;
  removeSipocRow: (id: string) => void;
}

export const useToolkitStore = create<ToolkitState>((set) => ({
  sipocRows: [
    { id: uuidv4(), supplier: '', input: '', processStep: '', output: '', customer: '', isAutomated: false, hasDigitalFootprint: true }
  ],
  updateSipocCell: (id, field, value) => set((state) => ({
    sipocRows: state.sipocRows.map(row => row.id === id ? { ...row, [field]: value } : row)
  })),
  addSipocRow: () => set((state) => ({
    sipocRows: [...state.sipocRows, { id: uuidv4(), supplier: '', input: '', processStep: '', output: '', customer: '', isAutomated: false, hasDigitalFootprint: true }]
  })),
  removeSipocRow: (id) => set((state) => ({
    sipocRows: state.sipocRows.filter(row => row.id !== id)
  })),
}));