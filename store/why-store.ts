import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WhyChain {
  id: string;
  problemStatement: string; // The initial "Symptom"
  whys: string[]; // Array of 5 strings
  rootCauseType: 'Technical' | 'Human' | 'Process' | 'Data';
  isVerifiedByData: boolean;
}

interface WhyState {
  chains: WhyChain[];
  addChain: (symptom: string) => void;
  updateWhy: (chainId: string, index: number, text: string) => void;
  setMetadata: (chainId: string, updates: Partial<WhyChain>) => void;
  removeChain: (id: string) => void;
}

export const useWhyStore = create<WhyState>()(
  persist(
    (set) => ({
      chains: [],
      addChain: (symptom) => set((state) => ({
        chains: [...state.chains, { 
          id: crypto.randomUUID(), 
          problemStatement: symptom, 
          whys: ['', '', '', '', ''], 
          rootCauseType: 'Process',
          isVerifiedByData: false 
        }]
      })),
      updateWhy: (chainId, index, text) => set((state) => ({
        chains: state.chains.map(c => {
          if (c.id !== chainId) return c;
          const newWhys = [...c.whys];
          newWhys[index] = text;
          return { ...c, whys: newWhys };
        })
      })),
      setMetadata: (chainId, updates) => set((state) => ({
        chains: state.chains.map(c => c.id === chainId ? { ...c, ...updates } : c)
      })),
      removeChain: (id) => set((state) => ({
        chains: state.chains.filter(c => c.id !== id)
      })),
    }),
    { name: 'why-logic-storage' }
  )
);