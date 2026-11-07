/** Score thresholds on a 0 to 10 scale */
export function scoreTone(score: number) {
  if (score >= 6) return 'text-success';
  if (score >= 4.5) return 'text-warning';
  return 'text-destructive';
}
