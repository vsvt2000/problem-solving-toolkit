import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RaciValue = 'R' | 'A' | 'C' | 'I' | '';

interface RaciAssignment {
  id: string;
  task: string;
  assignments: Record<string, RaciValue>; // RoleID -> RACI Value
}

interface RaciState {
  assignments: RaciAssignment[];
  roles: string[]; // e.g., ["Data Scientist", "Process Owner", "Legal"]
  addRole: (role: string) => void;
  addTask: (task: string) => void;
  updateAssignment: (taskId: string, role: string, value: RaciValue) => void;
}

export const useRaciStore = create<RaciState>()(
  persist(
    (set) => ({
      assignments: [],
      roles: ["Process Owner", "Data Engineer", "AI Developer", "Legal/Ethics"],
      addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
      addTask: (task) => set((state) => ({
        assignments: [...state.assignments, { id: crypto.randomUUID(), task, assignments: {} }]
      })),
      updateAssignment: (taskId, role, value) => set((state) => ({
        assignments: state.assignments.map(a => 
          a.id === taskId ? { ...a, assignments: { ...a.assignments, [role]: value } } : a
        )
      })),
    }),
    { name: 'raci-ai-storage' }
  )
);