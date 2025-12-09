"use client";

import { useImages } from "@/hooks/useImages";
import { useMusic } from "@/hooks/useMusic";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { ImageIcon, Play, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const VisualDiscovery = () => {
    const [selectedCategory, setSelectedCategory] = useState("music");
    const { data: images, isLoading } = useImages(selectedCategory);
    const { data: music } = useMusic(selectedCategory);
    const { playTrack } = usePlayerStore();

    const categories = [
        { name: "Music", query: "music", icon: "🎵" },
        { name: "Nature", query: "nature", icon: "🌿" },
        { name: "Vibes", query: "aesthetic", icon: "✨" },
        { name: "Art", query: "art", icon: "🎨" },
    ];

    const handleImageClick = (image: any) => {
        if (music && music.length > 0) {
            const randomTrack = music[Math.floor(Math.random() * music.length)];
            playTrack({
                id: randomTrack.id,
                title: randomTrack.tags?.split(',')[0] || "Track",
                artist: randomTrack.user,
                audioSrc: randomTrack.url || randomTrack.preview || "",
                image: image.webformatURL || randomTrack.userImageURL
            });
            toast.success(`Playing ${selectedCategory} vibes`);
        }
    };

    return (
        <section className="px-6 md:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Visual Discovery</h2>
                </div>
                <div className="flex gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.query)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                selectedCategory === cat.query
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                            )}
                        >
                            <span className="mr-1">{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {images?.slice(0, 12).map((image: any) => (
                    <div
                        key={image.id}
                        className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => handleImageClick(image)}
                    >
                        <img
                            src={image.webformatURL}
                            alt={image.tags}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-8 h-8 text-white fill-current" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
