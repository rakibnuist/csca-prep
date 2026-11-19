"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Adds `in-view` when the element scrolls into the viewport.
 *
 * Used by the charts: the SVG geometry is rendered on the server (so it is in
 * the HTML and in print), and the draw-in animation is pure CSS hanging off the
 * class. Without JavaScript, or with reduced motion, the charts simply appear
 * finished.
 */
export function InView({
  children,
  className,
  as: Tag = "div",
  threshold = 0.25,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setVisible(true));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={cn(visible && "in-view", className)}>
      {children}
    </Tag>
  );
}
