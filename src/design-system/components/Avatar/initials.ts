/**
 * Up to two letters for an avatar: the first letter of the first two words,
 * or the first two letters of a single word. "Northwind" → "NO",
 * "Acme Robotics Inc" → "AR".
 */
export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  if (words.length === 1)
    return Array.from(words[0]).slice(0, 2).join('').toUpperCase();
  return words
    .slice(0, 2)
    .map(word => Array.from(word)[0])
    .join('')
    .toUpperCase();
}
