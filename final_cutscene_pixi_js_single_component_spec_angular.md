# Final Cutscene Implementation Spec (PixiJS, Single Angular Component)

This spec defines the **final cutscene** only. It must be implemented using **PixiJS** and contained entirely in a **single Angular component**.

Key requirements
- Embedded inside an existing Angular app.
- Implemented with PixiJS.
- Dialogue advances by **tap or click** (no auto-advance).
- All logic and rendering for this cutscene is within one Angular component.
- No emoji in dialogue text.

---

## 1) Component
**Name:** `FinalCutsceneComponent`

**Responsibilities (all inside this one component)**
- Create and manage the PixiJS Application.
- Load assets.
- Build scene graph (background, characters, dialogue UI, bouquet, proposal pose, buttons, confetti, end screen).
- Run dialogue timeline (manual advance on click/tap).
- Handle hover/pointer behavior for the No button.
- Handle Yes button to trigger confetti and show happy ending sprite.
- Show end options: Restart and Go to portfolio.

**Inputs (optional)**
- `memoryWords: string[]` (the 3 words chosen in Level 1)
- `onRestart?: () => void` or emit Angular `@Output()`
- `onGoToPortfolio?: () => void` or emit Angular `@Output()`

---

## 2) Assets needed
Place under your Angular assets folder, for example `src/assets/valentine/`.

### Background
- `bg_observatory.png` (already provided)

### Character sprites
- `snehal_happy.png` (already provided)
- `apoorv_idle.png` (already provided)

### Proposal pose
You need one additional Apoorv proposing sprite. Options:
- `apoorv_kneel_ring.png` (Apoorv on one knee holding butterfly ring)

Optional additional Snehal pose for proposal moment:
- `snehal_surprised.png` (or reuse `snehal_happy.png`)

### Bouquet
- `bouquet_sunflower_rose.png` (single combined bouquet image)

### Ending sprite
- `happily_ever_after.png` (Apoorv + Snehal together, celebratory)

### UI elements
Recommended as images or drawn shapes in Pixi:
- `dialogue_box.png` (optional, otherwise draw rounded rectangle)
- `btn_yes.png`, `btn_no.png`, `btn_restart.png`, `btn_portfolio.png` (optional, otherwise draw rounded rectangles and text)

### Effects
- `confetti_1.png` and `confetti_2.png` (small pieces) OR generate confetti with Pixi Graphics
- Optional: `sparkle.png` (small star particle)

### Fonts
Use system font or bundle a web font:
- `font_rounded.ttf` (optional)

---

## 3) Scene layout
Target design resolution: **1280 x 720**.
Scale to fit parent container while maintaining aspect ratio.

### Layers (Pixi Containers)
1. `bgLayer`
   - Background sprite: `bg_observatory.png`, set to cover.
2. `fxLayer`
   - Optional ambient subtle twinkle (simple alpha pulsing particles).
3. `charLayer`
   - Snehal sprite.
   - Apoorv sprite.
   - Later: replace Apoorv with kneeling sprite.
4. `uiLayer`
   - Dialogue box container.
   - Dialogue text.
   - Optional: memory words text.
   - Bouquet sprite (only visible at dialogue line 12).
   - Yes and No buttons (only visible after dialogue line 16 and proposal pose).
5. `overlayLayer`
   - Confetti (on Yes).
   - Happily ever after sprite.
   - End menu buttons: Restart, Go to portfolio.

### Suggested positioning (percentage based)
- Snehal: x = 0.72 * width, y = 0.60 * height, anchor = (0.5, 1)
- Apoorv idle: x = 0.28 * width, y = 0.60 * height, anchor = (0.5, 1)
- Apoorv kneel: x = 0.40 * width, y = 0.66 * height, anchor = (0.5, 1)
- Dialogue box: centered bottom, y = 0.76 * height, width = 0.88 * stage width
- Bouquet: above dialogue box right side, x = 0.68 * width, y = 0.50 * height, anchor = (0.5, 0.5)

---

## 4) Input and progression
### Tap or click to continue
- Any pointer tap/click on stage advances to the next dialogue line.
- If buttons are visible, stage click should not advance dialogue.

### Dialogue advance guard
- Debounce: ignore double taps within 150 ms.

---

## 5) Dialogue script (exact text required)
Use this as a fixed ordered array. Do not add or remove lines.

