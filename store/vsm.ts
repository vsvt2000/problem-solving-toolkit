/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface VsmStep {
  id: string;
  name: string;
  valueAddTime: number; // minutes
  waitTime: number;     // minutes
  dataQualityScore: number; // 1-10
  isDigital: boolean;
}

interface VsmState {
  steps: VsmStep[];
  syncWithSipoc: (sipocRows: any[]) => void;
  updateStep: (id: string, updates: Partial<VsmStep>) => void;
  getTotals: () => { totalVAT: number; totalLT: number; efficiency: number };
}

export const useVsmStore = create<VsmState>()(
  persist(
    (set, get) => ({
      steps: [],
      syncWithSipoc: (sipocRows) => {
        const steps = sipocRows.map(row => ({
          id: row.id,
          name: row.processStep,
          valueAddTime: 0,
          waitTime: 0,
          dataQualityScore: row.hasDigitalFootprint ? 7 : 1,
          isDigital: row.hasDigitalFootprint
        }));
        set({ steps });
      },
      updateStep: (id, updates) => set((state) => ({
        steps: state.steps.map(s => s.id === id ? { ...s, ...updates } : s)
      })),
      getTotals: () => {
        const { steps } = get();
        const totalVAT = steps.reduce((acc, s) => acc + s.valueAddTime, 0);
        const totalLT = steps.reduce((acc, s) => acc + s.valueAddTime + s.waitTime, 0);
        const efficiency = totalLT > 0 ? (totalVAT / totalLT) * 100 : 0;
        return { totalVAT, totalLT, efficiency };
      }
    }),
    { name: 'vsm-storage' }
  )
);