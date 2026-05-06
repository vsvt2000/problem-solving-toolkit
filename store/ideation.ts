import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface Solution {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  feasibility: 'High' | 'Medium' | 'Low';
  aiType: 'Predictive' | 'Generative' | 'Automation';
  isPrioritized: boolean;
}

interface IdeationState {
  solutions: Solution[];
  addSolution: () => void;
  updateSolution: (id: string, updates: Partial<Solution>) => void;
  removeSolution: (id: string) => void;
}

export const useIdeationStore = create<IdeationState>()(
  persist(
    (set) => ({
      solutions: [],
      addSolution: () => set((state) => ({
        solutions: [
          ...state.solutions,
          { 
            id: uuidv4(), 
            title: '', 
            description: '', 
            impact: 'Medium', 
            feasibility: 'Medium', 
            aiType: 'Automation',
            isPrioritized: false 
          }
        ]
      })),
      updateSolution: (id, updates) => set((state) => ({
        solutions: state.solutions.map(s => s.id === id ? { ...s, ...updates } : s)
      })),
      removeSolution: (id) => set((state) => ({
        solutions: state.solutions.filter(s => s.id !== id)
      })),
    }),
    { name: 'ideation-storage' }
  )
);