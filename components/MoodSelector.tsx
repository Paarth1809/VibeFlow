"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

import axios from "axios";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { toast } from "sonner";

interface MoodCardProps {
  mood: string;
  emoji: string;
  gradient: string;
  description: string;
  delay?: number;
}

const MoodCard = ({ mood, emoji, gradient, description, delay = 0 }: MoodCardProps) => {
  const { playTrack } = usePlayerStore();

  const handlePlayMood = async () => {
    try {
      toast.info(`Loading ${mood} mix...`);
      const { data } = await axios.get(`/api/music/pixabay?q=${mood}&category=music`);
      const hits = data.hits;

      if (hits && hits.length > 0) {
        // Play a random track from the hits
        const randomTrack = hits[Math.floor(Math.random() * hits.length)];
        playTrack({
          id: randomTrack.id,
          title: `${mood} Mix`,
          artist: randomTrack.user,
          audioSrc: randomTrack.url || randomTrack.preview || "",
          image: randomTrack.userImageURL || null
        });
        toast.success(`Playing ${mood} vibes`);
      } else {
        toast.error(`No tracks found for ${mood}`);
      }
    } catch (error) {
      console.error("Failed to fetch mood mix:", error);
      toast.error("Failed to load mix");
    }
  };

  return (
    <div
      className={cn(
        "mood-card group animate-fade-in-up border border-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/5",
        gradient
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={handlePlayMood}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="relative z-10 p-2">
        <span className="text-5xl mb-4 block group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ease-out filter drop-shadow-lg">
          {emoji}
        </span>
        <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{mood}</h3>
        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{description}</p>
      </div>
    </div>
  );
};

export const MoodSelector = () => {
  const moods = [
    { mood: "Focus", emoji: "🎯", gradient: "bg-gradient-to-br from-blue-500/40 to-cyan-600/40", description: "Deep work mode" },
    { mood: "Chill", emoji: "😌", gradient: "bg-gradient-to-br from-green-500/40 to-emerald-600/40", description: "Relaxed vibes" },
    { mood: "Energize", emoji: "⚡", gradient: "bg-gradient-to-br from-orange-500/40 to-red-600/40", description: "Power up" },
    { mood: "Sleep", emoji: "🌙", gradient: "bg-gradient-to-br from-purple-500/40 to-indigo-600/40", description: "Drift away" },
    { mood: "Creative", emoji: "🎨", gradient: "bg-gradient-to-br from-pink-500/40 to-rose-600/40", description: "Unleash ideas" },
  ];

  return (
    <section className="px-6 pt-6 pb-2">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="font-display text-xl font-bold text-foreground">How are you feeling?</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {moods.map((mood, index) => (
          <MoodCard key={mood.mood} {...mood} delay={index * 100} />
        ))}
      </div>
    </section>
  );
};

