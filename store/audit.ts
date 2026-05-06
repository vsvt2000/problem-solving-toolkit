import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuditEntry {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
  isVerified: boolean;
}

interface AuditState {
  entries: AuditEntry[];
  addDefaultQuestions: () => void;
  updateAnswer: (id: string, answer: string) => void;
  toggleVerification: (id: string) => void;
}

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      entries: [],
      addDefaultQuestions: () => set((state) => {
        if (state.entries.length > 0) return state; // Prevent duplicates
        const questions = [
          "Does this AI model resolve the root cause identified in the 5-Whys?",
          "How does the Data Pipeline Sentry protect against biased inputs?",
          "Does the ADKAR score indicate readiness for the automated change?",
          "Is the CPMAI stabilization health score maintainable by the current team?",
          "If the AI fails, what is the manual 'Lean' fallback process?"
        ];
        return {
          entries: questions.map(q => ({
            id: crypto.randomUUID(),
            question: q,
            answer: '',
            timestamp: new Date().toISOString(),
            isVerified: false
          }))
        };
      }),
      updateAnswer: (id, answer) => set((state) => ({
        entries: state.entries.map(e => e.id === id ? { ...e, answer, timestamp: new Date().toISOString() } : e)
      })),
      toggleVerification: (id) => set((state) => ({
        entries: state.entries.map(e => e.id === id ? { ...e, isVerified: !e.isVerified } : e)
      })),
    }),
    { name: 'socratic-audit-storage' }
  )
);