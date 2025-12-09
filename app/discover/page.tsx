"use client";

import { useMusic } from "@/hooks/useMusic";
import { usePodcasts } from "@/hooks/usePodcasts";
import { useImages } from "@/hooks/useImages";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { Search, Loader2, Play, Mic2, Music2, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function DiscoverPage() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<"music" | "podcasts" | "visuals">("music");

    const { data: music, isLoading: musicLoading } = useMusic(search || "discover");
    const { data: podcasts, isLoading: podcastsLoading } = usePodcasts(search || "trending");
    const { data: images, isLoading: imagesLoading } = useImages(search || "music");
    const { playTrack } = usePlayerStore();

    const handleMusicPlay = (track: any) => {
        playTrack({
            id: track.id,
            title: track.tags?.split(',')[0] || "Track",
            artist: track.user,
            audioSrc: track.url || track.preview || "",
            image: track.userImageURL
        });
    };

    const handleImageClick = (image: any) => {
        if (music && music.length > 0) {
            const randomTrack = music[Math.floor(Math.random() * music.length)];
            playTrack({
                id: randomTrack.id,
                title: randomTrack.tags?.split(',')[0] || "Track",
                artist: randomTrack.user,
                audioSrc: randomTrack.url || randomTrack.preview || "",
                image: image.webformatURL
            });
            toast.success("Playing visual vibe");
        }
    };

    const tabs = [
        { id: "music" as const, label: "Music", icon: Music2 },
        { id: "podcasts" as const, label: "Podcasts", icon: Mic2 },
        { id: "visuals" as const, label: "Visuals", icon: ImageIcon },
    ];

    return (
        <div className="p-8 pb-32">
            {/* Header */}
            <div className="mb-8 animate-fade-in">
                <h1 className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 mb-2">
                    Discover
                </h1>
                <p className="text-muted-foreground text-lg">Where visuals meet sound</p>
            </div>

            {/* Search */}
            <div className="relative max-w-2xl mb-8">
                <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search for music, podcasts, or vibes..."
                    className="pl-12 bg-card border-border focus-visible:ring-2 focus-visible:ring-primary/50 text-base py-7 rounded-2xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-border">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 font-medium transition-all relative",
                                activeTab === tab.id
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            {activeTab === "music" && (
                musicLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {music?.map((track: any) => (
                            <div
                                key={track.id}
                                className="group relative bg-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => handleMusicPlay(track)}
                            >
                                <div className="aspect-square relative bg-gradient-to-br from-violet-600 to-indigo-900">
                                    {track.userImageURL && (
                                        <img src={track.userImageURL} alt={track.tags} className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Play className="w-12 h-12 text-white fill-current" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold truncate">{track.tags?.split(',')[0]}</h3>
                                    <p className="text-sm text-muted-foreground truncate">{track.user}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            {activeTab === "podcasts" && (
                podcastsLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {podcasts?.map((podcast: any) => (
                            <div
                                key={podcast.collectionId}
                                className="group relative bg-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                            >
                                <div className="aspect-square relative">
                                    <img src={podcast.artworkUrl600} alt={podcast.collectionName} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Play className="w-12 h-12 text-white fill-current" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold truncate">{podcast.collectionName}</h3>
                                    <p className="text-sm text-muted-foreground truncate">{podcast.artistName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            {activeTab === "visuals" && (
                imagesLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                        {images?.map((image: any) => (
                            <div
                                key={image.id}
                                className="group relative break-inside-avoid mb-4 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                                onClick={() => handleImageClick(image)}
                            >
                                <img src={image.webformatURL} alt={image.tags} className="w-full h-auto" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Play className="w-12 h-12 text-white fill-current" />
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}
