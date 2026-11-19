/**
 * Paper-library counts.
 *
 * These are the numbers the marketing pages quote. They live in one place so
 * that a page cannot quote a different number from another, and `prisma/seed.ts`
 * asserts them against the database — if the content ever changes without
 * this file being updated, the seed fails loudly instead of the site quietly
 * lying.
 */
export const PAPER_STATS = {
  /** Every published paper. */
  total: 176,
  /** Original mocks — one per subject, written from scratch. */
  originals: 5,
  /** Practice sets assembled from the question bank. */
  sets: 150,
  /** Official past papers, transcribed. */
  official: 15,
  /** Reconstructed review modules. */
  review: 6,
  /** Questions in the bank. */
  questions: 2867,
} as const;

/** Papers a student can sit on the clock. */
export const SITTABLE_PAPERS = PAPER_STATS.originals + PAPER_STATS.sets;
