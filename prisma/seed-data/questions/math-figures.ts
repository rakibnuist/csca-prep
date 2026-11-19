import type { SeedQuestion } from "../types";
import first from "./math-figures.json";
import second from "./math-figures-2.json";

/**
 * Original Mathematics questions that ship with a diagram. Kept in JSON so the
 * same data can be inserted into an existing database without a full reseed.
 * Order matters: IDs are assigned sequentially (math-fig-001, math-fig-002, …).
 */
export const mathFigureQuestions: SeedQuestion[] = [
  ...first,
  ...second,
] as unknown as SeedQuestion[];
