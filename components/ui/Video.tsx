"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
}

export function Video({
  src,
  poster,
  title,
  autoPlay = false,
  muted: defaultMuted = false,
  loop = false,
  controls = true,
  className,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(defaultMuted);
  const [progress, setProgress] = useState(0);

  if (!controls) {
    return (
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        title={title}
        className={cn("w-full rounded-xl bg-surface-subtle", className)}
      />
    );
  }

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    setProgress(duration ? (currentTime / duration) * 100 : 0);
  };

  const fullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <div className={cn("relative rounded-xl overflow-hidden bg-surface-subtle group", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        title={title}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlaying(false)}
        className="w-full"
      />
      {/* Controls overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress */}
        <div
          className="w-full h-1 bg-white/30 rounded-full mb-2 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const pct = x / rect.width;
            if (videoRef.current) {
              videoRef.current.currentTime = videoRef.current.duration * pct;
            }
          }}
        >
          <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="text-white hover:text-white/80">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="text-white hover:text-white/80">
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <div className="flex-1" />
          <button onClick={fullscreen} aria-label="Fullscreen" className="text-white hover:text-white/80">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
