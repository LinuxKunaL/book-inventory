export function getThumbnailUrl(filename: string): string {
  return `${import.meta.env.VITE_API_URL}/api/other/uploads?type=thumbnail&filename=${filename}`;
}
