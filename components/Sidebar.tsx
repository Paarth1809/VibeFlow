"use client";
import { Home, Search, Library, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}

const NavItem = ({ icon, label, active, href }: NavItemProps) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-4 px-4 py-3 transition-colors font-bold text-base",
      active ? "text-white" : "text-neutral-400 hover:text-white"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[280px] flex flex-col gap-2 h-full">
      {/* Top Box: Nav */}
      <div className="bg-[#121212] rounded-lg p-3 flex flex-col">
        <NavItem
          icon={<Home size={24} />}
          label="Home"
          href="/"
          active={pathname === "/"}
        />
        <NavItem
          icon={<Search size={24} />}
          label="Search"
          href="/discover"
          active={pathname === "/discover"}
        />
      </div>

      {/* Bottom Box: Library */}
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col min-h-0">
        <div className="p-4 flex items-center justify-between shadow-sm">
          <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-bold">
            <Library size={24} />
            <span>Your Library</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/5 rounded-full text-neutral-400 hover:text-white">
              <Plus size={20} />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full text-neutral-400 hover:text-white">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Mock Library Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-2">
          <div className="space-y-2 mt-2">
            {/* Filters */}
            <div className="flex gap-2 px-2 mb-4 overflow-x-auto no-scrollbar">
              <span className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap">Playlists</span>
              <span className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap">Artists</span>
              <span className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap">Podcasts</span>
            </div>

            {/* List */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-md cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md shrink-0 opacity-80 group-hover:opacity-100" />
                <div className="min-w-0">
                  <h4 className="text-white font-medium truncate">My Vibes Playlist #{i + 1}</h4>
                  <p className="text-neutral-400 text-sm truncate">Playlist • User</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
