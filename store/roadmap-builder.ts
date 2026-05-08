import { create } from 'zustand';

interface RoadmapSelection {
  phase1: string[];
  phase2: string[];
  phase3: string[];
  phase4: string[];
  phase5: string[];
}

interface RoadmapBuilderState {
  selections: RoadmapSelection;
  isLocked: boolean;
  setPhaseSelection: (phase: keyof RoadmapSelection, components: string[]) => void;
  lockRoadmap: () => void;
  resetRoadmap: () => void;
}

export const useRoadmapBuilderStore = create<RoadmapBuilderState>((set) => ({
  selections: { phase1: [], phase2: [], phase3: [], phase4: [], phase5: [] },
  isLocked: false,
  setPhaseSelection: (phase, components) => set((state) => ({
    selections: { ...state.selections, [phase]: components }
  })),
  lockRoadmap: () => set({ isLocked: true }),
  resetRoadmap: () => set({ isLocked: false, selections: { phase1: [], phase2: [], phase3: [], phase4: [], phase5: [] } }),
}));