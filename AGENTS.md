# AGENTS.md

## Purpose

This repo is a Remotion caption renderer for Skool/course clips. Agents use it to turn source media plus timed caption JSON into a captioned MP4.

## Start

```bash
npm install
npm run dev
```

## Render

```bash
npm run render
```

Output goes to `out/captioned.mp4`.

## Agent Rules

- Replace `public/source.mp4`, `public/audio.wav`, and `src/captions.json` for each job.
- Do not commit user/client media unless it is a sanitized fixture.
- Do not commit `out/`.
- Check captions for timing, line breaks, and legibility before final delivery.
- Keep the first screen usable in Remotion Studio; do not make the project depend on private local paths.
