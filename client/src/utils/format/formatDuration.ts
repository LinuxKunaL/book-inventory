export function formatDuration(seconds: number) {
  seconds = Math.floor(seconds);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const twoDigits = (num: number) => num.toString().padStart(2, "0");

  if (hrs > 0) {
    return `${hrs}:${twoDigits(mins)}:${twoDigits(secs)}`;
  } else {
    return `${twoDigits(mins)}:${twoDigits(secs)}`;
  }
}
