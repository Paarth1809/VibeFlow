"use client";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Heart,
  ListMusic,
  Maximize2,
  Minimize2,
  ChevronDown,
  Share2,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/hooks/usePlayerStore";

export const AudioPlayer = () => {
  const { isPlaying, setIsPlaying, currentTrack, volume, setVolume } = usePlayerStore();
  const [progress, setProgress] = useState([0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle track changes - load new source
  useEffect(() => {
    if (audioRef.current && currentTrack?.audioSrc) {
      console.log("Loading audio:", currentTrack.audioSrc);
      audioRef.current.src = currentTrack.audioSrc;
      audioRef.current.load();

      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => console.log("✓ Playback started"))
            .catch(e => {
              console.error("✗ Playback failed:", e);
              setIsPlaying(false);
            });
        }
      }
    }
  }, [currentTrack?.audioSrc]);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current && currentTrack?.audioSrc) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Play error:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = (volume) / 100;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 100;
      setProgress([(current / duration) * 100]);
    }
  };

  const handleSeek = (val: number[]) => {
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (val[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(val);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentTime = audioRef.current?.currentTime || 0;
  const duration = audioRef.current?.duration || 0;

  if (!currentTrack) {
    // Don't render or render placeholder if no track
    return (
      <footer className="fixed bottom-0 left-0 right-0 h-24 bg-player border-t border-border glass z-50 flex items-center justify-center">
        <span className="text-muted-foreground">Select a track to play</span>
      </footer>
    );
  }

  // Fullscreen Player
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-fade-in">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/50 via-background to-background" />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(false)}
            className="w-10 h-10 rounded-full hover:bg-foreground/10"
          >
            <ChevronDown className="w-6 h-6 text-foreground" />
          </Button>
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Playing from</p>
            <p className="text-sm font-medium text-foreground">VibeNest</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full hover:bg-foreground/10"
          >
            <MoreHorizontal className="w-5 h-5 text-foreground" />
          </Button>
        </header>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 max-w-lg mx-auto w-full">
          {/* Album Art */}
          <div className="w-full aspect-square max-w-sm rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl shadow-violet-500/30 mb-8 animate-scale-in overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              {currentTrack.image ? (
                <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
              ) : (
                <div className={cn(
                  "w-32 h-32 rounded-full border-4 border-foreground/20",
                  isPlaying && "animate-spin-slow"
                )}>
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-background/80" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Track Info */}
          <div className="w-full flex items-center justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-2xl font-bold text-foreground truncate">{currentTrack.title}</h2>
              <p className="text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 shrink-0"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn(
                "w-6 h-6 transition-colors",
                isLiked ? "fill-primary text-primary" : "text-muted-foreground"
              )} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-6">
            <Slider
              value={progress}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
              <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 w-full mb-8">
            <Button variant="ghost" size="icon" className="w-12 h-12 text-muted-foreground hover:text-foreground">
              <Shuffle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-14 h-14 text-foreground hover:scale-105 transition-transform">
              <SkipBack className="w-7 h-7 fill-current" />
            </Button>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-18 h-18 rounded-full bg-foreground hover:bg-foreground/90 text-background p-5 hover:scale-105 transition-transform shadow-xl"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="w-14 h-14 text-foreground hover:scale-105 transition-transform">
              <SkipForward className="w-7 h-7 fill-current" />
            </Button>
            <Button variant="ghost" size="icon" className="w-12 h-12 text-muted-foreground hover:text-foreground">
              <Repeat className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={(val) => setVolume(val[0])}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="relative z-10 flex items-center justify-center gap-6 p-6">
          <Button variant="ghost" size="icon" className="w-10 h-10 text-muted-foreground hover:text-foreground">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-10 h-10 text-muted-foreground hover:text-foreground">
            <ListMusic className="w-5 h-5" />
          </Button>
        </footer>
        <audio ref={audioRef} src={currentTrack.audioSrc} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />
      </div>
    );
  }

  // Mini Player (bottom bar)
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-player border-t border-border glass z-50">
      <div className="h-full flex items-center justify-between px-4 gap-4">
        {/* Track Info - Clickable to expand */}
        {/* Track Info - Clickable to expand */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsFullscreen(true)}
          className="flex items-center gap-4 min-w-[200px] w-[30%] text-left hover:bg-foreground/5 rounded-lg p-2 -m-2 transition-colors cursor-pointer"
          onKeyDown={(e) => e.key === 'Enter' && setIsFullscreen(true)}
        >
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center overflow-hidden shadow-lg shadow-violet-500/20">
            {currentTrack.image ? (
              <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
            ) : (
              <div className={cn(
                "w-8 h-8 rounded-full border-2 border-foreground/20",
                isPlaying && "animate-spin-slow"
              )} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate text-sm">{currentTrack.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={cn(
              "w-4 h-4 transition-colors",
              isLiked ? "fill-primary text-primary" : "text-muted-foreground"
            )} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-foreground hover:bg-foreground/90 text-background"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={progress}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Extra Controls */}
        <div className="flex items-center gap-3 min-w-[200px] w-[30%] justify-end">
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
            <ListMusic className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 w-28">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={(val) => setVolume(val[0])}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <audio ref={audioRef} src={currentTrack.audioSrc} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />
    </footer>
  );
};