1. "Explorer Snehal… you made it."
2. "The sky looks extra soft tonight."
3. "I hope the adventure was fun, because I’m genuinely proud of you."
4. "And you chose: {WORDS}"
5. "That’s you. And that’s only a small piece of what I see in you."
6. "Never forget this: you are deeply loved."
7. "You cleared the foggy forest. Promise me you’ll choose your peace first."
8. "Because you matter to me the most."
9. "You conquered the Vibe Detector."
10. "I hope that clarity follows you, quietly and confidently, everywhere."
11. "And I wanted to give you that bouquet again, virtual this time."
12. "{BOUQUET_VISIBLE}"
13. "Finally, I’ve been carrying something in my chest."
14. "I never wanted loud love for days. I want steady love for years."
15. "So here’s my real question…"
16. "Will you hold my hand, and be mine, forever?"

Replacement rules
- `{WORDS}`: join `memoryWords` with commas. If missing, use a default set, for example: "warmth, depth, sunshine".
- `{BOUQUET_VISIBLE}`: keep the dialogue text empty or set it to a short line like "" and show the bouquet sprite. If you must show text, use: "" (empty) and rely on the bouquet visibility.

---

## 6) Scene actions triggered by dialogue index
Define a function `applyBeat(index)`.

### At start (index 1)
- Show Snehal sprite first.
- Show on-screen text line 1.

### When index advances to 2
- Bring Apoorv idle sprite on screen with a short fade-in.

### Lines 2 to 3
- No scene change beyond text.

### Line 4
- Render the chosen words visually.
  - Option A: inline within the dialogue text.
  - Option B: show them as three floating word chips above the dialogue box while keeping the dialogue text exactly line 4.

### Lines 5 to 6
- No scene change beyond text.

### Lines 7 to 10
- No background change, but optionally add a subtle fog twinkle overlay for line 7 only.

### Line 11
- Prepare bouquet sprite (hidden), slight scale-in animation ready.

### Line 12
- Show `bouquet_sunflower_rose.png` near Snehal.
- Keep dialogue text minimal for this beat if desired.

### Lines 13 to 15
- Subtle camera push: scale stage container from 1.00 to 1.04 over these beats.

### Line 16
- Switch Apoorv from idle to kneeling sprite `apoorv_kneel_ring.png` with a quick crossfade.
- Ensure Snehal is visible facing Apoorv.
- After line 16 appears, show Yes and No buttons.
- Disable further dialogue advance.

---

## 7) Proposal buttons behavior
Buttons appear only after line 16.

### Yes button
On click:
- Trigger confetti effect across the screen.
- Show `happily_ever_after.png` centered.
- Hide Yes and No buttons.
- Show end menu buttons: Restart and Go to portfolio.

### No button
Required behavior:
- The No button **runs away whenever the pointer approaches it**.
- After moving away, it **returns to its original position**.
- It is **not clickable**.

Implementation intent (behavioral spec)
- Track pointer move events.
- If pointer enters a proximity radius around the No button, animate the No button to a new offset position.
- After a short delay, animate it back to its original position.
- Ignore pointerdown on No.

Movement rules
- Proximity radius: 80 to 140 px (scale with screen).
- Escape vector: away from pointer direction.
- Clamp so button stays inside safe area.
- Return time: 450 to 650 ms.

---

## 8) Confetti effect
Two acceptable approaches:

### A) Graphics-based confetti (no assets)
- Spawn 80 to 140 particles.
- Random rectangles or triangles.
- Each falls with gravity, rotates, and fades.
- Duration: 1.5 to 2.5 seconds.

### B) Sprite-based confetti
- Use `confetti_1.png` and `confetti_2.png` and randomize rotation and scale.

---

## 9) End screen
After Yes completes:
- Display two buttons:
  - Restart
  - Go to portfolio

Behavior
- Restart: call `onRestart` or emit `restart` event.
- Go to portfolio: call `onGoToPortfolio` or emit `goToPortfolio` event.

---

## 10) PixiJS lifecycle inside Angular component
Single-component structure requirements
- Create `PIXI.Application` in `ngAfterViewInit`.
- Append `app.view` canvas to a `ViewChild` container div.
- Load assets via `PIXI.Assets.load` or Pixi Loader.
- Build containers and sprites after load.
- On `ngOnDestroy`, destroy Pixi app: `app.destroy(true, { children: true, texture: true, baseTexture: true })`.

Resize behavior
- On window resize, recompute scale factor to fit container while preserving aspect ratio.
- Reposition sprites using percentages.

Pointer events
- Enable `eventMode = 'static'` and `interactive = true` on relevant containers.

---

## 11) Acceptance tests
- Clicking or tapping advances dialogue one line at a time.
- Snehal appears first, then Apoorv appears at dialogue 2.
- Line 4 shows the chosen words.
- Bouquet appears only at line 12.
- Apoorv kneels and ring is visible at line 16.
- Yes triggers confetti and happily ever after sprite.
- No button cannot be clicked and dodges pointer approach, then returns.
- Restart and Go to portfolio appear at the end.
- All implemented in a single Angular component.

