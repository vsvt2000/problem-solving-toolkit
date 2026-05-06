/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShadowGap {
  stepId: string;
  processName: string;
  reportedEffort: string; // From interviews
  actualTrace: string;   // From digital footprint
  varianceLevel: 'Low' | 'Medium' | 'High';
}

interface ShadowState {
  gaps: ShadowGap[];
  syncSipocData: (sipocRows: any[]) => void;
  updateGap: (stepId: string, updates: Partial<ShadowGap>) => void;
}

export const useShadowStore = create<ShadowState>()(
  persist(
    (set) => ({
      gaps: [],
      syncSipocData: (sipocRows) => {
        const newGaps = sipocRows.map(row => ({
          stepId: row.id,
          processName: row.processStep,
          reportedEffort: '',
          actualTrace: row.hasDigitalFootprint ? 'Detectable' : 'Missing',
          varianceLevel: 'Low' as const
        }));
        set({ gaps: newGaps });
      },
      updateGap: (stepId, updates) => set((state) => ({
        gaps: state.gaps.map(g => g.stepId === stepId ? { ...g, ...updates } : g)
      })),
    }),
    { name: 'shadow-mapper-storage' }
  )
);