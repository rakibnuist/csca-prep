import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  body,
  action,
  backHref,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
  backHref?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={cn("border-b border-line bg-paper-deep/30", className)}>
      <div className="mx-auto max-w-[1120px] px-5 py-8 sm:px-8 sm:py-10">
        {backHref && (
          <Link
            href={backHref.href}
            className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-ink-soft transition hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {backHref.label}
          </Link>
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="display-md mt-2 text-balance text-ink">{title}</h1>
            {body && <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-soft">{body}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
}

export function AppBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto max-w-[1120px] px-5 py-8 sm:px-8 sm:py-10", className)}>{children}</div>
  );
}
