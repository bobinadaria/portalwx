import { cn } from "@/lib/utils";

interface ShowcaseProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Showcase({ title, description, children }: ShowcaseProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="type-display">{title}</h1>
        {description && <p className="type-body mt-2 max-w-lg">{description}</p>}
      </div>
      {children}
    </div>
  );
}

interface PreviewProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function Preview({ label, children, className }: PreviewProps) {
  return (
    <section className="space-y-3">
      <h2 className="type-subheading">{label}</h2>
      <div
        className={cn(
          "rounded-xl border border-border-default bg-surface-raised p-6",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
