export function parseCommaSeparatedOrigins(
  value: string | undefined,
): string[] {
  if (value === undefined || value.trim() === '') {
    return [];
  }

  return value
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}
