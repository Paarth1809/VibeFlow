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
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
  badge?: string;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active, href, badge }: NavItemProps) => (
  <Link
    href={href}
    className={cn(
      "nav-link w-full group",
      active && "nav-link-active"
    )}
  >
    <span className={cn(
      "w-5 h-5 transition-colors",
      active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
    )}>
      {icon}
    </span>
    <span className="flex-1 text-left">{label}</span>
    {badge && (
      <span className="bg-primary/20 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </Link>
);

// ... prior imports

// ... other Code
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="section-title px-4 mb-2">{children}</h3>
);

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const mainNav = [
    { icon: <Home size={18} />, label: "Home", href: "/" },
    { icon: <Compass size={18} />, label: "Discover", href: "/discover" },
    { icon: <Sparkles size={18} />, label: "Moods", badge: "New", href: "/moods" },
  ];

  const mediaNav = [
    { icon: <Music2 size={18} />, label: "Music", href: "/music" },
    { icon: <Cloud size={18} />, label: "Calm Sounds", href: "/calm-sounds" },
    { icon: <Mic2 size={18} />, label: "Podcasts", href: "/podcasts" },
    { icon: <BookOpen size={18} />, label: "Audiobooks", href: "/audiobooks" },
    { icon: <ImageIcon size={18} />, label: "Moodboards", href: "/moodboards" },
  ];

  const libraryNav = [
    { icon: <Heart size={18} />, label: "Favorites", href: "/favorites" },
    { icon: <Clock size={18} />, label: "Recent", href: "/recent" },
    { icon: <Headphones size={18} />, label: "My Playlists", href: "/playlists" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <aside className={cn(
      "bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0 transition-all duration-300",
      collapsed ? "w-[72px]" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <h1 className="font-display text-xl font-bold tracking-tight animate-fade-in">
            <span className="text-gradient">Vibe</span>
            <span className="text-foreground">Flow</span>
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-6 py-4">
        {/* Main */}
        <div className="space-y-1">
          {mainNav.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={collapsed ? "" : item.label}
              badge={!collapsed ? item.badge : undefined}
              href={item.href}
              active={isActive(item.href)}
            />
          ))}
        </div>

        {/* Media */}
        <div>
          {!collapsed && <SectionTitle>Media</SectionTitle>}
          <div className="space-y-1">
            {mediaNav.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={collapsed ? "" : item.label}
                href={item.href}
                active={isActive(item.href)}
              />
            ))}
          </div>
        </div>

        {/* Library */}
        <div>
          {!collapsed && <SectionTitle>Your Library</SectionTitle>}
          <div className="space-y-1">
            {libraryNav.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={collapsed ? "" : item.label}
                href={item.href}
                active={isActive(item.href)}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Settings */}
      <div className="p-2 border-t border-sidebar-border">
        <NavItem
          icon={<Settings size={18} />}
          label={collapsed ? "" : "Settings"}
          href="/settings"
          active={pathname === "/settings"}
        />
      </div>
    </aside>
  );
};

