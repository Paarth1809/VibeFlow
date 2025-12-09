"use client";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import axios from 'axios';
import { toast } from "sonner"; // Assuming sonner is available via top level export, or from deps

interface QuickMixCardProps {
  title: string;
  gradient: string;
  icon: string;
  delay?: number;
  query: string;
}

const QuickMixCard = ({ title, gradient, icon, delay = 0, query }: QuickMixCardProps) => {
  const { playTrack } = usePlayerStore();

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { data } = await axios.get(`/api/music/pixabay?q=${query}&per_page=3`);
      if (data.hits && data.hits.length > 0) {
        // Select a random track from hits
        const track = data.hits[Math.floor(Math.random() * data.hits.length)];
        // Pixabay video object to Track
        playTrack({
          id: track.id,
          title: query + " Mix",
          artist: track.user || "Pixabay Artist",
          audioSrc: track.videos?.medium?.url || track.videos?.tiny?.url, // Using video url as audio, browsers handle it
          image: track.userImageURL || track.videos?.medium?.thumbnail,
        });
        toast.success(`Playing ${query} mix`);
      } else {
        toast.error("No tracks found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load music");
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300 cursor-pointer group animate-fade-in"
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={handlePlay}
    >
      <div className={cn(
        "w-12 h-12 rounded-md flex items-center justify-center text-xl shrink-0",
        gradient
      )}>
        {icon}
      </div>
      <span className="font-medium text-foreground text-sm truncate flex-1">{title}</span>
      <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 shadow-lg">
        <Play className="w-4 h-4 text-primary-foreground fill-current ml-0.5" />
      </button>
    </div>
  )
};

export const QuickMixRow = () => {
  const quickMixes = [
    { title: "Daily Mix 1", query: "pop", gradient: "bg-gradient-to-br from-purple-500 to-purple-700", icon: "🎵" },
    { title: "Chill Vibes", query: "chill", gradient: "bg-gradient-to-br from-green-500 to-green-700", icon: "🌿" },
    { title: "Focus Mode", query: "focus", gradient: "bg-gradient-to-br from-blue-500 to-blue-700", icon: "🎯" },
    { title: "Sleep Sounds", query: "sleep", gradient: "bg-gradient-to-br from-indigo-500 to-indigo-700", icon: "🌙" },
    { title: "Workout Energy", query: "workout", gradient: "bg-gradient-to-br from-orange-500 to-orange-700", icon: "🔥" },
    { title: "Podcast Picks", query: "podcast", gradient: "bg-gradient-to-br from-rose-500 to-rose-700", icon: "🎙️" },
  ];

  return (
    <section className="px-6 py-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {quickMixes.map((mix, index) => (
          <QuickMixCard key={mix.title} {...mix} delay={index * 50} />
        ))}
      </div>
    </section>
  );
};
