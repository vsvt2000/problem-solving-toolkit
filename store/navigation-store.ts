import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Phase {
  id: string;
  index: number;
}

interface NavigationState {
  currentPhase: Phase;
  phases: Phase[];
  setPhase: (index: number) => void;
  nextPhase: (canProceed?: boolean) => void;
  prevPhase: () => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set, get) => ({
      phases: [
        { id: 'p1', index: 0 },
        { id: 'p2', index: 1 },
        { id: 'p3', index: 2 },
        { id: 'p4', index: 3 },
      ],
      currentPhase: { id: 'p1', index: 0 },
      
      setPhase: (index) => {
        const phase = get().phases[index];
        if (phase) set({ currentPhase: phase });
      },

      nextPhase: (canProceed) => {
        if (!canProceed) {
          alert("LOGIC VIOLATION: Current phase requirements not met. Complete the forensic form before proceeding.");
          return;
        }
        const nextIndex = get().currentPhase.index + 1;
        if (nextIndex < get().phases.length) {
          set({ currentPhase: get().phases[nextIndex] });
        }
      },

      prevPhase: () => {
        const prevIndex = get().currentPhase.index - 1;
        if (prevIndex >= 0) {
          set({ currentPhase: get().phases[prevIndex] });
        }
      },
    }),
    { name: 'navigation-storage' }
  )
);