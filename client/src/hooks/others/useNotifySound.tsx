import { useRef } from "react";
import audio from "@assets/notification-sound.mp3";

function useNotifySound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audio);
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.warn("Audio play failed:", err);
    });
  };

  return { playSound };
}

export default useNotifySound;
