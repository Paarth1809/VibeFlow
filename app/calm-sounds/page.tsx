"use client";

import { useSounds } from "@/hooks/useSounds";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { Play, Pause, Loader2, Cloud } from "lucide-react";

export default function CalmSoundsPage() {
    const { data: sounds, isLoading } = useSounds("nature rain");
    const { playTrack, currentTrack, isPlaying, setIsPlaying } = usePlayerStore();

    const handlePlay = (sound: any) => {
        if (currentTrack?.id === sound.id) {
            setIsPlaying(!isPlaying);
            return;
        }

        playTrack({
            id: sound.id,
            title: sound.name,
            artist: sound.username || "Nature",
            audioSrc: sound.url,
            image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" // Generic nature image
        });
    };

    return (
        <div className="p-8 pb-32">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="p-3 rounded-full bg-primary/10">
                    <Cloud className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                        Calm Sounds
                    </h1>
                    <p className="text-muted-foreground mt-1">Relax, focus, or sleep with ambient sounds</p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {sounds?.map((sound: any) => (
                        <div
                            key={sound.id}
                            className="group relative bg-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer border border-border/50"
                            onClick={() => handlePlay(sound)}
                        >
                            <div className="aspect-square relative bg-gradient-to-br from-teal-800 to-emerald-900 flex items-center justify-center">
                                <Cloud className="w-16 h-16 text-white/20" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                                        {currentTrack?.id === sound.id && isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-foreground truncate">{sound.name}</h3>
                                <p className="text-sm text-muted-foreground truncate">{sound.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
