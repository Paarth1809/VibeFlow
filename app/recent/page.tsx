"use client";

import { Clock } from "lucide-react";

export default function RecentPage() {
    return (
        <div className="p-8 pb-32">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="p-3 rounded-full bg-primary/10">
                    <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                        Recently Played
                    </h1>
                    <p className="text-muted-foreground mt-1">Your listening history</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Clock className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No recent activity</h3>
                <p className="text-muted-foreground max-w-sm">
                    Your recently played tracks, podcasts, and audiobooks will appear here.
                </p>
            </div>
        </div>
    );
}
