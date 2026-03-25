import { CornerDownRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

interface CommentProps {
  author: string;
  authorAvatarSrc?: string;
  authorRole?: string;
  content: string;
  time: string;
  replies?: CommentProps[];
  actions?: React.ReactNode;
  onReply?: () => void;
  onMore?: () => void;
  depth?: number;
  className?: string;
}

export function Comment({
  author,
  authorAvatarSrc,
  authorRole,
  content,
  time,
  replies,
  actions,
  onReply,
  onMore,
  depth = 0,
  className,
}: CommentProps) {
  return (
    <div className={cn("flex gap-3", depth > 0 && "ml-8 border-l border-border-subtle pl-4", className)}>
      <Avatar src={authorAvatarSrc} name={author} size="sm" className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="type-label text-ink-primary">{author}</span>
            {authorRole && <span className="type-caption text-ink-muted">· {authorRole}</span>}
            <span className="type-caption text-ink-muted">{time}</span>
          </div>
          {(onMore || actions) && (
            <div className="flex items-center gap-1 shrink-0">
              {actions}
              {onMore && (
                <button onClick={onMore} aria-label="More options" className="p-1 rounded text-ink-muted hover:text-ink-primary hover:bg-surface-subtle transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
        <p className="type-body text-ink-secondary whitespace-pre-wrap">{content}</p>
        {onReply && (
          <button
            onClick={onReply}
            className="mt-2 flex items-center gap-1 type-caption text-ink-muted hover:text-signature transition-colors"
          >
            <CornerDownRight className="h-3 w-3" aria-hidden="true" />
            Reply
          </button>
        )}
        {replies && replies.length > 0 && (
          <div className="mt-3 flex flex-col gap-3">
            {replies.map((r, i) => (
              <Comment key={i} {...r} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
