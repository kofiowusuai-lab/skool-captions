# skool-captions

Remotion project for rendering captioned Skool-style lesson clips from a source video, audio track, and timed caption JSON.

The repo is intentionally small: clone it, replace the sample media/captions, preview in Remotion Studio, then render a captioned MP4.

## Quick Start

```bash
git clone https://github.com/kofiowusuai-lab/skool-captions.git
cd skool-captions
npm install
npm run dev
```

Render the default composition:

```bash
npm run render
```

Default output:

```text
out/captioned.mp4
```

## Inputs

The rendering and transcription paths use:

- `public/source.mp4` — the source video.
- `public/audio.wav` — optional transcription input; it is not mixed into the render.
- `src/captions.json` — timed captions.

Caption entries use millisecond timing:

```json
[
  {
    "text": "Welcome to the lesson.",
    "startMs": 0,
    "endMs": 1200,
    "timestampMs": 600,
    "confidence": 1
  }
]
```

If you transcribe a new clip, replace `src/captions.json` and the files under `public/`, then preview before rendering.

## Scripts

```bash
npm run dev
npm run render
```

`transcribe.py` is an optional local Whisper helper. It reads `public/audio.wav` and overwrites `src/captions.json`; see the transcription steps below.

## Agent Quick Start

When another user gives this repo link to an agent, the expected flow is:

```bash
git clone https://github.com/kofiowusuai-lab/skool-captions.git
cd skool-captions
npm install
npm run dev
```

For a real render:

1. Put the user's source video at `public/source.mp4`.
2. Put the user's audio at `public/audio.wav`.
3. Replace `src/captions.json` with timed captions.
4. Run `npm run render`.
5. Review `out/captioned.mp4`.

Agent operating rules are in `AGENTS.md`.

## Safety

- Do not commit rendered videos in `out/`.
- Do not commit client/private media unless it is an intentional sanitized fixture.
- Keep generated transcription artifacts local unless the user asks to publish them.

## Requirements and current scope

Use Node.js/npm compatible with the pinned Remotion 4.0.370 and React 19 dependencies. No Node engine range is declared. `npm ci` installs from the committed lockfile. Rendering requires no cloud API keys.

This is a fixed lesson composition, not an automatic media-duration detector. [src/Root.tsx](src/Root.tsx) registers `CaptionedVideo` at **1288 × 730**, **60 fps**, and **1926 frames** (about 32.1 seconds). Update those constants for a different source duration or aspect ratio. The source is fitted with `objectFit: cover`, which may crop videos with other proportions.

## Local transcription

Install Python 3, FFmpeg on PATH, and the optional `openai-whisper` package in a virtual environment. The first transcription downloads the `small.en` model and can take time; this helper is configured for English.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install openai-whisper
ffmpeg -i public/source.mp4 -vn public/audio.wav
python transcribe.py
npm run dev
npm run render
```

The helper writes word-level entries with `text`, `startMs`, `endMs`, `timestampMs`, and `confidence`. All timing fields are milliseconds. Keep word whitespace and order intact, then correct transcription errors before rendering. Back up any manually edited caption file before rerunning the helper.

## Rendering walkthrough

[src/index.ts](src/index.ts) registers the root. [src/CaptionedVideo.tsx](src/CaptionedVideo.tsx) plays `source.mp4`, groups caption tokens into pages using a 1200 ms combining window, and places each page in a frame-timed sequence. [src/SubtitlePage.tsx](src/SubtitlePage.tsx) controls text appearance. The output retains the source video's audio; `audio.wav` serves only the optional transcription helper.

There is no separate automated test script. Use Studio to check the beginning, word transitions, line breaks, and final caption, then review `out/captioned.mp4` with sound. `npm run render` is the available render check, not a unit test.

## Troubleshooting and limitations

- Missing source: place readable media at `public/source.mp4`; generated/private media is not guaranteed to ship with a clone.
- Silent output: verify the source MP4 contains an audio stream; a separate `audio.wav` is not automatically muxed.
- Early cutoff or excess blank time: adjust root duration to the source; replacing media does not update metadata.
- Caption timing drift: verify millisecond inputs and that transcription audio matches the final source edit.
- Missing Python module or FFmpeg: activate the environment used to install Whisper and check FFmpeg is on PATH.

Keep footage, extracted audio, model downloads, and rendered outputs local. Follow [AGENTS.md](AGENTS.md) for job handling.

## Licensing

This repository does not include a top-level license file. Confirm reuse terms with the owner; dependencies and any bundled media retain their own licenses.
