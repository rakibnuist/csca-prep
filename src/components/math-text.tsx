import katex from "katex";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

/**
 * Renders a string that may contain LaTeX in any of the delimiter styles that
 * appear in the question bank and in hand-written content:
 *
 *   $…$            inline math
 *   $$…$$          display math
 *   \(…\)          inline math (LaTeX style)
 *   \[…\]          display math (LaTeX style)
 *
 * `inline` forces every expression into inline mode, which is what answer
 * options need: a display block inside a one-line button drags the row height
 * and looks nothing like the printed paper.
 */
const TOKEN = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\\\([\s\S]+?\\\)|\\\[[\s\S]+?\\\])/g;

type Delimiters = { open: string; close: string; display: boolean };

function delimitersFor(part: string): Delimiters | null {
  if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) {
    return { open: "$$", close: "$$", display: true };
  }
  if (part.startsWith("\\[") && part.endsWith("\\]") && part.length > 4) {
    return { open: "\\[", close: "\\]", display: true };
  }
  if (part.startsWith("\\(") && part.endsWith("\\)") && part.length > 4) {
    return { open: "\\(", close: "\\)", display: false };
  }
  if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
    return { open: "$", close: "$", display: false };
  }
  return null;
}

function vectorLatex(name: string): string {
  return name.length === 1 ? `\\vec{${name}}` : `\\overrightarrow{${name}}`;
}

function normalizeVectors(text: string): string {
  if (!text.includes("\u20d7")) return text;
  // Sans webfonts lack a paired glyph for U+20D7 and draw a missing-glyph box;
  // route vector labels through KaTeX whether or not they sit inside `$…$`.
  return text
    .split(TOKEN)
    .map((part) => {
      if (!part.includes("\u20d7")) return part;
      if (delimitersFor(part)) {
        return part.replace(/([A-Za-z]{1,2})\u20d7/g, (_, v: string) => vectorLatex(v));
      }
      return part.replace(/([A-Za-z]{1,2})\u20d7/g, (_, v: string) => `$${vectorLatex(v)}$`);
    })
    .join("");
}

export function MathText({
  children,
  className,
  inline = false,
}: {
  children?: string | null;
  className?: string;
  inline?: boolean;
}) {
  if (!children) return null;

  const parts = normalizeVectors(children)
    .split(TOKEN)
    .filter((part) => part !== "");

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {parts.map((part, index) => {
        const delimiters = delimitersFor(part);
        if (!delimiters) return <span key={index}>{part}</span>;

        const expression = part.slice(delimiters.open.length, part.length - delimiters.close.length);
        const displayMode = delimiters.display && !inline;

        try {
          const html = katex.renderToString(expression.trim(), {
            displayMode,
            throwOnError: false,
            strict: false,
            trust: false,
            maxExpand: 200,
            output: "html",
          });
          return (
            <span
              key={index}
              className={displayMode ? "block" : undefined}
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
