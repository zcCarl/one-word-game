# owg-gpt-asset-prompting

## Use When

The agent creates prompts for GPT image generation.

## Required Inputs

- `docs/art/gpt-asset-production-pipeline.md`
- Current GDD and content tables

## Workflow

1. Start with global style, camera, palette, and negative constraints.
2. Write one prompt per production asset.
3. Specify transparent background where needed.
4. Specify readable small-icon target size.
5. Keep prompts original and production-oriented.

## Output Standard

- Global prompt
- Negative constraints
- Asset prompt list
- Size/background requirements
- Regeneration notes

## Hard Rules

- Do not let every agent generate their own mismatched art.
- Do not use copyrighted character/style references.
- Prompts must be specific enough for batch generation.

