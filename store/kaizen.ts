import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Optimization {
  id: string;
  sourceStepId: string; // Linked to VSM Step
  observation: string;
  improvementAction: string;
  impactMeasured: number; // Percentage improvement in PER
  status: 'Identified' | 'Testing' | 'Standardized';
}

interface KaizenState {
  optimizations: Optimization[];
  addObservation: (stepId: string) => void;
  standardizeImprovement: (id: string) => void;
  updateOptimization: (id: string, updates: Partial<Optimization>) => void;
}

export const useKaizenStore = create<KaizenState>()(
  persist(
    (set) => ({
      optimizations: [],
      addObservation: (stepId) => set((state) => ({
        optimizations: [
          ...state.optimizations,
          { id: crypto.randomUUID(), sourceStepId: stepId, observation: '', improvementAction: '', impactMeasured: 0, status: 'Identified' }
        ]
      })),
      standardizeImprovement: (id) => set((state) => ({
        optimizations: state.optimizations.map(o => o.id === id ? { ...o, status: 'Standardized' } : o)
      })),
      updateOptimization: (id, updates) => set((state) => ({
        optimizations: state.optimizations.map(o => o.id === id ? { ...o, ...updates } : o)
      })),
    }),
    { name: 'kaizen-storage' }
  )
);