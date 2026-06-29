import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { TikTokPage } from "@remotion/captions";

const FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const SubtitlePage: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeInMs = (frame / fps) * 1000;

  // Pop-in animation for the whole caption page
  const enter = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 5,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "12%",
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          fontFamily: FONT_FAMILY,
          textAlign: "center",
          lineHeight: 1.15,
          maxWidth: "88%",
          transform: `scale(${enter})`,
        }}
      >
        {page.tokens.map((token, i) => {
          const active =
            timeInMs >= token.fromMs && timeInMs < token.toMs;
          // Words already spoken stay white, current word highlights
          const spoken = timeInMs >= token.fromMs;
          const scale = active
            ? interpolate(
                timeInMs,
                [token.fromMs, token.fromMs + 120],
                [1, 1.12],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            : 1;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                color: active ? "#FFE600" : spoken ? "#ffffff" : "#cfcfcf",
                transform: `scale(${scale})`,
                transition: "color 80ms linear",
                WebkitTextStroke: "2px rgba(0,0,0,0.85)",
                paintOrder: "stroke fill",
                textShadow:
                  "0 4px 18px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.9)",
                marginRight: "0.28em",
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
