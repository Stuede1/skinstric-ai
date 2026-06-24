/**
 * Shared helpers for the analysis/summary views.
 */

/** Capitalize the first letter of each word. */
export function capitalize(s: string): string {
  return s
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Sort object entries by value descending (highest confidence first). */
export function sortedEntries(obj: Record<string, number>): [string, number][] {
  return Object.entries(obj).sort(([, a], [, b]) => b - a)
}
