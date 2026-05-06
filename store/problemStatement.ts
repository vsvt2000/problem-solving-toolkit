import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProblemDefinition {
  currentState: string;
  idealState: string;
  gapDescription: string;
  impactOfFailure: string;
  urgencyScore: number; // 1-10
}

interface ProblemState {
  problem: ProblemDefinition;
  updateProblem: (updates: Partial<ProblemDefinition>) => void;
  resetProblem: () => void;
}

export const useProblemStore = create<ProblemState>()(
  persist(
    (set) => ({
      problem: {
        currentState: '',
        idealState: '',
        gapDescription: '',
        impactOfFailure: '',
        urgencyScore: 5,
      },
      updateProblem: (updates) => set((state) => ({
        problem: { ...state.problem, ...updates }
      })),
      resetProblem: () => set({
        problem: {
          currentState: '',
          idealState: '',
          gapDescription: '',
          impactOfFailure: '',
          urgencyScore: 5,
        }
      }),
    }),
    { name: 'problem-statement-storage' }
  )
);