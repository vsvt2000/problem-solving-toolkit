import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Stakeholder {
  id: string;
  name: string;
  power: number; // 1-10
  interest: number; // 1-10
  sentiment: 'Supporter' | 'Neutral' | 'Resistant';
  impact: string; // Brief description of their role in the project
}

interface StakeholderState {
  stakeholders: Stakeholder[];
  addStakeholder: (name: string) => void;
  updateStakeholder: (id: string, updates: Partial<Stakeholder>) => void;
  removeStakeholder: (id: string) => void;
}

export const useStakeholderStore = create<StakeholderState>()(
  persist(
    (set) => ({
      stakeholders: [],
      addStakeholder: (name) => set((state) => ({
        stakeholders: [
          ...state.stakeholders,
          { 
            id: crypto.randomUUID(), 
            name, 
            power: 5, 
            interest: 5, 
            sentiment: 'Neutral', 
            impact: '' 
          }
        ]
      })),
      updateStakeholder: (id, updates) => set((state) => ({
        stakeholders: state.stakeholders.map(s => s.id === id ? { ...s, ...updates } : s)
      })),
      removeStakeholder: (id) => set((state) => ({
        stakeholders: state.stakeholders.filter(s => s.id !== id)
      })),
    }),
    { name: 'stakeholder-storage' }
  )
);