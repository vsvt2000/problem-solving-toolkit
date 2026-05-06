import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface ArchComponent {
  id: string;
  layer: 'Interface' | 'Logic/AI' | 'Data/Infrastructure';
  description: string;
  inputSource: string;
  outputDestination: string;
}

interface ArchitectureState {
  components: ArchComponent[];
  addComponent: (layer: ArchComponent['layer']) => void;
  updateComponent: (id: string, updates: Partial<ArchComponent>) => void;
  removeComponent: (id: string) => void;
}

export const useArchitectureStore = create<ArchitectureState>()(
  persist(
    (set) => ({
      components: [],
      addComponent: (layer) => set((state) => ({
        components: [
          ...state.components,
          { id: uuidv4(), layer, description: '', inputSource: '', outputDestination: '' }
        ]
      })),
      updateComponent: (id, updates) => set((state) => ({
        components: state.components.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      removeComponent: (id) => set((state) => ({
        components: state.components.filter(c => c.id !== id)
      })),
    }),
    { name: 'architecture-storage' }
  )
);