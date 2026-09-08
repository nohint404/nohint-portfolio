export type Command = { label: string; aliases: string; href?: string; action?: 'clear' | 'help' | 'copy' | 'pwd' };
export function matches(query: string, text: string): boolean {
  const needle = query.trim().toLowerCase();
  const haystack = text.toLowerCase();
  let cursor = 0;
  for (const character of needle) {
    cursor = haystack.indexOf(character, cursor);
    if (cursor < 0) return false;
    cursor++;
  }
  return true;
}
