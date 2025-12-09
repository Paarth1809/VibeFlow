"use client";
import { Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useMusic } from "@/hooks/useMusic";
import { usePlayerStore } from "@/hooks/usePlayerStore";

export const HeroBanner = () => {
  const { data: trendingMusic } = useMusic("trending");
  const { playTrack } = usePlayerStore();

  const handleStartListening = () => {
    if (trendingMusic && trendingMusic.length > 0) {
      const track = trendingMusic[0];
      playTrack({
        id: track.id,
        title: track.tags?.split(',')[0] || "Trending Track",
        artist: track.user,
        audioSrc: track.url || track.preview || "",
        image: track.userImageURL || null
      });
    }
  };

  return (
    <section className="relative overflow-hidden px-6 py-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 p-8 md:p-12">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">New Release</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Discover Your <br />
              <span className="text-gradient">Perfect Vibe</span>
            </h1>

            <p className="text-muted-foreground max-w-md mb-6 text-sm md:text-base">
              Music, podcasts, audiobooks, and calm sounds — all in one place.
              Create moodboards and find your flow.
            </p>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <Button
                onClick={handleStartListening}
                className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-lg shadow-primary/30"
              >
                <Play className="w-5 h-5 fill-current" />
                Start Listening
              </Button>
              <Button variant="outline" className="h-12 px-6 rounded-full border-foreground/20 text-foreground hover:bg-foreground/10">
                Explore
              </Button>
            </div>
          </div>

          {/* Floating cards visualization */}
          <div className="relative w-64 h-64 shrink-0 hidden lg:block">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl animate-float" />
            <div className="absolute top-8 left-12 w-40 h-40 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-2xl animate-float" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-16 left-24 w-40 h-40 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-700 shadow-2xl animate-float" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

