/** Minimal class-name joiner. Keeps the dependency list small. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
