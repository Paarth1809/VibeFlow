"use client";

import { useMusic } from "@/hooks/useMusic";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { Play, Pause, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const moods = [
    { name: "Chill", color: "from-blue-500 to-cyan-500", query: "chill" },
    { name: "Energetic", color: "from-orange-500 to-red-500", query: "upbeat" },
    { name: "Focus", color: "from-indigo-500 to-purple-500", query: "focus" },
    { name: "Workout", color: "from-emerald-500 to-green-500", query: "workout" },
    { name: "Party", color: "from-pink-500 to-rose-500", query: "party" },
    { name: "Sleep", color: "from-slate-500 to-gray-500", query: "sleep" },
    { name: "Romance", color: "from-red-500 to-pink-500", query: "romantic" },
    { name: "Sad", color: "from-blue-800 to-indigo-900", query: "sad" },
];

export default function MoodsPage() {
    const { playTrack } = usePlayerStore();

    const playMood = async (moodQuery: string) => {
        toast.info(`Creating ${moodQuery} mix...`);
        try {
            const res = await axios.get(`/api/music/pixabay?q=${moodQuery}&limit=10`);
            const tracks = res.data.hits;
            if (tracks && tracks.length > 0) {
                const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
                playTrack({
                    id: randomTrack.id,
                    title: `${moodQuery.charAt(0).toUpperCase() + moodQuery.slice(1)} Mix`,
                    artist: randomTrack.user,
                    audioSrc: randomTrack.url || randomTrack.preview || "",
                    image: randomTrack.userImageURL || null
                });
                toast.success("Playing mix!");
            } else {
                toast.error("No tracks found for this mood.");
            }
        } catch (e) {
            toast.error("Failed to load mood mix.");
        }
    };

    return (
        <div className="p-8 pb-32">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="p-3 rounded-full bg-primary/10">
                    <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                        Moods
                    </h1>
                    <p className="text-muted-foreground mt-1">Music for every vibe</p>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {moods.map((mood) => (
                    <div
                        key={mood.name}
                        onClick={() => playMood(mood.query)}
                        className={`relative h-48 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-2xl font-bold text-white drop-shadow-md">{mood.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
