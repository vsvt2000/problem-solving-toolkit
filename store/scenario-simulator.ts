/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SimulationResult {
  efficiencyGain: number;
  riskOfFailure: number;
  bottleneckStep: string;
}

interface SimulatorState {
  adoptionRate: number; // 0-100% (Linked to ADKAR)
  dataReliability: number; // 0-100% (Linked to CPMAI)
  processVolume: number;
  results: SimulationResult | null;
  runSimulation: (vsmSteps: any[], diagnosticScores: any) => void;
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set) => ({
      adoptionRate: 80,
      dataReliability: 90,
      processVolume: 1000,
      results: null,
      runSimulation: (vsmSteps, scores) => {
        // Logic: Risk increases if Section D (Buy-in) is low or Data Reliability is low
        const baseRisk = (100 - scores.D * 4) + (100 - scores.E * 4);
        const calculatedRisk = Math.min(95, baseRisk > 0 ? baseRisk : 10);
        
        // Efficiency is throttled by the slowest VSM step and adoption rate
        const avgEfficiency = vsmSteps.length > 0 
          ? (vsmSteps.reduce((acc, s) => acc + (s.valueAddTime / (s.valueAddTime + s.waitTime)), 0) / vsmSteps.length) 
          : 0.5;

        set({
          results: {
            efficiencyGain: avgEfficiency * 100,
            riskOfFailure: calculatedRisk,
            bottleneckStep: vsmSteps.sort((a, b) => b.waitTime - a.waitTime)[0]?.name || "None"
          }
        });
      },
    }),
    { name: 'simulator-storage' }
  )
);