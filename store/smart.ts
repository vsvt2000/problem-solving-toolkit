import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ToolkitState {
  goals: { id: string; text: string; aiFeedback: string }[];
  updateGoalText: (id: string, text: string) => void;
  addGoal: () => void;
  setAiFeedback: (id: string, feedback: string) => void;
  removeGoal: (id: string) => void;

}

export const useToolkitStore = create<ToolkitState>()(
  persist(
    (set) => ({
      goals: [{ id: '1', text: "By [Date], [Department] will [Action] from [Baseline] to [Target] using AI to [AI Role].", aiFeedback: '' }],
      updateGoalText: (id, text) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, text } : g)
      })),
      addGoal: () => set((state) => ({
        goals: [...state.goals, { id: crypto.randomUUID(), text: "By [Date], ...", aiFeedback: '' }]
      })),
      setAiFeedback: (id, feedback) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, aiFeedback: feedback } : g)
      })),
      removeGoal: (id) => set((state) => ({
        goals: state.goals.filter(row => row.id !== id)
     })),
    }),
    { name: 'light-toolkit-storage' }
  )
);