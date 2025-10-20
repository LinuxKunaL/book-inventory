import { formatDuration } from "./format/formatDuration";

export async function getVideoDuration(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const durationSeconds = video.duration;
      const formatted = formatDuration(durationSeconds);
      resolve(formatted as string);
    };

    video.onerror = () => {
      reject("Failed to load video metadata");
    };

    video.src = url;
  });
}
