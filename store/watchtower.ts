import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GovernanceAlert {
  id: string;
  timestamp: string;
  severity: 'Critical' | 'Warning' | 'Info';
  category: 'Data Integrity' | 'Model Bias' | 'Human Bypass';
  message: string;
  status: 'Active' | 'Mitigated';
}

interface WatchtowerState {
  alerts: GovernanceAlert[];
  isSystemHealthy: boolean;
  addAlert: (alert: Omit<GovernanceAlert, 'id' | 'timestamp' | 'status'>) => void;
  mitigateAlert: (id: string) => void;
  checkSystemIntegrity: (vsmEfficiency: number, dataHealth: number) => void;
}

export const useWatchtowerStore = create<WatchtowerState>()(
  persist(
    (set) => ({
      alerts: [],
      isSystemHealthy: true,
      addAlert: (alert) => set((state) => ({
        alerts: [
          { ...alert, id: crypto.randomUUID(), timestamp: new Date().toISOString(), status: 'Active' },
          ...state.alerts
        ],
        isSystemHealthy: alert.severity === 'Critical' ? false : state.isSystemHealthy
      })),
      mitigateAlert: (id) => set((state) => ({
        alerts: state.alerts.map(a => a.id === id ? { ...a, status: 'Mitigated' } : a),
        isSystemHealthy: !state.alerts.some(a => a.id !== id && a.status === 'Active' && a.severity === 'Critical')
      })),
      checkSystemIntegrity: (vsmEfficiency, dataHealth) => {
        if (vsmEfficiency < 5 || dataHealth < 70) {
          set({ isSystemHealthy: false });
        }
      }
    }),
    { name: 'watchtower-storage' }
  )
);