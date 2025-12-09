"use client";

import { useMusic } from "@/hooks/useMusic";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { Play, Pause, Loader2 } from "lucide-react";

export default function MusicPage() {
  const { data: trendingMusic, isLoading } = useMusic("trending");
  const { playTrack, currentTrack, isPlaying, setIsPlaying } = usePlayerStore();

  const handlePlay = (track: any) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
      return;
    }

    playTrack({
      id: track.id,
      title: track.tags?.split(',')[0] || "Trending Track",
      artist: track.user,
      audioSrc: track.url || track.preview || "",
      image: track.userImageURL || null
    });
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex items-center gap-3 mb-8 animate-fade-in">
        <div className="p-3 rounded-full bg-primary/10">
          <Play className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Music Library
          </h1>
          <p className="text-muted-foreground mt-1">Explore unlimited music</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingMusic?.map((track: any) => (
            <div
              key={track.id}
              className="group relative bg-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handlePlay(track)}
            >
              <div className="aspect-square relative bg-secondary">
                {track.userImageURL && (
                  <img src={track.userImageURL} alt={track.tags} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                    {currentTrack?.id === track.id && isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground truncate">{track.tags?.split(',')[0]}</h3>
                <p className="text-sm text-muted-foreground truncate">{track.user}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
