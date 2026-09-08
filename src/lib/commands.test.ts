import { expect, test } from 'bun:test';
import { matches } from './commands';
test('fuzzy matching is case-insensitive, ordered and handles empty/no results', () => {
  expect(matches('vnt', 'vs-notrack')).toBe(true);
  expect(matches('  WORK ', 'View work ls')).toBe(true);
  expect(matches('', 'About')).toBe(true);
  expect(matches('zzz', 'About')).toBe(false);
  expect(matches('ba', 'ab')).toBe(false);
});
