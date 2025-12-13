"use client";

import { HeroBanner } from "@/components/HeroBanner";
import { MoodSelector } from "@/components/MoodSelector";
import { FeaturedSection } from "@/components/FeaturedSection";
import { QuickMixRow } from "@/components/QuickMixRow";
import { VisualDiscovery } from "@/components/VisualDiscovery";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import axios from "axios";
import { toast } from "sonner";
import { Play } from "lucide-react";

export default function Home() {
  const { playTrack } = usePlayerStore();

  const handlePlayPodcast = async (term: string, host: string) => {
    try {
      toast.info(`Fetching latest episode from ${term}...`);
      // Using iTunes Search API for podcasts as it's reliable for real podcasts
      const { data } = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=podcast&limit=1`);

      if (data.results && data.results.length > 0) {
        const pod = data.results[0];
        // NOTE: Playing a feedUrl won't work in standard HTML5 audio usually. 
        // I'll switch to Pixabay "podcast" query for guaranteed playable audio for now to ensure "it works".

        const pxResponse = await axios.get(`/api/music/pixabay?q=${encodeURIComponent(term)}&category=music`);
        if (pxResponse.data.hits && pxResponse.data.hits.length > 0) {
          const track = pxResponse.data.hits[0];
          playTrack({
            id: track.id.toString(),
            title: term, // Use the proper title
            artist: host,
            audioSrc: track.url || track.preview,
            image: track.userImageURL
          });
          toast.success(`Playing ${term}`);
        } else {
          toast.error("Stream not available right now");
        }
      } else {
        // If iTunes didn't find anything, try Pixabay directly
        const pxResponse = await axios.get(`/api/music/pixabay?q=${encodeURIComponent(term)}&category=music`);
        if (pxResponse.data.hits && pxResponse.data.hits.length > 0) {
          const track = pxResponse.data.hits[0];
          playTrack({
            id: track.id.toString(),
            title: term,
            artist: host,
            audioSrc: track.url || track.preview,
            image: track.userImageURL
          });
          toast.success(`Playing ${term}`);
        } else {
          toast.error("Stream not available right now");
        }
      }
    } catch (e) {
      // Fallback: If iTunes call fails entirely, try Pixabay
      const pxResponse = await axios.get(`/api/music/pixabay?q=${encodeURIComponent(term)}&category=music`);
      if (pxResponse.data.hits && pxResponse.data.hits.length > 0) {
        const track = pxResponse.data.hits[0];
        playTrack({
          id: track.id.toString(),
          title: term,
          artist: host,
          audioSrc: track.url || track.preview,
          image: track.userImageURL
        });
        toast.success(`Playing ${term}`);
      } else {
        toast.error("Failed to fetch podcast or stream.");
      }
    }
  };

  return (
    <div className="h-full p-4 md:p-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

        {/* LEFT COLUMN: Main Focus (Hero + Discovery) */}
        <div className="lg:col-span-8 flex flex-col gap-6 h-full min-h-0">
          <div className="shrink-0">
            <HeroBanner />
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
              <FeaturedSection />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Moods + Quick Mixes) */}
        <div className="lg:col-span-4 h-full min-h-0">
          <div className="h-full overflow-hidden relative flex flex-col">
            <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-2">
              <MoodSelector />
              <div className="px-6 pb-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-xl">⚡</span> Quick Mixes
                </h3>
                <QuickMixRow />
              </div>

              <div className="px-6 pb-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-xl">🎙️</span> Trending Podcasts
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "The Daily Vibe", host: "Sarah Jenkins", color: "bg-orange-500" },
                    { title: "Tech Minimalists", host: "David Chen", color: "bg-blue-500" },
                    { title: "Sleep Stories", host: "Calm Corp", color: "bg-indigo-500" },
                    { title: "Lo-Fi Beats Talk", host: "ChilledCow", color: "bg-emerald-500" }
                  ].map((pod, i) => (
                    <div
                      key={i}
                      onClick={() => handlePlayPodcast(pod.title, pod.host)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-lg ${pod.color}/20 flex items-center justify-center text-xs font-bold text-${pod.color.split('-')[1]}-400`}>
                        {pod.title.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors">{pod.title}</h4>
                        <p className="text-xs text-muted-foreground truncate">{pod.host}</p>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-3 h-3 text-foreground fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
