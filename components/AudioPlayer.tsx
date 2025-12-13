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
      <div className="fixed inset-0 z-[100] flex flex-col animate-fade-in bg-gradient-to-br from-[#0f0518] via-[#1a0b2e] to-[#050208] overflow-hidden">
        {/* Dynamic Background Mesh - Deep & Premium */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-600/5 blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-700/5 blur-[120px] animate-pulse-slow delay-1000" />
          <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-cyan-900/5 blur-[100px] animate-pulse-slow delay-2000" />
        </div>

        {/* Header - Compact */}
        <header className="relative z-10 flex items-center justify-between px-8 py-6 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(false)}
            className="w-12 h-12 rounded-full hover:bg-white/5 text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <ChevronDown className="w-8 h-8 stroke-[1.5]" />
          </Button>
          <div className="text-center">
            <p className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 tracking-[0.4em] uppercase mb-1 drop-shadow-sm opacity-90">Now Playing</p>
            <p className="text-sm font-medium text-white/40 tracking-widest uppercase">VibeNest</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-white/5 text-white/80 hover:text-white transition-all hover:scale-105"
          >
            <MoreHorizontal className="w-6 h-6 stroke-[1.5]" />
          </Button>
        </header>

        {/* Main Content - Flexibly Spaced */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-evenly px-8 w-full max-w-2xl mx-auto pb-4">

          {/* Album Art Container - Responsive Height (Max 45vh) */}
          <div className="relative w-full h-[40vh] max-h-[400px] aspect-square flex items-center justify-center shrink-0 mb-4 group perspective-1000">
            <div className="relative h-full aspect-square">
              {/* Glow Effect */}
              <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/40 to-fuchsia-600/40 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse-slow" />

              {/* Image */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transform transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:rotate-1">
                {currentTrack.image ? (
                  <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
                ) : (
                  <div className={cn(
                    "w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center backdrop-blur-md",
                    isPlaying && "animate-spin-slow"
                  )}>
                    <div className="w-[40%] h-[40%] rounded-full border-[3px] border-white/10 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-[3px] border-t-white/30 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Track Info - Tighter */}
          <div className="w-full flex items-end justify-between px-4 mb-2 shrink-0">
            <div className="flex-1 min-w-0 pr-6 text-left">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white truncate mb-2 leading-tight tracking-tight drop-shadow-lg">{currentTrack.title}</h2>
              <p className="text-lg md:text-xl text-white/50 truncate font-light tracking-wide">{currentTrack.artist}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 shrink-0 rounded-full hover:bg-white/10 active:scale-95 transition-all"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn(
                "w-7 h-7 transition-colors duration-300 stroke-[2]",
                isLiked ? "fill-rose-500 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" : "text-white/70 hover:text-white"
              )} />
            </Button>
          </div>

          {/* Controls & Progress - Grouped */}
          <div className="w-full flex flex-col gap-6 shrink-0">
            {/* Progress Bar */}
            <div className="w-full group/slider px-2">
              <Slider
                value={progress}
                onValueChange={handleSeek}
                max={100}
                step={0.1}
                className="w-full [&>.relative>.absolute]:h-1.5 [&>.relative]:h-1.5 [&>.relative]:bg-white/10 [&>.relative>.absolute]:bg-gradient-to-r [&>.relative>.absolute]:from-cyan-300 [&>.relative>.absolute]:to-indigo-400 [&>.relative>.absolute]:shadow-[0_0_15px_rgba(168,85,247,0.5)] [&>span]:w-4 [&>span]:h-4 [&>span]:border-[3px] [&>span]:border-white [&>span]:shadow-lg"
              />
              <div className="flex justify-between mt-3 text-xs font-semibold text-white/30 font-mono tracking-widest px-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between w-full max-w-xl mx-auto px-2">
              <Button variant="ghost" size="icon" className="w-12 h-12 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all hover:scale-110 active:scale-95">
                <Shuffle className="w-5 h-5 stroke-[2]" />
              </Button>

              <div className="flex items-center gap-8 md:gap-12">
                <Button variant="ghost" size="icon" className="w-16 h-16 text-white/90 hover:text-cyan-300 transition-colors hover:scale-110 active:scale-95">
                  <SkipBack className="w-9 h-9 fill-current drop-shadow-md" />
                </Button>

                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-24 h-24 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] flex items-center justify-center p-0 ring-4 ring-transparent hover:ring-white/20"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 fill-current" />
                  ) : (
                    <Play className="w-10 h-10 fill-current ml-1.5" />
                  )}
                </Button>

                <Button variant="ghost" size="icon" className="w-16 h-16 text-white/90 hover:text-cyan-300 transition-colors hover:scale-110 active:scale-95">
                  <SkipForward className="w-9 h-9 fill-current drop-shadow-md" />
                </Button>
              </div>

              <Button variant="ghost" size="icon" className="w-12 h-12 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all hover:scale-110 active:scale-95">
                <Repeat className="w-5 h-5 stroke-[2]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Actions - Minimalist */}
        <footer className="relative z-10 flex items-center justify-center gap-8 p-6 pb-8 w-full max-w-3xl mx-auto shrink-0">
          <div className="flex items-center gap-4 flex-1 group/vol">
            <Volume2 className="w-5 h-5 text-white/40 group-hover/vol:text-white transition-colors" />
            <Slider
              value={[volume]}
              onValueChange={(val) => setVolume(val[0])}
              max={100}
              step={1}
              className="flex-1 [&>.relative>.absolute]:bg-white/70 [&>.relative]:bg-white/10"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="w-10 h-10 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Share2 className="w-5 h-5 stroke-[1.5]" />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <ListMusic className="w-5 h-5 stroke-[1.5]" />
            </Button>
          </div>
        </footer>
        <audio ref={audioRef} src={currentTrack.audioSrc} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />
      </div>
    );
  }

  // Mini Player - Refined & Premium
  return (
    <div className="fixed bottom-8 left-8 right-8 z-50 animate-slide-up">
      {/* Floating Glass Container */}
      <footer className="h-28 bg-[#1a103c]/80 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative group hover:border-white/30 transition-all duration-500 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]">

        {/* Subtle Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-purple-500/10 opacity-100 pointer-events-none" />

        {/* Progress Bar (Top Edge) - Thicker & Glowing */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all duration-300"
            style={{ width: `${progress[0]}%` }}
          />
        </div>

        <div className="h-full flex items-center justify-between px-8 gap-8 relative z-10">
          {/* Track Info Section */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-6 min-w-[280px] w-[30%] text-left group/info cursor-pointer select-none"
          >
            <div className="relative w-20 h-20 shrink-0 transform transition-transform group-hover/info:scale-105 duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 blur-lg opacity-40 group-hover/info:opacity-70 transition-opacity animate-pulse-slow" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-xl bg-black/40">
                {currentTrack.image ? (
                  <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
                ) : (
                  <div className={cn(
                    "w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900",
                    isPlaying && "animate-spin-slow"
                  )}>
                    <div className="w-8 h-8 rounded-full border-2 border-white/20" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0 py-2">
              <h4 className="font-bold text-lg text-white truncate mb-1 group-hover/info:text-cyan-400 transition-colors drop-shadow-sm">{currentTrack.title}</h4>
              <p className="text-sm text-white/60 truncate font-medium">{currentTrack.artist}</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 shrink-0 opacity-0 group-hover/info:opacity-100 transition-all hover:bg-white/10 rounded-full transform translate-x-4 group-hover/info:translate-x-0"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <Heart className={cn(
                "w-6 h-6 transition-colors stroke-2",
                isLiked ? "fill-rose-500 text-rose-500" : "text-white/80 hover:text-white"
              )} />
            </Button>
          </div>

          {/* Main Controls - Centered & Larger */}
          <div className="flex items-center gap-8 flex-1 justify-center max-w-lg">
            <Button variant="ghost" size="icon" className="w-14 h-14 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95">
              <SkipBack className="w-7 h-7 fill-current" />
            </Button>

            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-18 h-18 rounded-full bg-white text-black hover:scale-105 hover:bg-white active:scale-95 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] ring-4 ring-transparent hover:ring-white/20"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </Button>

            <Button variant="ghost" size="icon" className="w-14 h-14 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95">
              <SkipForward className="w-7 h-7 fill-current" />
            </Button>
          </div>

          {/* Volume & Extras / Right */}
          <div className="flex items-center gap-6 min-w-[280px] w-[30%] justify-end">
            <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-full border border-white/5 hover:border-white/15 transition-all group/vol hover:bg-white/10">
              <Volume2 className="w-5 h-5 text-white/60 group-hover/vol:text-white transition-colors" />
              <Slider
                value={[volume]}
                onValueChange={(val) => setVolume(val[0])}
                max={100}
                step={1}
                className="w-28"
              />
            </div>

            <div className="h-10 w-[1px] bg-white/10 mx-2" />

            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all hover:scale-110"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="w-6 h-6 stroke-2" />
            </Button>
          </div>
        </div>
        <audio ref={audioRef} src={currentTrack.audioSrc} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />
      </footer>
    </div>
  );
};
