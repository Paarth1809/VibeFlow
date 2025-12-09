"use client";

import { Headphones } from "lucide-react";

export default function PlaylistsPage() {
    return (
        <div className="p-8 pb-32">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="p-3 rounded-full bg-primary/10">
                    <Headphones className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                        My Playlists
                    </h1>
                    <p className="text-muted-foreground mt-1">Your custom collections</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Headphones className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No playlists yet</h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                    Create your first playlist to organize your favorite music, podcasts, and sounds.
                </p>
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:scale-105 transition-transform">
                    Create Playlist
                </button>
            </div>
        </div>
    );
}
