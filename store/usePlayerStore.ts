import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Track {
    id: string;
    title: string;
    artist: string;
    url: string; // audio source
    cover: string; // album art or thumbnail
    duration: number; // in seconds
}

interface PlayerState {
    isPlaying: boolean;
    currentTrack: Track | null;
    queue: Track[];
    volume: number; // 0-100
    progress: number; // 0-100 (or seconds)

    // Actions
    play: (track: Track) => void;
    pause: () => void;
    togglePlay: () => void;
    setVolume: (vol: number) => void;
    next: () => void;
    prev: () => void;
    addToQueue: (track: Track) => void;
    setQueue: (tracks: Track[]) => void;
}

export const usePlayerStore = create<PlayerState>()(
    persist(
        (set, get) => ({
            isPlaying: false,
            currentTrack: null,
            queue: [],
            volume: 80,
            progress: 0,

            play: (track) => set({ currentTrack: track, isPlaying: true }),
            pause: () => set({ isPlaying: false }),
            togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
            setVolume: (volume) => set({ volume }),

            next: () => {
                const { queue, currentTrack } = get();
                if (!currentTrack || queue.length === 0) return;
                const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
                const nextTrack = queue[currentIndex + 1] || queue[0]; // Loop
                set({ currentTrack: nextTrack, isPlaying: true });
            },

            prev: () => {
                const { queue, currentTrack } = get();
                if (!currentTrack || queue.length === 0) return;
                const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
                const prevTrack = queue[currentIndex - 1] || queue[queue.length - 1]; // Loop
                set({ currentTrack: prevTrack, isPlaying: true });
            },

            addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
            setQueue: (queue) => set({ queue }),
        }),
        {
            name: 'vibenest-player-storage',
            partialize: (state) => ({
                // Only persist these fields
                volume: state.volume,
                queue: state.queue,
                currentTrack: state.currentTrack
                // We don't persist isPlaying (start paused) or progress (reset)
            }),
        }
    )
);
