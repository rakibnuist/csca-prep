import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site";

/**
 * Native <details> accordion — no client JS and no Radix dependency.
 */
export function Faq({ items = FAQS }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1">{item.q}</span>
            <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition group-open:rotate-180" />
          </summary>
          <p className="pb-5 text-[14.5px] leading-relaxed text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
