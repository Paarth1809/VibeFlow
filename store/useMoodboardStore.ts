import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MoodImage {
    id: string;
    url: string; // Full size or large
    thumbnail: string; // Small size for grid
    source: 'unsplash' | 'pexels' | 'pixabay';
    author: string;
    authorUrl?: string;
    width?: number;
    height?: number;
    alt?: string;
}

interface MoodboardState {
    board: MoodImage[];
    addToBoard: (image: MoodImage) => void;
    removeFromBoard: (id: string) => void;
    reorderBoard: (newOrder: MoodImage[]) => void;
    clearBoard: () => void;
}

export const useMoodboardStore = create<MoodboardState>()(
    persist(
        (set) => ({
            board: [],
            addToBoard: (image) => set((state) => {
                // Prevent duplicates
                if (state.board.some((img) => img.id === image.id)) return state;
                return { board: [...state.board, image] };
            }),
            removeFromBoard: (id) => set((state) => ({
                board: state.board.filter((img) => img.id !== id)
            })),
            reorderBoard: (newOrder) => set({ board: newOrder }),
            clearBoard: () => set({ board: [] }),
        }),
        {
            name: 'vibenest-moodboard-storage',
        }
    )
);
