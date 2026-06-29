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

The default composition reads:

- `public/source.mp4` — the source video.
- `public/audio.wav` — the audio track.
- `src/captions.json` — timed captions.

Caption entries use millisecond timing:

```json
[
  {
    "text": "Welcome to the lesson.",
    "startMs": 0,
    "endMs": 1200
  }
]
```

If you transcribe a new clip, replace `src/captions.json` and the files under `public/`, then preview before rendering.

## Scripts

```bash
npm run dev
npm run render
```

`transcribe.py` is a small helper for generating captions from local media. It expects the user's local transcription setup and should be treated as optional.

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
