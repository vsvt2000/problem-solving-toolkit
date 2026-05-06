import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ValueCase {
  id: string;
  strategicObjective: string;
  primaryMetric: string; // e.g., "Reduction in Cycle Time"
  baselineValue: number;
  targetValue: number;
  monetaryImpactPerUnit: number;
  confidenceScore: number; // 1-100%
}

interface ValueCaseState {
  cases: ValueCase[];
  addValueCase: () => void;
  updateValueCase: (id: string, updates: Partial<ValueCase>) => void;
  removeValueCase: (id: string) => void;
}

export const useValueCaseStore = create<ValueCaseState>()(
  persist(
    (set) => ({
      cases: [],
      addValueCase: () => set((state) => ({
        cases: [
          ...state.cases,
          { 
            id: crypto.randomUUID(), 
            strategicObjective: '', 
            primaryMetric: '', 
            baselineValue: 0, 
            targetValue: 0, 
            monetaryImpactPerUnit: 0, 
            confidenceScore: 50 
          }
        ]
      })),
      updateValueCase: (id, updates) => set((state) => ({
        cases: state.cases.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      removeValueCase: (id) => set((state) => ({
        cases: state.cases.filter(c => c.id !== id)
      })),
    }),
    { name: 'value-case-storage' }
  )
);