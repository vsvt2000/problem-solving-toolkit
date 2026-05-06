import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface WorkPackage {
  id: string;
  stage: 'Ingestion' | 'Cleaning' | 'Validation' | 'Stabilization';
  task: string;
  status: 'Backlog' | 'Blocked' | 'In-Testing' | 'Stable';
  dataHealthScore: number; // 0-100
}

interface BuildState {
  packages: WorkPackage[];
  addPackage: (stage: WorkPackage['stage']) => void;
  updatePackage: (id: string, updates: Partial<WorkPackage>) => void;
  removePackage: (id: string) => void;
}

export const useBuildStore = create<BuildState>()(
  persist(
    (set) => ({
      packages: [],
      addPackage: (stage) => set((state) => ({
        packages: [
          ...state.packages,
          { id: uuidv4(), stage, task: '', status: 'Backlog', dataHealthScore: 0 }
        ]
      })),
      updatePackage: (id, updates) => set((state) => ({
        packages: state.packages.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      removePackage: (id) => set((state) => ({
        packages: state.packages.filter(p => p.id !== id)
      })),
    }),
    { name: 'cpmai-build-storage' }
  )
);