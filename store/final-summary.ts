import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CharterState {
  executiveSummary: string;
  isLocked: boolean;
  signOffDate: string | null;
  approverName: string;
  updateCharter: (updates: Partial<CharterState>) => void;
}

export const useCharterStore = create<CharterState>()(
  persist(
    (set) => ({
      executiveSummary: '',
      isLocked: false,
      signOffDate: null,
      approverName: '',
      updateCharter: (updates) => set((state) => ({ ...state, ...updates })),
    }),
    { name: 'charter-storage' }
  )
);