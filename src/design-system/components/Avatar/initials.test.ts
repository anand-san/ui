import { describe, expect, test } from 'bun:test';

import { getInitials } from './initials';

describe('getInitials', () => {
  test('uses the first two letters of a single word', () => {
    expect(getInitials('Linear')).toBe('LI');
  });

  test('uses the first letter of the first two words', () => {
    expect(getInitials('Acme Robotics Inc')).toBe('AR');
  });

  test('ignores extra whitespace', () => {
    expect(getInitials('  open   ai ')).toBe('OA');
  });

  test('keeps a one-letter name', () => {
    expect(getInitials('X')).toBe('X');
  });

  test('returns an empty string for a blank name', () => {
    expect(getInitials('   ')).toBe('');
  });

  test('does not split characters outside the basic plane', () => {
    expect(getInitials('𝔸lpha 𝔹eta')).toBe('𝔸𝔹');
  });
});
