export function secondsToHours(seconds: number): string {
  const hours = seconds / 3600;
  const rounded = parseFloat(hours.toFixed(1));
  if (Number.isInteger(rounded)) {
    return `${rounded}`;
  }

  return `${rounded}`;
}
