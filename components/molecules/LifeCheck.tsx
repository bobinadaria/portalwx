"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Status } from "@/components/ui/Status";

type LifeCheckState = "checking" | "online" | "offline" | "degraded";

interface LifeCheckService {
  name: string;
  status: "online" | "offline" | "degraded";
  latency?: number;
}

interface LifeCheckProps {
  services?: LifeCheckService[];
  onCheck?: () => void;
  autoCheck?: boolean;
  interval?: number;
  className?: string;
}

export function LifeCheck({
  services = [],
  onCheck,
  autoCheck = false,
  interval = 30000,
  className,
}: LifeCheckProps) {
  const [state, setState] = useState<LifeCheckState>("checking");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const allOnline = services.every((s) => s.status === "online");
  const anyOffline = services.some((s) => s.status === "offline");
  const overallState: LifeCheckState =
    services.length === 0 ? "checking" :
    anyOffline ? "offline" :
    allOnline ? "online" : "degraded";

  const handleCheck = () => {
    setState("checking");
    onCheck?.();
    setTimeout(() => {
      setState(overallState);
      setLastChecked(new Date());
    }, 800);
  };

  useEffect(() => {
    handleCheck();
    if (!autoCheck) return;
    const timer = setInterval(handleCheck, interval);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusVariant = state === "online" ? "online" : state === "offline" ? "error" : state === "degraded" ? "warning" : "neutral";
  const stateLabel = state === "online" ? "All systems operational" : state === "offline" ? "Service disruption" : state === "degraded" ? "Degraded performance" : "Checking…";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {state === "offline"
            ? <WifiOff className="h-4 w-4 text-status-error" aria-hidden="true" />
            : <Wifi className="h-4 w-4 text-status-success" aria-hidden="true" />
          }
          <span className="type-label text-ink-primary">{stateLabel}</span>
        </div>
        <button
          onClick={handleCheck}
          aria-label="Refresh status"
          className="p-1.5 rounded text-ink-muted hover:text-ink-primary hover:bg-surface-subtle transition-colors"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", state === "checking" && "animate-spin")} />
        </button>
      </div>

      {services.length > 0 && (
        <div className="flex flex-col gap-1.5 border border-border-default rounded-lg p-3 bg-surface-subtle">
          {services.map((svc, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="type-caption text-ink-secondary">{svc.name}</span>
              <div className="flex items-center gap-2">
                {svc.latency !== undefined && (
                  <span className="type-caption text-ink-muted">{svc.latency}ms</span>
                )}
                <Status
                  variant={svc.status === "online" ? "online" : svc.status === "offline" ? "error" : "warning"}
                  label={svc.status}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {lastChecked && (
        <p className="type-caption text-ink-muted">
          Last checked: {lastChecked.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
