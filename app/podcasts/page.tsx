"use client";

import { usePodcasts } from "@/hooks/usePodcasts";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { Play, Pause, Loader2, Mic2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner"; // Assuming sonner is installed as 'sonner' or use generic toast

export default function PodcastsPage() {
    const { data: podcasts, isLoading } = usePodcasts("trending");
    const { playTrack, currentTrack, isPlaying, setIsPlaying } = usePlayerStore();

    const handlePlay = async (podcast: any) => {
        // Podcasts from iTunes only have a feedUrl. We need to parse the RSS or simple play the latest episode if possible.
        // But typically we can't play an RSS feed directly in <audio>.
        // For this "VibeNest" demo, I will try to fetch the RSS feed to get the first audio file.
        // Or I will rely on the "Discover" API if it returns direct audio.
        // Actually, iTunes search sometimes returns `episodeUrl` if searching for episodes.
        // Let's assume for now we might need a better player logic for podcasts, but I will try to play a "demo" or show a "Not supported" toast if no direct file.

        toast.message("Fetching latest episode...");

        try {
            const feedRes = await axios.get(`/api/podcasts/feed?url=${encodeURIComponent(podcast.feedUrl)}`);
            if (feedRes.data && feedRes.data.audio) {
                playTrack({
                    id: podcast.collectionId.toString(),
                    title: feedRes.data.title || podcast.collectionName,
                    artist: podcast.artistName,
                    audioSrc: feedRes.data.audio,
                    image: podcast.artworkUrl600
                });
            } else {
                toast.error("No playable episode found.");
            }
        } catch (e) {
            toast.error("Could not load podcast feed.");
        }
    };

    return (
        <div className="p-8 pb-32">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="p-3 rounded-full bg-primary/10">
                    <Mic2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                        Podcasts
                    </h1>
                    <p className="text-muted-foreground mt-1">Listen to the world's best conversations</p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {podcasts?.map((podcast: any) => (
                        <div
                            key={podcast.collectionId}
                            className="group relative bg-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={() => handlePlay(podcast)}
                        >
                            <div className="aspect-square relative bg-secondary">
                                <img src={podcast.artworkUrl600} alt={podcast.collectionName} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                                        <Play className="w-5 h-5 fill-current ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-foreground truncate">{podcast.collectionName}</h3>
                                <p className="text-sm text-muted-foreground truncate">{podcast.artistName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
