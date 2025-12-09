'use client';

import { Play, Pause, Heart, Search, MoreHorizontal } from 'lucide-react';

export default function DesignSystemPage() {
    return (
        <div className="p-8 pb-32 max-w-7xl mx-auto space-y-16">

            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-5xl font-black tracking-tight">VibeNest Design System</h1>
                <p className="text-[#b3b3b3] text-xl">
                    Visual language, tokens, and components for VibeNest's interface.
                </p>
            </div>

            {/* 1. Color Palette */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-white/10 pb-2">1. Color Palette</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Backgrounds */}
                    <div className="space-y-2">
                        <div className="h-24 rounded-lg bg-black border border-white/10 flex items-end p-2 font-mono text-xs">#000000</div>
                        <p className="font-medium">Background / Main</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-24 rounded-lg bg-[#121212] flex items-end p-2 font-mono text-xs">#121212</div>
                        <p className="font-medium">Surface / Card</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-24 rounded-lg bg-[#282828] flex items-end p-2 font-mono text-xs">#282828</div>
                        <p className="font-medium">Surface / Hover</p>
                    </div>

                    {/* Accents */}
                    <div className="space-y-2">
                        <div className="h-24 rounded-lg bg-green-500 text-black flex items-end p-2 font-mono text-xs">#22c55e</div>
                        <p className="font-medium">Brand / Accent</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-24 rounded-lg bg-white text-black flex items-end p-2 font-mono text-xs">#FFFFFF</div>
                        <p className="font-medium">Text / Primary</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-24 rounded-lg bg-[#b3b3b3] text-black flex items-end p-2 font-mono text-xs">#B3B3B3</div>
                        <p className="font-medium">Text / Secondary</p>
                    </div>
                </div>
            </section>

            {/* 2. Typography */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-white/10 pb-2">2. Typography</h2>

                <div className="space-y-8">
                    <div className="grid grid-cols-[100px_1fr] items-baseline gap-4">
                        <span className="text-[#b3b3b3] font-mono text-sm">Header 1</span>
                        <h1 className="text-5xl font-black tracking-tight">The quick brown fox</h1>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-baseline gap-4">
                        <span className="text-[#b3b3b3] font-mono text-sm">Header 2</span>
                        <h2 className="text-3xl font-bold">The quick brown fox jumps</h2>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-baseline gap-4">
                        <span className="text-[#b3b3b3] font-mono text-sm">Header 3</span>
                        <h3 className="text-2xl font-bold">The quick brown fox jumps over</h3>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-baseline gap-4">
                        <span className="text-[#b3b3b3] font-mono text-sm">Body</span>
                        <p className="text-base text-[#b3b3b3]">
                            The quick brown fox jumps over the lazy dog. Accessibility and legibility are key priorities for the VibeNest typography scale.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Components */}
            <section className="space-y-12">
                <h2 className="text-2xl font-bold border-b border-white/10 pb-2">3. Component Library</h2>

                {/* Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Buttons</h3>

                        <div className="flex flex-wrap gap-4 items-center">
                            {/* Primary */}
                            <button className="bg-green-500 text-black px-8 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform">
                                Primary
                            </button>

                            {/* Secondary */}
                            <button className="bg-transparent border border-[#727272] hover:border-white text-white px-8 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all">
                                Secondary
                            </button>

                            {/* Icon Only */}
                            <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                                <Play fill="black" size={20} className="ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Input Fields</h3>
                        <div className="w-full max-w-sm relative">
                            <div className="absolute left-4 top-3.5 text-[#b3b3b3]">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="What do you want to play?"
                                className="w-full h-12 bg-[#242424] rounded-full pl-12 pr-4 text-white placeholder-[#b3b3b3] focus:ring-2 focus:ring-white outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">Media Cards</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Default Card */}
                        <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all group cursor-pointer">
                            <div className="relative mb-4 aspect-square shadow-lg rounded-md overflow-hidden bg-[#222]">
                                <div className="absolute inset-0 flex items-center justify-center text-[#333]">Album Art</div>
                                <div className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105">
                                    <Play fill="black" size={24} className="ml-1 text-black" />
                                </div>
                            </div>
                            <h3 className="font-bold text-white truncate mb-1">Track Title</h3>
                            <p className="text-sm text-[#b3b3b3]">Artist Name</p>
                        </div>

                        {/* Hover State Simulation */}
                        <div className="bg-[#282828] p-4 rounded-md transition-all group cursor-pointer">
                            <div className="relative mb-4 aspect-square shadow-lg rounded-md overflow-hidden bg-[#333]">
                                <div className="absolute inset-0 flex items-center justify-center text-[#555]">Hover State</div>
                                <div className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-100 translate-y-0 shadow-xl">
                                    <Play fill="black" size={24} className="ml-1 text-black" />
                                </div>
                            </div>
                            <h3 className="font-bold text-white truncate mb-1">Track Title</h3>
                            <p className="text-sm text-[#b3b3b3]">Artist Name</p>
                        </div>
                    </div>
                </div>

                {/* List Items */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">List Item</h3>
                    <div className="w-full max-w-2xl space-y-2">

                        {/* Default Row */}
                        <div className="flex items-center gap-4 p-2 rounded hover:bg-[#ffffff]/10 group cursor-pointer transition-colors">
                            <span className="w-4 text-center text-[#b3b3b3] group-hover:hidden">1</span>
                            <span className="w-4 text-center hidden group-hover:block text-white"><Play size={14} fill="white" /></span>
                            <div className="w-10 h-10 bg-[#333] rounded flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="text-white font-medium">Song Title</div>
                                <div className="text-sm text-[#b3b3b3]">Artist</div>
                            </div>
                            <div className="text-sm text-[#b3b3b3] hidden md:block">Album</div>
                            <div className="text-sm text-[#b3b3b3]">3:45</div>
                            <button className="text-[#b3b3b3] hover:text-white opacity-0 group-hover:opacity-100">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        {/* Active Row */}
                        <div className="flex items-center gap-4 p-2 rounded bg-[#ffffff]/10 hover:bg-[#ffffff]/20 cursor-pointer transition-colors">
                            <span className="w-4 text-center text-green-500 block"><Play size={14} fill="currentColor" /></span>
                            <div className="w-10 h-10 bg-[#333] rounded flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="text-green-500 font-medium">Active Song</div>
                                <div className="text-sm text-[#b3b3b3]">Artist</div>
                            </div>
                            <div className="text-sm text-[#b3b3b3] hidden md:block">Album</div>
                            <div className="text-sm text-[#b3b3b3]">4:20</div>
                            <div className="text-green-500">
                                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
