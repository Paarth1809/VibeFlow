"use client";

import { FeaturedSection } from "@/components/FeaturedSection";
import { Sparkles, Loader2 } from "lucide-react";
import { useAudiobooks } from "@/hooks/useAudiobooks";

export default function AudiobooksPage() {
    const { data: audiobooks, isLoading } = useAudiobooks();

    return (
        <div className="p-8 pb-32">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="p-3 rounded-full bg-primary/10">
                    <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                        Audiobooks
                    </h1>
                    <p className="text-muted-foreground mt-1">Immerse yourself in great stories</p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <FeaturedSection />
            )}
        </div>
    );
}
