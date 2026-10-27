import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/site";

export function Faq({ items = FAQS }: { items?: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <AccordionItem key={item.q} value={`faq-${index}`} className="border-0">
          <AccordionTrigger className="py-5 text-left font-sans text-[15px] font-medium text-ink hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-[14.5px] leading-relaxed text-ink-soft">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
