import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PipelineMetric {
  id: string;
  pipelineName: string;
  latencyMs: number;
  throughput: number; // records per second
  driftScore: number;  // 0-1 (Schema/Data drift)
  lastUpdate: string;
}

interface SentryState {
  metrics: PipelineMetric[];
  updateMetric: (name: string, data: Partial<PipelineMetric>) => void;
  getGlobalHealth: () => 'Healthy' | 'Warning' | 'Critical';
}

export const useSentryStore = create<SentryState>()(
  persist(
    (set, get) => ({
      metrics: [],
      updateMetric: (name, data) => set((state) => {
        const exists = state.metrics.find(m => m.pipelineName === name);
        if (exists) {
          return {
            metrics: state.metrics.map(m => 
              m.pipelineName === name ? { ...m, ...data, lastUpdate: new Date().toISOString() } : m
            )
          };
        }
        return {
          metrics: [...state.metrics, { 
            id: crypto.randomUUID(), 
            pipelineName: name, 
            latencyMs: 0, 
            throughput: 0, 
            driftScore: 0, 
            lastUpdate: new Date().toISOString(),
            ...data 
          }]
        };
      }),
      getGlobalHealth: () => {
        const { metrics } = get();
        if (metrics.some(m => m.driftScore > 0.4 || m.latencyMs > 5000)) return 'Critical';
        if (metrics.some(m => m.driftScore > 0.2)) return 'Warning';
        return 'Healthy';
      }
    }),
    { name: 'pipeline-sentry-storage' }
  )
);