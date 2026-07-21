# Slides

`workshop-1-intro-slides.pptx` — the projector deck for the workshop (8 slides,
with facilitator speaker notes on each).

## Regenerating the deck

The deck is generated from `generate-slides.js`. To rebuild it after edits:

```bash
npm install pptxgenjs
node generate-slides.js
```

This writes `workshop-1-intro-slides.pptx`. Edit the text/colors in the script,
not the `.pptx` directly, so changes stay reproducible.
