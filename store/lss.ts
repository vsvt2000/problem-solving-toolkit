import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LssProject {
  id: string;
  stage: 'Define' | 'Measure' | 'Analyze' | 'Improve' | 'Control';
  dpmoBase: number;
  dpmoTarget: number;
  wasteIdentified: string[]; // TIMWOOD: Transport, Inventory, Motion, etc.
}

interface LssState {
  lssData: LssProject | null;
  updateLss: (updates: Partial<LssProject>) => void;
  calculateSigmaLevel: () => number;
}

export const useLssStore = create<LssState>()(
  persist(
    (set, get) => ({
      lssData: null,
      updateLss: (updates) => set((state) => ({
        lssData: state.lssData ? { ...state.lssData, ...updates } : { 
          id: crypto.randomUUID(), 
          stage: 'Define', 
          dpmoBase: 0, 
          dpmoTarget: 0, 
          wasteIdentified: [],
          ...updates 
        }
      })),
      calculateSigmaLevel: () => {
        const dpmo = get().lssData?.dpmoBase || 0;
        if (dpmo <= 3.4) return 6;
        if (dpmo <= 233) return 5;
        if (dpmo <= 6210) return 4;
        if (dpmo <= 66807) return 3;
        return 2;
      }
    }),
    { name: 'lss-storage' }
  )
);