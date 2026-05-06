import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface CausalChain {
  id: string;
  type: 'Technical' | 'Process' | 'Behavioral';
  assumption: string;
  evidence: string;
  aiVerification: string;
}

interface DiagnosisState {
  causalChains: CausalChain[];
  addChain: (type: 'Technical' | 'Process' | 'Behavioral') => void;
  updateChain: (id: string, updates: Partial<CausalChain>) => void;
  removeChain: (id: string) => void;
}

export const useDiagnosisStore = create<DiagnosisState>()(
  persist(
    (set) => ({
      causalChains: [],
      addChain: (type) => set((state) => ({
        causalChains: [
          ...state.causalChains,
          { id: uuidv4(), type, assumption: '', evidence: '', aiVerification: '' }
        ]
      })),
      updateChain: (id, updates) => set((state) => ({
        causalChains: state.causalChains.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      removeChain: (id) => set((state) => ({
        causalChains: state.causalChains.filter(c => c.id !== id)
      })),
    }),
    { name: 'diagnosis-storage' }
  )
);