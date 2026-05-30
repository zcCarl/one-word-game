# owg-audio-feedback

## Use When

The agent designs or implements audio feedback.

## Required Inputs

- `src/game/audio.ts`
- Gameplay event list

## Workflow

1. Define SFX for reveal, attack, hurt, pickup, buy, level, victory, defeat, and error.
2. Start with WebAudio synthesized sounds for MVP.
3. Define future replacement file names under `assets/audio/`.
4. Keep sounds short and non-fatiguing.
5. Ensure gameplay still works when audio is blocked.

## Output Standard

- Audio cue table
- WebAudio notes or asset file list
- Volume hierarchy
- Replacement backlog

## Hard Rules

- Do not block MVP on final BGM.
- Do not autoplay intrusive sound before user interaction.
- Do not let audio errors break gameplay.

