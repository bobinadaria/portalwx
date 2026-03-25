import { Sparkles, RefreshCw, ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type ContentAIState = "idle" | "generating" | "done" | "error";

interface ContentAIProps {
  content?: string;
  state?: ContentAIState;
  label?: string;
  onRegenerate?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onCopy?: () => void;
  className?: string;
}

export function ContentAI({
  content,
  state = "idle",
  label = "AI suggestion",
  onRegenerate,
  onAccept,
  onReject,
  onCopy,
  className,
}: ContentAIProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-brand-l2 border-brand-l1 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-brand-l1 bg-brand-l1/40">
        <Sparkles className="h-3.5 w-3.5 text-signature shrink-0" aria-hidden="true" />
        <span className="type-label text-signature">{label}</span>
        {state === "generating" && (
          <span className="ml-auto type-caption text-signature/60 animate-pulse">Generating…</span>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {state === "generating" && (
          <div className="flex flex-col gap-2">
            {[80, 95, 60].map((w, i) => (
              <div key={i} className="h-3 rounded bg-brand-l1 animate-pulse" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}
        {state === "done" && content && (
          <p className="type-body text-ink-secondary whitespace-pre-wrap">{content}</p>
        )}
        {state === "error" && (
          <p className="type-body text-status-error">Failed to generate content. Try again.</p>
        )}
        {state === "idle" && (
          <p className="type-body text-ink-muted italic">AI content will appear here.</p>
        )}
      </div>

      {/* Actions */}
      {(onRegenerate || onAccept || onReject || onCopy) && state !== "generating" && (
        <div className="flex items-center gap-1 px-4 py-2.5 border-t border-brand-l1 bg-brand-l1/20">
          {onCopy && (
            <button onClick={onCopy} aria-label="Copy" className="p-1.5 rounded text-ink-muted hover:text-ink-primary hover:bg-surface-subtle transition-colors">
              <Copy className="h-3.5 w-3.5" />
            </button>
          )}
          {onRegenerate && (
            <button onClick={onRegenerate} aria-label="Regenerate" className="p-1.5 rounded text-ink-muted hover:text-signature hover:bg-surface-subtle transition-colors">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          )}
          <div className="flex-1" />
          {onReject && (
            <button onClick={onReject} aria-label="Reject" className="p-1.5 rounded text-ink-muted hover:text-status-error hover:bg-status-error-bg transition-colors">
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
          )}
          {onAccept && (
            <button onClick={onAccept} aria-label="Accept" className="p-1.5 rounded text-ink-muted hover:text-status-success hover:bg-status-success-bg transition-colors">
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
