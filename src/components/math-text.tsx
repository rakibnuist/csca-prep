import katex from "katex";
import { cn } from "@/lib/utils";

/**
 * Renders a string that may contain inline ($...$) or display ($$...$$)
 * LaTeX. Kept dependency-light so question text can be stored as plain
 * markdown-ish strings in the database.
 */
export function MathText({ children, className }: { children?: string | null; className?: string }) {
  if (!children) return null;

  const parts = children.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).filter(Boolean);

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {parts.map((part, index) => {
        const display = part.startsWith("$$") && part.endsWith("$$") && part.length > 4;
        const inline = !display && part.startsWith("$") && part.endsWith("$") && part.length > 2;

        if (!display && !inline) return <span key={index}>{part}</span>;

        const expression = part.slice(display ? 2 : 1, display ? -2 : -1);
        try {
          const html = katex.renderToString(expression, {
            displayMode: display,
            throwOnError: false,
            strict: false,
            output: "html",
          });
          return (
            <span
              key={index}
              className={display ? "block" : undefined}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <span key={index}>{expression}</span>;
        }
      })}
    </span>
  );
}
