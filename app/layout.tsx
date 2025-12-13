import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import '../styles/globals.css';
import { Sidebar } from '@/components/Sidebar';
import { AudioPlayer } from '@/components/AudioPlayer';

export const metadata: Metadata = {
  title: 'VibeNest - Visual Discovery Meets Sound',
  description: 'Where Pinterest meets Spotify. Discover music, podcasts, and calm sounds through stunning visuals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans antialiased overflow-hidden">
        <Providers>
          <div className="h-screen flex flex-col">
            {/* Top Area: Sidebar + Main Content */}
            <div className="flex-1 flex gap-2 p-2 min-h-0">
              <Sidebar />
              <main className="flex-1 bg-[#121212] rounded-lg overflow-hidden relative animate-fade-in z-10">
                {children}
              </main>
            </div>

            {/* Player Area - Fixed Height at Bottom */}
            <div className="h-[90px] w-full shrink-0 relative z-50">
              <AudioPlayer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
