import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MoodType = 'chill' | 'energetic' | 'focus' | 'melancholy' | 'nature' | 'party' | 'sleep' | 'romantic';

interface MoodState {
    currentMood: MoodType | null;
    setMood: (mood: MoodType | null) => void;
    getAccentColor: () => string;
}

const moodColors: Record<MoodType, string> = {
    chill: '#c4ff00',      // Neon/Lime
    energetic: '#ff0055',  // Hot Pink
    focus: '#00ffff',      // Cyan
    melancholy: '#8a2be2', // Violet
    nature: '#22c55e',     // Green
    party: '#f59e0b',      // Amber
    sleep: '#6366f1',      // Indigo
    romantic: '#e11d48',   // Rose
};

export const useMoodStore = create<MoodState>()(
    persist(
        (set, get) => ({
            currentMood: null,
            setMood: (mood) => set({ currentMood: mood }),
            getAccentColor: () => {
                const { currentMood } = get();
                return currentMood ? moodColors[currentMood] : '#c4ff00';
            },
        }),
        {
            name: 'vibenest-mood-storage'
        }
    )
);
