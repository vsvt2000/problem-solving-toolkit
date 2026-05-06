/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MatrixPoint {
  id: string;
  title: string;
  x: number; // Feasibility (0-100)
  y: number; // Value/Impact (0-100)
  quadrant: 'Quick Win' | 'Major Project' | 'Fill-in' | 'Strategic Spike';
}

interface MatrixState {
  points: MatrixPoint[];
  syncWithIdeation: (solutions: any[]) => void;
  updatePointPosition: (id: string, x: number, y: number) => void;
}

export const useMatrixStore = create<MatrixState>()(
  persist(
    (set) => ({
      points: [],
      syncWithIdeation: (solutions) => {
        const synced = solutions.map(s => {
          const x = s.feasibility === 'High' ? 80 : s.feasibility === 'Medium' ? 50 : 20;
          const y = s.impact === 'High' ? 80 : s.impact === 'Medium' ? 50 : 20;
          return {
            id: s.id,
            title: s.title,
            x, y,
            quadrant: y >= 50 ? (x >= 50 ? 'Quick Win' : 'Strategic Spike') : (x >= 50 ? 'Fill-in' : 'Major Project')
          };
        });
        set({ points: synced as unknown as any });
      },
      updatePointPosition: (id, x, y) => set((state) => ({
        points: state.points.map(p => {
          if (p.id !== id) return p;
          const quadrant = y >= 50 ? (x >= 50 ? 'Quick Win' : 'Strategic Spike') : (x >= 50 ? 'Fill-in' : 'Major Project');
          return { ...p, x, y, quadrant };
        })
      }))
    }),
    { name: 'matrix-storage' }
  )
);