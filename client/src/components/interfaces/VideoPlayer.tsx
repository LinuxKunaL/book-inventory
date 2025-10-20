import { useRef } from "react";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerTimeRange,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerTimeDisplay,
  VideoPlayerVolumeRange,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerFullscreenButton,
  type VideoPlayerContentProps,
} from "@components/interfaces/VideoPlayerLib";

function VideoPlayerView(props: VideoPlayerContentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreenToggle = async () => {
    if (screen.orientation) {
      (screen.orientation as any).lock("landscape");
    }
  };

  return (
    <VideoPlayer className="overflow-hidden h-full bg-gray-950 w-full">
      <VideoPlayerContent
        ref={videoRef}
        className={`h-full transition-transform duration-500`}
        preload="auto"
        slot="media"
        {...props}
      />

      <VideoPlayerControlBar className="m-0.5 sm:m-2 bg-gray-500/70 dark:bg-gray-700/70 backdrop-blur-md rounded-md space-x-1">
        <VideoPlayerPlayButton className="bg-transparent hover:bg-gray-600 rounded-l-md transition-all" />
        <VideoPlayerSeekBackwardButton className="bg-transparent hover:bg-gray-600 transition-all" />
        <VideoPlayerSeekForwardButton className="bg-transparent hover:bg-gray-600 transition-all" />
        <VideoPlayerTimeRange className="bg-transparent" />
        <VideoPlayerTimeDisplay
          showDuration
          className="bg-transparent hover:bg-gray-600 transition-all"
        />
        <VideoPlayerMuteButton className="bg-transparent hover:bg-gray-600 transition-all" />
        <VideoPlayerFullscreenButton
          className="bg-transparent hover:bg-gray-600 transition-all"
          onClick={handleFullscreenToggle}
        />
        <VideoPlayerVolumeRange className="bg-transparent hover:bg-gray-600 transition-all rounded-r-md sm:block hidden" />
      </VideoPlayerControlBar>
    </VideoPlayer>
  );
}

export default VideoPlayerView;
