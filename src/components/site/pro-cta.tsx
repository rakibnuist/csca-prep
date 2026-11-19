"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Pro is sold by coupon code, so the right destination depends on whether
 * the visitor already has an account.
 *
 * This is a client island rather than a server-side session read so that
 * /pricing stays a static, edge-cacheable page — the same pattern the
 * marketing navbar uses for its login state.
 */
export function ProCta({
  className,
  labelClassName,
}: {
  className?: string;
  labelClassName?: string;
}) {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/me")
      .then((response) => (response.ok ? response.json() : { user: null }))
      .then((data: { user?: { name?: string } | null }) => {
        if (active) setSignedIn(Boolean(data.user));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return (
    <Link
      href={signedIn ? "/app/billing" : "/sign-up"}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-vermillion text-[13px] font-medium text-paper transition hover:bg-vermillion-deep",
        className,
      )}
    >
      <span className={labelClassName}>{signedIn ? "Redeem a Pro code" : "Get Pro"}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
