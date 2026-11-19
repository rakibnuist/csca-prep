"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal.
 *
 * The hidden state lives behind `html.js` (set by a one-line inline script in
 * the root layout), so a no-JS visitor and every crawler sees the content
 * immediately — a page that renders blank until JavaScript runs is a content
 * problem dressed up as a design choice.
 *
 * `prefers-reduced-motion` is handled in CSS: the transition is removed and the
 * content is shown at full opacity.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: "up" | "fade" | "scale" | "left" | "right";
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Show anything already in the viewport at mount immediately so hero copy,
    // CTAs and cards never sit invisible behind a stagger delay after load.
    const rect = node.getBoundingClientRect();
    if (
      typeof IntersectionObserver === "undefined" ||
      (rect.top < window.innerHeight && rect.bottom > 0)
    ) {
      queueMicrotask(() => {
        setInstant(true);
        setVisible(true);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { rootMargin: "0px 0px 40px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-variant={variant}
      data-instant={instant ? "true" : undefined}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
