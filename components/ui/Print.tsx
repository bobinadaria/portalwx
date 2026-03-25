"use client";

import { Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface PrintProps {
  children: React.ReactNode;
  triggerLabel?: string;
  showTrigger?: boolean;
  className?: string;
}

export function Print({ children, triggerLabel = "Print", showTrigger = true, className }: PrintProps) {
  const handlePrint = () => window.print();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {showTrigger && (
        <div className="flex justify-end print:hidden">
          <Button
            variant="secondary"
            size="sm"
            icon={<Printer className="h-4 w-4" />}
            onClick={handlePrint}
          >
            {triggerLabel}
          </Button>
        </div>
      )}
      <div className="print:block">{children}</div>
    </div>
  );
}
