import { create } from 'zustand';

export interface Track {
    id: string | number;
    title: string;
    artist: string;
    audioSrc: string;
    image?: string;
    duration?: number;
}

interface PlayerStore {
    isPlaying: boolean;
    currentTrack: Track | null;
    volume: number;
    setVolume: (volume: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    playTrack: (track: Track) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    isPlaying: false,
    currentTrack: null,
    volume: 75,
    setVolume: (volume) => set({ volume }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
}));
