import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Track {
    id: string;
    title: string;
    artist: string;
    url: string;
    cover?: string;
    duration?: number;
}

interface LibraryState {
    likedTracks: Track[];
    toggleLikeTrack: (track: Track) => void;
    isLiked: (id: string) => boolean;

    // Future: playlists, artists, etc.
}

export const useLibraryStore = create<LibraryState>()(
    persist(
        (set, get) => ({
            likedTracks: [],

            toggleLikeTrack: (track) => set((state) => {
                const exists = state.likedTracks.some(t => t.id === track.id);
                if (exists) {
                    return { likedTracks: state.likedTracks.filter(t => t.id !== track.id) };
                } else {
                    return { likedTracks: [...state.likedTracks, track] };
                }
            }),

            isLiked: (id) => get().likedTracks.some(t => t.id === id),
        }),
        {
            name: 'vibenest-library-storage',
        }
    )
);
