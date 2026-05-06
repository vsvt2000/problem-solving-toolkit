import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdkarProfile {
  groupId: string;
  groupName: string;
  awareness: number; // 1-5
  desire: number;
  knowledge: number;
  ability: number;
  reinforcement: number;
}

interface AdkarState {
  profiles: AdkarProfile[];
  addProfile: (name: string) => void;
  updateScore: (id: string, stage: keyof Omit<AdkarProfile, 'groupId' | 'groupName'>, score: number) => void;
  getBarrierPoint: (id: string) => string | null;
}

export const useAdkarStore = create<AdkarState>()(
  persist(
    (set, get) => ({
      profiles: [],
      addProfile: (name) => set((state) => ({
        profiles: [...state.profiles, { 
          groupId: crypto.randomUUID(), 
          groupName: name, 
          awareness: 1, desire: 1, knowledge: 1, ability: 1, reinforcement: 1 
        }]
      })),
      updateScore: (id, stage, score) => set((state) => ({
        profiles: state.profiles.map(p => p.groupId === id ? { ...p, [stage]: score } : p)
      })),
      getBarrierPoint: (id) => {
        const p = get().profiles.find(profile => profile.groupId === id);
        if (!p) return null;
        // The first score <= 3 is the "Barrier Point"
        if (p.awareness <= 3) return 'Awareness';
        if (p.desire <= 3) return 'Desire';
        if (p.knowledge <= 3) return 'Knowledge';
        if (p.ability <= 3) return 'Ability';
        if (p.reinforcement <= 3) return 'Reinforcement';
        return 'Clear';
      }
    }),
    { name: 'adkar-storage' }
  )
);