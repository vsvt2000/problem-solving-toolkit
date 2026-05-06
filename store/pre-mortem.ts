import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface FailureMode {
  id: string;
  category: 'Technical' | 'Cultural' | 'Operational';
  scenario: string; // "Imagine it is 1 year from now and the project failed. Why?"
  mitigationPlan: string;
  severity: 'High' | 'Medium' | 'Low';
}

interface PreMortemState {
  risks: FailureMode[];
  addRisk: (category: FailureMode['category']) => void;
  updateRisk: (id: string, updates: Partial<FailureMode>) => void;
  removeRisk: (id: string) => void;
}

export const usePreMortemStore = create<PreMortemState>()(
  persist(
    (set) => ({
      risks: [],
      addRisk: (category) => set((state) => ({
        risks: [
          ...state.risks,
          { id: uuidv4(), category, scenario: '', mitigationPlan: '', severity: 'Medium' }
        ]
      })),
      updateRisk: (id, updates) => set((state) => ({
        risks: state.risks.map(r => r.id === id ? { ...r, ...updates } : r)
      })),
      removeRisk: (id) => set((state) => ({
        risks: state.risks.filter(r => r.id !== id)
      })),
    }),
    { name: 'pre-mortem-storage' }
  )
);