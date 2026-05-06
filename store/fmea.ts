import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FailureMode {
  id: string;
  processStep: string;
  potentialFailure: string;
  severity: number;   // 1 (Low) to 10 (High)
  occurrence: number; // 1 (Rare) to 10 (Frequent)
  detection: number;  // 1 (Certain) to 10 (Impossible)
  rpn: number;        // The calculated Risk Priority Number
}

interface FmeaState {
  failures: FailureMode[];
  addFailure: (stepName: string) => void;
  updateFailure: (id: string, updates: Partial<FailureMode>) => void;
  removeFailure: (id: string) => void;
}

export const useFmeaStore = create<FmeaState>()(
  persist(
    (set) => ({
      failures: [],
      addFailure: (stepName) => set((state) => {
        const id = crypto.randomUUID();
        return {
          failures: [
            ...state.failures,
            { 
              id, 
              processStep: stepName, 
              potentialFailure: '', 
              severity: 1, 
              occurrence: 1, 
              detection: 1, 
              rpn: 1 
            }
          ]
        };
      }),
      updateFailure: (id, updates) => set((state) => ({
        failures: state.failures.map((f) => {
          if (f.id !== id) return f;
          const updated = { ...f, ...updates };
          // Logic Gate: Automatically recalculate RPN on any score change
          updated.rpn = updated.severity * updated.occurrence * updated.detection;
          return updated;
        })
      })),
      removeFailure: (id) => set((state) => ({
        failures: state.failures.filter((f) => f.id !== id)
      })),
    }),
    { name: 'fmea-logic-storage' }
  )
);