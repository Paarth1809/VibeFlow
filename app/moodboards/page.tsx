"use client";

import { useImages } from "@/hooks/useImages";
import { useMusic } from "@/hooks/useMusic";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { ImageIcon, Play, Heart, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Pinterest-style masonry grid with music integration
export default function MoodboardsPage() {
    const [selectedMood, setSelectedMood] = useState("chill");
    const { data: images, isLoading: imagesLoading } = useImages(selectedMood);
    const { data: music, isLoading: musicLoading } = useMusic(selectedMood);
    const { playTrack } = usePlayerStore();

    const moods = [
        { name: "Chill", query: "chill music", color: "from-blue-500 to-cyan-500" },
        { name: "Energetic", query: "energetic workout", color: "from-orange-500 to-red-500" },
        { name: "Focus", query: "focus study", color: "from-indigo-500 to-purple-500" },
        { name: "Nature", query: "nature peaceful", color: "from-emerald-500 to-green-500" },
        { name: "Party", query: "party celebration", color: "from-pink-500 to-rose-500" },
        { name: "Romantic", query: "romantic love", color: "from-red-500 to-pink-500" },
    ];

    const handleImageClick = (image: any) => {
        // When clicking an image, play related music
        if (music && music.length > 0) {
            const randomTrack = music[Math.floor(Math.random() * music.length)];
            playTrack({
                id: randomTrack.id,
                title: randomTrack.tags?.split(',')[0] || "Track",
                artist: randomTrack.user,
                audioSrc: randomTrack.url || randomTrack.preview || "",
                image: image.webformatURL || randomTrack.userImageURL
            });
            toast.success(`Playing ${selectedMood} vibes`);
        }
    };

    return (
        <div className="p-8 pb-32">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 animate-fade-in">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                        <ImageIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                            Moodboards
                        </h1>
                        <p className="text-muted-foreground mt-1">Visual discovery meets sound</p>
                    </div>
                </div>
            </div>

            {/* Mood Filter Pills */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {moods.map((mood) => (
                    <button
                        key={mood.name}
                        onClick={() => setSelectedMood(mood.query)}
                        className={cn(
                            "px-6 py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap",
                            selectedMood === mood.query
                                ? `bg-gradient-to-r ${mood.color} text-white shadow-lg scale-105`
                                : "bg-muted hover:bg-muted/80 text-foreground"
                        )}
                    >
                        {mood.name}
                    </button>
                ))}
            </div>

            {/* Pinterest-style Masonry Grid */}
            {imagesLoading || musicLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                    {images?.map((image: any, index: number) => (
                        <div
                            key={image.id}
                            className="group relative break-inside-avoid mb-4 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                            onClick={() => handleImageClick(image)}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <img
                                src={image.webformatURL}
                                alt={image.tags}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white font-medium text-sm mb-2 line-clamp-2">
                                        {image.tags}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform">
                                            <Play className="w-4 h-4 fill-current ml-0.5" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 transition-transform">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 transition-transform">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
