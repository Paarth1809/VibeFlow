import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SoundLayer {
    id: string; // freesound id
    name: string;
    url: string; // preview url
    volume: number; // 0-1
    isPlaying: boolean;
}

interface MixerState {
    layers: SoundLayer[];
    savedMixes: { name: string; layers: SoundLayer[] }[];

    addLayer: (sound: Partial<SoundLayer>) => void;
    removeLayer: (id: string) => void;
    updateLayerVolume: (id: string, volume: number) => void;
    toggleLayerPlay: (id: string) => void;
    saveMix: (name: string) => void;
    loadMix: (mix: { layers: SoundLayer[] }) => void;
    resetMix: () => void;
}

export const useMixerStore = create<MixerState>()(
    persist(
        (set, get) => ({
            layers: [],
            savedMixes: [],

            addLayer: (sound) => set((state) => {
                if (state.layers.some(l => l.id === sound.id)) return state;
                return {
                    layers: [...state.layers, {
                        id: sound.id!,
                        name: sound.name!,
                        url: sound.url!,
                        volume: 0.5,
                        isPlaying: true
                    }]
                };
            }),

            removeLayer: (id) => set((state) => ({
                layers: state.layers.filter(l => l.id !== id)
            })),

            updateLayerVolume: (id, volume) => set((state) => ({
                layers: state.layers.map(l => l.id === id ? { ...l, volume } : l)
            })),

            toggleLayerPlay: (id) => set((state) => ({
                layers: state.layers.map(l => l.id === id ? { ...l, isPlaying: !l.isPlaying } : l)
            })),

            saveMix: (name) => set((state) => ({
                savedMixes: [...state.savedMixes, { name, layers: state.layers }]
            })),

            loadMix: (mix) => set({ layers: mix.layers }),

            resetMix: () => set({ layers: [] }),
        }),
        {
            name: 'vibenest-mixer-storage',
        }
    )
);
