"use client";

import {
    Home,
    Compass,
    Music2,
    Headphones,
    BookOpen,
    Mic2,
    ImageIcon,
    Sparkles,
    Cloud,
    Heart,
    Clock,
    Search,
    Bell,
    User,
    Library
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export const Topbar = () => {
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detect scroll for floating effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Discovery Content
    const discoverNav = [
        { icon: <Home size={18} />, label: "Home", href: "/" },
        { icon: <Compass size={18} />, label: "Discover", href: "/discover" },
        { icon: <ImageIcon size={18} />, label: "Boards", href: "/moodboards", badge: "Pinterest" },
        { icon: <Music2 size={18} />, label: "Music", href: "/music" },
        { icon: <Mic2 size={18} />, label: "Podcasts", href: "/podcasts" },
        { icon: <BookOpen size={18} />, label: "Audiobooks", href: "/audiobooks" },
        { icon: <Cloud size={18} />, label: "Calm", href: "/calm-sounds" },
        { icon: <Sparkles size={18} />, label: "Moods", href: "/moods" },
    ];

    // Personal Library
    const libraryNav = [
        { icon: <Heart size={18} />, label: "Favorites", href: "/favorites" },
        { icon: <Clock size={18} />, label: "Recent", href: "/recent" },
        { icon: <Headphones size={18} />, label: "Playlists", href: "/playlists" },
    ];

    const isActive = (href: string) => {
        if (href === "/" && pathname !== "/") return false;
        return pathname.startsWith(href);
    };

    return (
        <nav className={cn(
            "fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out animate-slide-in-left",
            scrolled
                ? "top-2 shadow-2xl shadow-black/20"
                : "shadow-xl shadow-black/10"
        )}>
            <div className={cn(
                "rounded-2xl border border-border/50 transition-all duration-500",
                scrolled
                    ? "bg-background/60 backdrop-blur-3xl"
                    : "bg-background/80 backdrop-blur-xl"
            )}>
                <div className={cn(
                    "h-full px-6 flex items-center justify-between gap-6 transition-all duration-300",
                    scrolled ? "py-2" : "py-3"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Sparkles className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <h1 className="font-display text-xl font-bold tracking-tight hidden sm:block">
                            <span className="text-gradient">Vibe</span>
                            <span className="text-foreground">Nest</span>
                        </h1>
                    </Link>

                    {/* Main Navigation */}
                    <div className="flex-1 flex items-center gap-4 overflow-x-auto scrollbar-hide">
                        {/* Discover Section */}
                        <div className="flex items-center gap-1">
                            {discoverNav.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-sm transition-all whitespace-nowrap relative animate-fade-in",
                                        `stagger-${Math.min(index + 1, 5)}`,
                                        isActive(item.href)
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105"
                                    )}
                                >
                                    <span className={cn(
                                        "transition-transform duration-300",
                                        isActive(item.href) && "scale-110"
                                    )}>
                                        {item.icon}
                                    </span>
                                    <span className="hidden lg:inline">{item.label}</span>
                                    {item.badge && (
                                        <span className="hidden xl:inline text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary animate-pulse">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Separator */}
                        <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

                        {/* Library Section */}
                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-1.5 px-2 text-xs text-muted-foreground font-medium hidden xl:flex">
                                <Library size={14} />
                                <span>MY LIBRARY</span>
                            </div>
                            {libraryNav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-sm transition-all whitespace-nowrap",
                                        isActive(item.href)
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105"
                                    )}
                                >
                                    <span className={cn(
                                        "transition-transform duration-300",
                                        isActive(item.href) && "scale-110"
                                    )}>
                                        {item.icon}
                                    </span>
                                    <span className="hidden lg:inline">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Search */}
                        <div className={cn(
                            "relative transition-all duration-300",
                            searchOpen ? "w-64" : "w-10"
                        )}>
                            {searchOpen ? (
                                <div className="relative animate-scale-in">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search..."
                                        className="pl-9 h-10 bg-muted border-0"
                                        autoFocus
                                        onBlur={() => setSearchOpen(false)}
                                    />
                                </div>
                            ) : (
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                                >
                                    <Search size={18} />
                                </button>
                            )}
                        </div>

                        {/* Notifications */}
                        <button className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110 relative">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
                        </button>

                        {/* Profile */}
                        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg hover:shadow-xl">
                            <User size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
