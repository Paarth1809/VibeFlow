import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import '../styles/globals.css';
import { Topbar } from '@/components/Topbar';
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
      <body className="bg-background text-foreground font-sans antialiased">
        <Providers>
          <div className="min-h-screen bg-background text-foreground pt-16">
            <Topbar />
            <main className="pb-24">
              {children}
            </main>
            <AudioPlayer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
