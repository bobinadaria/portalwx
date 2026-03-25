"use client";

import { useState, useRef } from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  Link, Image, Undo, Redo, Type
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WysiwygProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  minHeight?: number;
  readOnly?: boolean;
  className?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, active, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={cn(
        "p-1.5 rounded transition-colors [&>svg]:h-3.5 [&>svg]:w-3.5",
        active
          ? "bg-brand-l1 text-signature"
          : "text-ink-muted hover:bg-surface-subtle hover:text-ink-primary"
      )}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-4 bg-border-default mx-0.5" aria-hidden="true" />;
}

export function Wysiwyg({
  value = "",
  onChange,
  placeholder = "Write something…",
  label,
  minHeight = 160,
  readOnly = false,
  className,
}: WysiwygProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    editorRef.current?.focus();
    onChange?.(editorRef.current?.innerHTML ?? "");
  };

  const handleInput = () => {
    onChange?.(editorRef.current?.innerHTML ?? "");
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <span className="type-label text-ink-secondary">{label}</span>}
      <div className="rounded-xl border border-border-default bg-surface-raised overflow-hidden focus-within:border-signature transition-colors">
        {!readOnly && (
          <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border-default flex-wrap">
            <ToolbarButton onClick={() => exec("undo")} title="Undo"><Undo /></ToolbarButton>
            <ToolbarButton onClick={() => exec("redo")} title="Redo"><Redo /></ToolbarButton>
            <ToolbarDivider />
            <ToolbarButton onClick={() => exec("bold")} title="Bold"><Bold /></ToolbarButton>
            <ToolbarButton onClick={() => exec("italic")} title="Italic"><Italic /></ToolbarButton>
            <ToolbarButton onClick={() => exec("underline")} title="Underline"><Underline /></ToolbarButton>
            <ToolbarButton onClick={() => exec("strikeThrough")} title="Strikethrough"><Strikethrough /></ToolbarButton>
            <ToolbarDivider />
            <ToolbarButton onClick={() => exec("insertUnorderedList")} title="Bullet list"><List /></ToolbarButton>
            <ToolbarButton onClick={() => exec("insertOrderedList")} title="Numbered list"><ListOrdered /></ToolbarButton>
            <ToolbarDivider />
            <ToolbarButton onClick={() => exec("justifyLeft")} title="Align left"><AlignLeft /></ToolbarButton>
            <ToolbarButton onClick={() => exec("justifyCenter")} title="Align center"><AlignCenter /></ToolbarButton>
            <ToolbarButton onClick={() => exec("justifyRight")} title="Align right"><AlignRight /></ToolbarButton>
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable={!readOnly}
          onInput={handleInput}
          suppressContentEditableWarning
          className={cn(
            "p-3 text-sm text-ink-primary outline-none overflow-auto",
            "prose prose-sm max-w-none",
            "[&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4",
            "[&_b]:font-semibold [&_i]:italic [&_u]:underline",
            "empty:before:content-[attr(data-placeholder)] empty:before:text-ink-muted"
          )}
          style={{ minHeight }}
          data-placeholder={placeholder}
          aria-label={label ?? "Rich text editor"}
          aria-multiline="true"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
}
