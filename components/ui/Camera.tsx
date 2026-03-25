"use client";

import { useState, useRef, useCallback } from "react";
import { Camera as CameraIcon, X, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface CameraProps {
  onCapture?: (dataUrl: string) => void;
  onClose?: () => void;
  label?: string;
  className?: string;
}

export function Camera({ onCapture, onClose, label, className }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [phase, setPhase] = useState<"idle" | "streaming" | "captured">("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setPhase("streaming");
      setError(null);
    } catch {
      setError("Camera access denied or unavailable.");
    }
  };

  const stop = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const { videoWidth: w, videoHeight: h } = videoRef.current;
    canvasRef.current.width = w;
    canvasRef.current.height = h;
    canvasRef.current.getContext("2d")?.drawImage(videoRef.current, 0, 0, w, h);
    const dataUrl = canvasRef.current.toDataURL("image/jpeg");
    setPreview(dataUrl);
    setPhase("captured");
    stop();
  };

  const retake = () => {
    setPreview(null);
    setPhase("idle");
  };

  const confirm = () => {
    if (preview) onCapture?.(preview);
  };

  const close = () => {
    stop();
    onClose?.();
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && <span className="type-label text-ink-secondary">{label}</span>}

      <div className="relative rounded-xl overflow-hidden bg-surface-subtle aspect-video flex items-center justify-center">
        {phase === "idle" && (
          <div className="flex flex-col items-center gap-3">
            <CameraIcon className="h-8 w-8 text-ink-muted" />
            <Button size="sm" onClick={start}>Start camera</Button>
            {error && <p className="type-caption text-status-error">{error}</p>}
          </div>
        )}
        {phase === "streaming" && (
          <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
        )}
        {phase === "captured" && preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Captured" className="w-full h-full object-cover" />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex items-center gap-2 justify-end">
        {phase === "streaming" && (
          <>
            <Button variant="secondary" size="sm" onClick={close} icon={<X className="h-4 w-4" />}>Cancel</Button>
            <Button size="sm" onClick={capture} icon={<CameraIcon className="h-4 w-4" />}>Capture</Button>
          </>
        )}
        {phase === "captured" && (
          <>
            <Button variant="secondary" size="sm" onClick={retake} icon={<RotateCcw className="h-4 w-4" />}>Retake</Button>
            <Button size="sm" onClick={confirm} icon={<Check className="h-4 w-4" />}>Use photo</Button>
          </>
        )}
      </div>
    </div>
  );
}
