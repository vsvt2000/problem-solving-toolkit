import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FinanceState {
  capitalExpenditure: number;
  operatingExpenses: number;
  projectedAnnualSavings: number;
  paybackPeriodMonths: number;
  updateFinance: (updates: Partial<FinanceState>) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      capitalExpenditure: 0,
      operatingExpenses: 0,
      projectedAnnualSavings: 0,
      paybackPeriodMonths: 0,
      updateFinance: (updates) => set((state) => ({ ...state, ...updates })),
    }),
    { name: 'finance-storage' }
  )
);