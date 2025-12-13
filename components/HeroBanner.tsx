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
    <section className="relative overflow-hidden">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 md:p-10 border border-white/5 shadow-2xl shadow-black/40">
        {/* Background decorations - Softer & Cleaner */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground/90">New Vibe Release</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-[1.1] tracking-tight">
              Discover Your <br />
              <span className="text-gradient drop-shadow-sm">Perfect Vibe</span>
            </h1>

            <p className="text-muted-foreground max-w-xl mb-8 text-base md:text-lg font-light leading-relaxed">
              Ambient sounds, curated podcasts, and calming music — all in one place.
              Create moodboards and find your flow state.
            </p>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <Button
                onClick={handleStartListening}
                className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                Start Listening
              </Button>
              <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-white/5 text-foreground hover:bg-white/10 hover:border-white/20 transition-all font-medium">
                Explore
              </Button>
            </div>
          </div>

          {/* Floating cards visualization */}
          <div className="relative w-72 h-72 shrink-0 hidden lg:block">
            <div className="absolute top-0 left-0 w-44 h-44 rounded-3xl bg-gradient-to-br from-violet-500/20 to-purple-700/20 backdrop-blur-xl border border-white/10 shadow-2xl animate-float" />
            <div className="absolute top-8 left-12 w-44 h-44 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-700/20 backdrop-blur-xl border border-white/10 shadow-2xl animate-float" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-16 left-24 w-44 h-44 rounded-3xl bg-gradient-to-br from-orange-500/20 to-rose-700/20 backdrop-blur-xl border border-white/10 shadow-2xl animate-float" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

