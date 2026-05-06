import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DiagnosticScores {
  A: number; // Problem Definition
  B: number; // Strategic Alignment
  C: number; // AI Maturity
  D: number; // Stakeholder Buy-in
  E: number; // Data Readiness
}

interface DiagnosticState {
  scores: DiagnosticScores;
  updateScore: (section: keyof DiagnosticScores, value: number) => void;
  getMaturityLevel: () => 'Beginner' | 'Intermediate' | 'Advanced';
}

export const useDiagnosticStore = create<DiagnosticState>()(
  persist(
    (set, get) => ({
      scores: { A: 0, B: 0, C: 0, D: 0, E: 0 },
      
      updateScore: (section, value) => set((state) => ({
        scores: { ...state.scores, [section]: value }
      })),

      getMaturityLevel: () => {
        const maturity = get().scores.C;
        if (maturity <= 14) return 'Beginner';
        if (maturity <= 21) return 'Intermediate';
        return 'Advanced';
      }
    }),
    {
      name: 'diagnostic-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);