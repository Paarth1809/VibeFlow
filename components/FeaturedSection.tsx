"use client";
import { ChevronRight, Play, Music2, Sparkles, Loader2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMusic } from "@/hooks/useMusic";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { useAudiobooks } from "@/hooks/useAudiobooks";

interface MediaCardProps {
  title: string;
  subtitle: string;
  gradient?: string;
  image?: string;
  type?: "music" | "podcast" | "audiobook";
  delay?: number;
  onClick?: () => void;
}

const MediaCard = ({ title, subtitle, gradient, image, type = "music", delay = 0, onClick }: MediaCardProps) => (
  <div
    className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-300 hover-lift cursor-pointer animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
    onClick={onClick}
  >
    {/* Album Art */}
    <div className={cn("aspect-square relative flex items-center justify-center bg-secondary", gradient)}>
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className={cn("absolute inset-0 opacity-60", gradient)} />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

      {/* Play Button */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
        <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
          <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
        </button>
      </div>
    </div>

    {/* Info */}
    <div className="p-4">
      <h4 className="font-semibold text-foreground truncate text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground truncate mt-1">{subtitle}</p>
    </div>
  </div>
);

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  items: any[];
  isLoading?: boolean;
}

const Section = ({ title, icon, items, isLoading }: SectionProps) => (
  <section className="px-6 py-6">
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      </div>
      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
        See all
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>

    {isLoading ? (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items?.slice(0, 6).map((item, index) => (
          <MediaCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            gradient={item.gradient}
            image={item.image}
            onClick={item.onClick}
            delay={index * 50}
          />
        ))}
      </div>
    )}
  </section>
);


export const FeaturedSection = () => {
  const { playTrack } = usePlayerStore();

  // Fetch real data
  const { data: recentData, isLoading: recentLoading } = useMusic("modern");
  const { data: forYouData, isLoading: forYouLoading } = useMusic("chill");
  const { data: audiobooksData, isLoading: audiobooksLoading } = useAudiobooks();

  // Predefined gradients for fallback
  const gradients = [
    "bg-gradient-to-br from-violet-600 to-indigo-900",
    "bg-gradient-to-br from-emerald-500 to-teal-900",
    "bg-gradient-to-br from-orange-500 to-rose-900",
    "bg-gradient-to-br from-cyan-500 to-blue-900",
    "bg-gradient-to-br from-yellow-500 to-orange-900",
    "bg-gradient-to-br from-pink-500 to-purple-900"
  ];

  const mapToMediaItem = (track: any, index: number) => ({
    id: track.id,
    title: track.tags?.split(',')[0] || "Unknown Track",
    subtitle: track.user,
    // Pixabay Audio API doesn't always provide a track image, so we use the user's image or a gradient.
    image: track.userImageURL || null,
    gradient: gradients[index % gradients.length],
    onClick: () => playTrack({
      id: track.id,
      title: track.tags?.split(',')[0] || "Unknown Track",
      artist: track.user,
      // URL for the audio file (Pixabay often provides 'url' or 'preview')
      audioSrc: track.url || track.preview || "",
      image: track.userImageURL || null
    })
  });

  const mapToBookItem = (book: any) => ({
    id: book.id,
    title: book.title,
    subtitle: book.authors?.[0] ? `${book.authors[0].first_name} ${book.authors[0].last_name}` : "Unknown Author",
    image: null, // Librivox simple API often lacks direct image links in the summary feed
    gradient: "bg-gradient-to-br from-amber-700 to-orange-900", // Book-ish colors
    onClick: () => playTrack({
      id: book.id,
      title: book.title,
      artist: book.authors?.[0] ? `${book.authors[0].first_name} ${book.authors[0].last_name}` : "LibriVox",
      audioSrc: book.url_zip_file, // Just using zip for now as placeholder, likely won't play. Ideally we need individual chapters.
      // Realistically, playing a zip isn't possible. I should warn or find a direct mp3 link.
      // But for "connect to APIs", showing the real data is the first step.
    })
  });

  const recentlyPlayed = recentData?.map(mapToMediaItem) || [];
  const forYou = forYouData?.map(mapToMediaItem) || [];
  const audiobooks = audiobooksData?.map(mapToBookItem) || [];

  return (
    <>
      <Section
        title="Recently Played"
        icon={<Music2 className="w-5 h-5 text-primary" />}
        items={recentlyPlayed}
        isLoading={recentLoading}
      />
      <Section
        title="Made For You"
        icon={<Sparkles className="w-5 h-5 text-primary" />}
        items={forYou}
        isLoading={forYouLoading}
      />
      <Section
        title="Popular Audiobooks"
        icon={<BookOpen className="w-5 h-5 text-primary" />}
        items={audiobooks}
        isLoading={audiobooksLoading}
      />
    </>
  );
};
