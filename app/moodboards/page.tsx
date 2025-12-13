"use client";

import { useImages } from "@/hooks/useImages";
import { ImageIcon, Heart, Plus, Loader2, Share2, MoreHorizontal, Eye, Download, Send, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Pinterest-style masonry grid with music integration
export default function MoodboardsPage() {
    const [selectedMood, setSelectedMood] = useState("chill");
    const { data: images, isLoading: imagesLoading } = useImages(selectedMood);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const moods = [
        { name: "Chill", query: "chill music", color: "from-blue-500/20 to-cyan-500/20 hover:from-blue-500/40 hover:to-cyan-500/40 border-blue-500/50" },
        { name: "Energetic", query: "energetic workout", color: "from-orange-500/20 to-red-500/20 hover:from-orange-500/40 hover:to-red-500/40 border-orange-500/50" },
        { name: "Focus", query: "focus study", color: "from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/40 hover:to-purple-500/40 border-indigo-500/50" },
        { name: "Nature", query: "nature peaceful", color: "from-emerald-500/20 to-green-500/20 hover:from-emerald-500/40 hover:to-green-500/40 border-emerald-500/50" },
        { name: "Party", query: "party celebration", color: "from-pink-500/20 to-rose-500/20 hover:from-pink-500/40 hover:to-rose-500/40 border-pink-500/50" },
        { name: "Romantic", query: "romantic love", color: "from-red-500/20 to-pink-500/20 hover:from-red-500/40 hover:to-pink-500/40 border-red-500/50" },
    ];

    return (
        <div className="p-8 pb-32 min-h-screen bg-gradient-to-b from-background to-background/50">
            {/* Header */}
            <div className="flex items-center justify-between mb-12 animate-fade-in group">
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-primary/10 backdrop-blur-md shadow-2xl ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500">
                        <ImageIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/50 tracking-tight">
                            Moodboards
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg font-light tracking-wide">
                            Curated visual inspiration
                        </p>
                    </div>
                </div>
            </div>

            {/* Mood Filter Pills - Modern Glass Chips */}
            <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide mask-fade-right">
                {moods.map((mood) => (
                    <button
                        key={mood.name}
                        onClick={() => setSelectedMood(mood.query)}
                        className={cn(
                            "px-8 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap border backdrop-blur-md text-sm tracking-wide",
                            selectedMood === mood.query
                                ? `bg-gradient-to-r ${mood.color} text-white shadow-[0_0_30px_-5px_var(--tw-shadow-color)] scale-105 border-transparent ring-1 ring-white/20`
                                : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-white hover:scale-105 hover:border-white/10"
                        )}
                        style={{ "--tw-shadow-color": mood.color.split(' ')[0].replace('from-', '').replace('/20', '') } as any}
                    >
                        {mood.name}
                    </button>
                ))}
            </div>

            {/* Premium Masonry Grid */}
            {imagesLoading ? (
                <div className="flex justify-center py-40">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                        <Loader2 className="w-12 h-12 animate-spin text-primary relative z-10" />
                    </div>
                </div>
            ) : (
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
                    {images?.map((image: any, index: number) => (
                        <div
                            key={image.id}
                            className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/5 hover:ring-white/20 bg-muted/20"
                            onClick={() => setSelectedImage(image)}
                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                        >
                            <img
                                src={image.webformatURL}
                                alt={image.tags}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Elegant Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-white font-medium text-base mb-4 line-clamp-2 tracking-wide leading-relaxed">
                                        {image.tags}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <button className="h-10 px-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center gap-2 text-white transition-all hover:scale-105 group/btn">
                                            <Heart className="w-4 h-4 transition-colors group-hover/btn:text-rose-500" />
                                            <span className="text-xs font-medium">Like</span>
                                        </button>
                                        <button className="h-10 w-10 rounded-full bg-white text-black hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 hover:rotate-90">
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pinterest-Style Premium Lightbox */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-3xl border-white/5 shadow-2xl rounded-[2rem] outline-none">

                    {/* Close Button is handled by DialogPrimitive logic usually, but we can style the container */}

                    {selectedImage ? (
                        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar scroll-smooth">

                            {/* Main Content Split */}
                            <div className="flex flex-col lg:flex-row min-h-0 shrink-0 lg:h-[85vh]">

                                {/* Image Section - Immersive */}
                                <div className="flex-1 bg-black flex items-center justify-center relative p-4 md:p-12 group/image overflow-hidden">
                                    {/* Ambient Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 opacity-50" />

                                    {/* Main Image */}
                                    <img
                                        src={selectedImage.largeImageURL || selectedImage.webformatURL}
                                        alt={selectedImage.tags}
                                        className="relative z-10 max-w-full max-h-full object-contain rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-transform duration-700 ease-out group-hover/image:scale-[1.01]"
                                    />
                                </div>

                                {/* Sidebar / Details Panel */}
                                <div className="w-full lg:w-[450px] bg-[#121212] border-l border-white/5 flex flex-col shrink-0 lg:h-full overflow-y-auto">
                                    <div className="p-8 space-y-8">

                                        {/* Header Actions */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all active:scale-95 group/action">
                                                    <MoreHorizontal className="w-5 h-5 text-muted-foreground group-hover/action:text-white" />
                                                </button>
                                                <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all active:scale-95 group/action">
                                                    <Share2 className="w-5 h-5 text-muted-foreground group-hover/action:text-white" />
                                                </button>
                                            </div>
                                            <button className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                                Save
                                            </button>
                                        </div>

                                        {/* Image Info */}
                                        <div>
                                            <h2 className="text-3xl font-display font-bold text-white mb-2 leading-tight capitalize">
                                                {selectedImage.tags.split(',')[0]} Vibes
                                            </h2>
                                            <a href={selectedImage.pageURL} target="_blank" className="text-sm text-muted-foreground hover:text-white hover:underline transition-colors decoration-white/30 underline-offset-4">
                                                View original source
                                            </a>
                                        </div>

                                        {/* User Profile */}
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors cursor-pointer group/user">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-[2px]">
                                                {selectedImage.userImageURL ? (
                                                    <img src={selectedImage.userImageURL} className="w-full h-full rounded-full object-cover border-2 border-black" alt={selectedImage.user} />
                                                ) : (
                                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold border-2 border-black">
                                                        {selectedImage.user.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-white group-hover/user:text-primary transition-colors">{selectedImage.user}</p>
                                                <p className="text-xs text-muted-foreground">{selectedImage.views.toLocaleString()} followers</p>
                                            </div>
                                            <button className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors">
                                                Follow
                                            </button>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                                                <Heart className="w-5 h-5 mx-auto mb-1 text-rose-500 fill-rose-500/20" />
                                                <span className="text-sm font-bold text-white">{selectedImage.likes}</span>
                                            </div>
                                            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                                                <Eye className="w-5 h-5 mx-auto mb-1 text-sky-400" />
                                                <span className="text-sm font-bold text-white">{selectedImage.views > 1000 ? (selectedImage.views / 1000).toFixed(1) + 'k' : selectedImage.views}</span>
                                            </div>
                                            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                                                <Download className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                                                <span className="text-sm font-bold text-white">{selectedImage.downloads}</span>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 pl-1">Related Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedImage.tags.split(',').map((tag: string) => (
                                                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-xs text-white/80 cursor-pointer transition-all hover:scale-105 active:scale-95">
                                                        #{tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Comment Input Mockup */}
                                        <div className="mt-auto pt-6 border-t border-white/5">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Add a comment..."
                                                    className="w-full bg-white/5 border border-white/5 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50"
                                                />
                                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors">
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* "More Like This" Section */}
                            <div className="p-8 lg:p-12 bg-[#0a0a0a]">
                                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                                    More like this
                                    <span className="text-sm font-normal text-muted-foreground ml-2">(Suggested for you)</span>
                                </h3>

                                <div className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4">
                                    {images?.filter((img: any) => img.id !== selectedImage.id).slice(0, 15).map((img: any, idx: number) => (
                                        <div
                                            key={img.id}
                                            className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group/related relative"
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <img
                                                src={img.webformatURL}
                                                alt={img.tags}
                                                className="w-full h-auto object-cover transition-transform duration-500 group-hover/related:scale-110 opacity-80 group-hover/related:opacity-100"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/related:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                                                    <Maximize2 className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    );
}
