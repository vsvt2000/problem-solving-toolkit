import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface SentimentData {
  id: string;
  stakeholderRole: string;
  rawTranscript: string;
  primarySentiment: 'Positive' | 'Neutral' | 'Resistant' | 'Anxious';
  hiddenFears: string[];
  aiAnalysis: string;
}

interface SentimentState {
  sentiments: SentimentData[];
  addSentimentEntry: () => void;
  updateSentimentEntry: (id: string, updates: Partial<SentimentData>) => void;
  removeSentimentEntry: (id: string) => void;
}

export const useSentimentStore = create<SentimentState>()(
  persist(
    (set) => ({
      sentiments: [],
      addSentimentEntry: () => set((state) => ({
        sentiments: [
          ...state.sentiments,
          { 
            id: uuidv4(), 
            stakeholderRole: '', 
            rawTranscript: '', 
            primarySentiment: 'Neutral', 
            hiddenFears: [], 
            aiAnalysis: '' 
          }
        ]
      })),
      updateSentimentEntry: (id, updates) => set((state) => ({
        sentiments: state.sentiments.map(s => s.id === id ? { ...s, ...updates } : s)
      })),
      removeSentimentEntry: (id) => set((state) => ({
        sentiments: state.sentiments.filter(s => s.id !== id)
      })),
    }),
    { name: 'sentiment-storage' }
  )
);