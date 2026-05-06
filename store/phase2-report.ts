import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReportState {
  systemicDiagnosis: string;
  confidenceScore: number; // 0-100
  readinessLevel: 'Green' | 'Amber' | 'Red';
  isFinalized: boolean;
  updateReport: (updates: Partial<ReportState>) => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      systemicDiagnosis: '',
      confidenceScore: 0,
      readinessLevel: 'Amber',
      isFinalized: false,
      updateReport: (updates) => set((state) => ({ ...state, ...updates })),
    }),
    { name: 'report-storage' }
  )
);