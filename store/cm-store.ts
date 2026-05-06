import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface CMAction {
  id: string;
  pillar: 'Communication' | 'Education' | 'Incentive';
  task: string;
  owner: string;
  timeline: string;
  status: 'Planned' | 'In-Progress' | 'Complete';
}

interface CMState {
  actions: CMAction[];
  addAction: (pillar: CMAction['pillar']) => void;
  updateAction: (id: string, updates: Partial<CMAction>) => void;
  removeAction: (id: string) => void;
}

export const useCMStore = create<CMState>()(
  persist(
    (set) => ({
      actions: [],
      addAction: (pillar) => set((state) => ({
        actions: [
          ...state.actions,
          { id: uuidv4(), pillar, task: '', owner: '', timeline: '', status: 'Planned' }
        ]
      })),
      updateAction: (id, updates) => set((state) => ({
        actions: state.actions.map(a => (a.id === id ? { ...a, ...updates } : a))
      })),
      removeAction: (id) => set((state) => ({
        actions: state.actions.filter(a => a.id !== id)
      })),
    }),
    { name: 'cm-designer-storage' }
  )
);