import { expect, test } from 'bun:test';
import { terminalCommands, terminalReply } from './terminal';
import { stepSpring } from './motion/spring';
test('terminal predefined commands stay bounded and data-backed', () => {
  for (const command of terminalCommands) expect(typeof terminalReply(command)).toBe('string');
  expect(terminalReply(' WHOAMI ')).toBe('nohint404');
  expect(terminalReply('cat   README.md')).toContain('toy');
  expect(terminalReply('projects')).toContain('fraa2a');
  expect(terminalReply('contact')).toContain('contact@nohint.dev');
  expect(terminalReply('<script>alert(1)</script>')).toContain('Unknown command');
  expect(terminalReply('rm -rf /')).toContain('suspense');
  expect(terminalReply('clear')).toBe('');
});
test('spring settles, survives large deltas and can reverse in flight', () => {
  let state = { position: 0, velocity: 0 };
  for (let i=0;i<300;i++) state = stepSpring(state, 10, 1/60);
  expect(state).toEqual({ position: 10, velocity: 0 });
  state = stepSpring(state, -10, 1000);
  expect(Number.isFinite(state.position)).toBe(true);
  for (let i=0;i<300;i++) state = stepSpring(state, -10, 1/144);
  expect(state).toEqual({ position: -10, velocity: 0 });
});
