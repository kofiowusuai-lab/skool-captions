import React from "react";
import { Composition, staticFile } from "remotion";
import { CaptionedVideo } from "./CaptionedVideo";

// Source: Skool Video for About section.mov -> 1288x730, 60fps, 32.0967s
const FPS = 60;
const WIDTH = 1288;
const HEIGHT = 730;
const DURATION_IN_FRAMES = Math.round(32.096667 * FPS); // 1926

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="CaptionedVideo"
      component={CaptionedVideo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
