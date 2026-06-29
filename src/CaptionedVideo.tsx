import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import {
  createTikTokStyleCaptions,
  type Caption,
} from "@remotion/captions";
import { SubtitlePage } from "./SubtitlePage";
import captionsData from "./captions.json";

// Group words into ~short on-screen "pages" (TikTok style)
const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const CaptionedVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  const captions = captionsData as Caption[];
  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile("source.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = (page.startMs / 1000) * fps;
        const endMs = nextPage ? nextPage.startMs : page.startMs + page.durationMs;
        const durationFrames = Math.max(
          1,
          Math.round(((endMs - page.startMs) / 1000) * fps)
        );
        return (
          <Sequence
            key={index}
            from={Math.round(startFrame)}
            durationInFrames={durationFrames}
          >
            <SubtitlePage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
