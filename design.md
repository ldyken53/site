---
version: alpha
name: Melee Main Menu
description: >-
  A DESIGN.md that reproduces the look of the Main Menu in Super Smash Bros.
  Melee (GameCube, 2001): a deep navy wire-grid void crossed by glowing orbit
  rings, a rounded console frame whose hue follows the highlighted item, a
  zig-zag stack of chevron-ended black slab tabs with gold lettering and a
  black "P" cut into each gold cap, one tab lit solid yellow, a translucent
  teal "NEXT SCREEN" pane inside a wireframe box, and a captioned pill at the
  foot. Values were measured from in-game captures and a 60 fps recording;
  see the Overview for provenance.
colors:
  # ---- Background: the navy void -------------------------------------------
  surface: "#10112E"                 # base background navy
  surface-dim: "#0C0C28"             # darkest corners of the background
  surface-bright: "#1A1B48"          # background where the orbit rings pass
  surface-container-high: "#1F2148"  # wire-grid lines drawn over the background
  surface-container-lowest: "#04050E" # fill of unselected tabs and the caption pill
  on-surface: "#C8D8E6"              # pale text inside the preview pane
  on-surface-variant: "#B0B4BC"      # caption-pill text
  on-surface-dim: "#777A8A"          # screen title ("Main Menu") and "NEXT SCREEN" label
  # ---- Primary: Smash gold / yellow ----------------------------------------
  primary: "#FFCC00"                 # solid fill of the selected tab (exact in-game value)
  on-primary: "#000000"              # text on the selected tab
  primary-dim: "#D0A040"             # gold lettering on unselected tabs
  primary-container: "#9A7834"       # gold border and cap of unselected tabs (gradient #B8903F→#7A5C28)
  primary-bright: "#FBF06D"          # glowing ring of the selected tab's "P" marker
  on-primary-container: "#07070F"    # the black "P" glyph cut into the gold cap
  # ---- Secondary: the section-coloured console frame -----------------------
  secondary: "#4A56A8"               # frame line on the Main Menu (blue)
  secondary-bright: "#6799D3"        # frame highlight pass, preview-pane edge
  secondary-variant: "#C45244"       # frame hue while VS. Mode is highlighted or entered (red-orange)
  secondary-tint: "#1E9832"          # frame hue while Trophies is highlighted or entered (green)
  # ---- Tertiary: the teal glass preview pane -------------------------------
  tertiary-container: "rgba(0, 60, 56, 0.40)" # translucent glass over the background
  on-tertiary-container: "{colors.on-surface}"
  # ---- Outline ---------------------------------------------------------------
  outline: "#A1A4B6"                 # 2px light border of the caption pill
typography:
  headline-title:
    fontFamily: Folk Pro, Arimo, Liberation Sans, Arial, Helvetica, sans-serif
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.02em
    fontVariation: "'slnt' -12"
  label-tab:
    fontFamily: Folk Pro, Arimo, Liberation Sans, Arial, Helvetica, sans-serif
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.01em
  label-preview:
    fontFamily: Folk Pro, Arimo, Liberation Sans, Arial, Helvetica, sans-serif
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0.06em
    fontVariation: "'slnt' -12"
  label-vertical:
    fontFamily: Folk Pro, Arimo, Liberation Sans, Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.35em
  body-caption:
    fontFamily: Folk Pro, Arimo, Liberation Sans, Arial, Helvetica, sans-serif
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.04em
rounded:
  none: 0px
  sm: 12px
  lg: 44px
  full: 9999px
spacing:
  unit: 8px
  stage-width: 1280px
  stage-height: 960px
  grid-cell: 34px
  frame-margin-x: 96px
  frame-margin-top: 146px
  frame-margin-bottom: 80px
  frame-stroke: 3px
  tab-width: 600px
  tab-height: 78px
  tab-pitch: 98px
  tab-stagger: 56px
  tab-select-shift: 120px
  tab-chevron: 40px
  tab-shadow-offset: 6px
  tab-sub-height: 60px
  tab-sub-pitch: 80px
  preview-width: 310px
  preview-height: 380px
  caption-width: 750px
  caption-height: 78px
components:
  console-frame:
    backgroundColor: transparent
    rounded: "{rounded.lg}"
    padding: 48px
  screen-title:
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.headline-title}"
  menu-tab:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.primary-dim}"
    typography: "{typography.label-tab}"
    rounded: "{rounded.none}"
    width: "{spacing.tab-width}"
    height: "{spacing.tab-height}"
    padding: 0px
  menu-tab-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  menu-tab-marker:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    size: 52px
  menu-tab-marker-selected:
    backgroundColor: "{colors.primary-bright}"
    rounded: "{rounded.full}"
    size: 68px
  preview-pane:
    backgroundColor: "{colors.tertiary-container}"
    textColor: "{colors.on-tertiary-container}"
    typography: "{typography.label-preview}"
    rounded: "{rounded.none}"
    width: "{spacing.preview-width}"
    height: "{spacing.preview-height}"
    padding: 24px
  preview-pane-label:
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.label-vertical}"
  caption-pill:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-caption}"
    rounded: "{rounded.sm}"
    width: "{spacing.caption-width}"
    height: "{spacing.caption-height}"
    padding: 16px
  background-grid:
    backgroundColor: "{colors.surface}"
    size: "{spacing.grid-cell}"
---

# Melee Main Menu — DESIGN.md

## Overview

This design system reproduces the Main Menu of *Super Smash Bros. Melee* (HAL Laboratory / Nintendo, GameCube, 2001). The feeling is **early-2000s console sci-fi**: a dark navy void with a faint wire grid in perspective, large electric-blue orbit rings turning slowly behind everything, and a single rounded "console" frame in which chunky, chevron-ended slab tabs sit in a zig-zag stack. One tab is always lit in solid Smash-yellow; the rest are black with gold lettering. Everything is bold, confident and slightly oversized, built for a 480i television viewed from a couch, not for a desktop. The target audience is anyone who wants a game-launcher, mode-picker, or settings menu that feels like booting a GameCube in 2001 — the design reads instantly as "Melee" and nothing else.

The UI is **dense but shallow**: one screen holds the title, five choices, a preview of what the next screen contains, and a one-line caption. Navigation is vertical only; there are no nested panels, no scrolling, and no mouse affordances. Motion matters: the background rings turn continuously, the camera drifts, the selected tab slides right and pops forward as it lights up, its marker pulses, and whole screens swing away in 3D when you confirm. Treat the screen as a 4:3 stage; never let it become a responsive web page that reflows.

Three further sections of the system matter beyond this screen. First, the **frame hue follows the highlighted item**: with 1-P Mode highlighted the frame is blue, with VS. Mode it is red-orange, with Trophies it is green, and the hue crossfades as the cursor moves; entering a section keeps that section's hue, and the background rings tint toward it as well. Second, the **preview pane previews the next screen**, so its contents are a list of the sub-items of the highlighted tab, set in oblique type, with a rotated "NEXT SCREEN" label beside it. Third, there is one **caption pill** at the foot that describes the highlighted choice in a few words ("Solo Smash!").

Provenance: the hex values in the front matter were sampled from real in-game captures of the Main Menu and the VS. Mode → Special Melee sub-menu (793×591 captures of the 640×480 framebuffer) and from a 1920×1200, 60 fps Dolphin recording of the Main Menu, VS. Mode and Trophies screens, then de-noised. The recording also settled the tab silhouette, the "P" marker, the per-item frame hue and the transitions described below. `primary` (#FFCC00) and `on-primary` (#000000) are exact; the others are within a few units of the measured dominant colours. All dimensions were measured on those captures and are expressed for a 1280×960 design stage (exactly 2× the GameCube framebuffer). The original typeface is Morisawa's A-OTF Folk Pro (Bold) and, for some display text, Arial Black; labels in the game are pre-rendered white alpha textures tinted at draw time, which is why identical glyphs appear gold, black or white. The hues for Options and Data were never highlighted in any capture and are deliberately not specified; treat them as blue until measured.

## Colors

The palette is a near-black navy field with exactly one hot colour (yellow-gold) and one cool structural colour (the frame blue). Nothing else competes.

- **Surface — Navy Void (#10112E):** The base background. It is never flat: a grid of slightly lighter lines (`surface-container-high`, #1F2148) is drawn over it in perspective at the `grid-cell` pitch, and large glowing orbit rings — a thin bright filament (about #7F8CFF) inside a wide, soft additive band — drift and rotate behind the menu, lifting patches of the field to `surface-bright` (#1A1B48). Corners fall to `surface-dim` (#0C0C28).
- **Surface Container Lowest — Ink (#04050E):** The fill of every unselected tab and of the caption pill. It is deliberately darker than the background so the tabs read as solid objects sitting *on* the void.
- **Primary — Smash Yellow (#FFCC00):** Used for one thing only: the fill of the currently selected tab. It is the brightest, most saturated thing on screen and is the whole focus mechanism.
- **On Primary — Black (#000000):** Lettering on the selected tab.
- **Primary Dim — Antique Gold (#D0A040):** Lettering on unselected tabs. **Primary Container — Gold Slab (#9A7834):** the thick border of unselected tabs and the solid gold cap at their right end, rendered as a vertical gradient from #B8903F to #7A5C28 so the slab reads as lit from above. **On Primary Container (#07070F)** is the black "P" glyph cut into that cap.
- **Primary Bright — Ring Glow (#FBF06D):** The glowing ring that surrounds the "P" on the selected tab, plus the selected tab's own soft yellow bloom. It renders additively, so it blooms into a halo. The ring's inner "D" is a muted teal (about #5F7F7A).
- **Secondary — Console Blue (#4A56A8):** The frame line, the notched title header, the hatch marks and the wireframe preview box while 1-P Mode is highlighted. **Secondary Bright (#6799D3)** is the lighter highlight pass along the frame and the preview pane's edge. **Secondary Variant — VS Red (#C45244, highlight #E07B6B)** and **Secondary Tint — Trophies Green (#1E9832, highlight #6FD07A)** replace them when VS. Mode or Trophies is highlighted or entered; the frame crossfades between hues over roughly 400 ms as the cursor moves, and the background rings tint toward the same hue. Options and Data were never captured; keep them blue rather than inventing a colour.
- **Tertiary Container — Teal Glass (rgba(0, 60, 56, 0.40)):** The preview pane. It is a translucent dark-teal parallelogram floating inside the wireframe preview box, so the grid and rings remain visible through it, and its edge is a 1.5px line of the current hue's bright variant. **On Tertiary Container** is the same pale blue-white as `on-surface` (#C8D8E6).
- **On Surface Dim — Slate (#777A8A):** The screen title ("Main Menu") and the rotated "NEXT SCREEN" label. These are intentionally low-contrast: they are wayfinding, not content.
- **On Surface Variant (#B0B4BC)** and **Outline (#A1A4B6):** The text and 2px border of the caption pill.

## Typography

One typeface does almost everything: **A-OTF Folk Pro Bold** (Morisawa), a wide, heavy, slightly squared Japanese-market sans. It is commercial, so the token `fontFamily` lists it first and then falls back to **Arimo** (open-source, Arial-metric) and the system Arial/Helvetica, which carry the same wide bold proportions. Set everything in weight 700 except the small rotated label.

- **Screen title (`headline-title`, 44px):** Bold *oblique*, mixed case, in slate grey with a hard dark drop shadow. It sits above the frame's top-left corner inside the notched header, not inside the frame. One level down the header shows only the section name ("VS. Mode"); two levels down it shows parent and child side by side ("VS. Mode  Special Melee") and the notch widens to fit. Apply `font-style: italic` or a –12° synthetic slant (`'slnt' -12` where the font is variable); Folk itself has no true italic and the game obliques it.
- **Tab labels (`label-tab`, 48px):** Bold, upright, Title Case ("1-P Mode", "VS. Mode", "Trophies", "Options", "Data"), centred between the chevron and the gold cap with very slight tracking, and carrying a hard 2–3px dark drop shadow on unselected tabs (none on the selected tab). Never uppercase them. Sub-menu labels are smaller (40px) and condensed to about 86% width; long labels are condensed further (the game squeezes "Super Sudden Death" to fit) rather than wrapped.
- **Preview-pane items (`label-preview`, 30px):** Bold oblique, pale blue-white, left-aligned, generous tracking (0.06em), line-height ~1.25. Four to seven items, Title Case.
- **"NEXT SCREEN" (`label-vertical`, 16px):** Medium weight, ALL CAPS, 0.35em tracking, rotated 90° counter-clockwise (reads bottom-to-top) and placed in the gutter immediately left of the preview pane.
- **Caption (`body-caption`, 36px):** Bold, upright, centred, light grey, with 0.04em tracking. One short sentence with an exclamation mark is the house voice ("Solo Smash!", "Multiplayer battles!", "View trophies."). When a caption needs two lines it drops to ~26px, left-aligned, with wider tracking; the pill does not grow.

Where numerals or score-style display text are needed elsewhere, the game uses Arial Black; that is outside this screen and is noted only so agents do not substitute a different display face.

## Layout

The layout is a **fixed 4:3 stage** of `stage-width` × `stage-height` (1280 × 960, i.e. 2× the console's 640 × 480). Everything is positioned in stage pixels and the whole stage is scaled uniformly (letterboxed) to fit the viewport. Do not reflow, stack, or hide elements at other sizes.

Over the whole stage lies the **wire grid**: 1px lines of `surface-container-high` every `grid-cell` (34px), drawn under the frame and under the tabs but *through* the translucent preview pane.

Inside the stage sits one **console frame**: a rounded rectangle inset `frame-margin-x` (96px) from the left, `frame-margin-top` (146px) from the top, and `frame-margin-bottom` (80px) from the bottom, with its right edge inset ~84px (the frame is slightly left-heavy). Its top-left corner is cut away into a **notched header**: the frame line drops down to make room for the screen title, then rises back to the main top edge through a short diagonal ramp carrying three parallel hatch strokes. The title is set in that notch, outside the frame proper.

Within the frame the content is a two-column arrangement:

- **Left column — the tab stack.** Five tabs of `tab-width` × `tab-height` (600 × 78) on a vertical `tab-pitch` of 98px (20px gaps), starting ~60px below the frame's top edge. Tabs **zig-zag**: consecutive tabs are offset horizontally by about ±`tab-stagger` (56px) so their chevron ends do not line up. The selected tab additionally slides right by `tab-select-shift` (120px) so it overlaps the gutter toward the preview pane. Sub-menus keep the same `tab-width` but use `tab-sub-height` (60px) on a `tab-sub-pitch` of 80px, a wider zig-zag, and condensed labels; the stack can run to ten items.
- **Gutter — the "NEXT SCREEN" label.** A ~40px vertical strip between the tabs and the preview region holds the rotated label, vertically centred on the pane.
- **Right column — the preview box and pane.** The region is a **wireframe box** drawn in the frame hue: a front rectangle, a back rectangle ~90px deeper, and connecting edges, turned so its right edge is nearer the viewer than its left. Inside it floats the glass pane, `preview-width` × `preview-height` (310 × 380), as a parallelogram whose top and bottom edges slope down to the right by ~5° with its left and right edges equal in height. Flatten this only if you cannot transform.
- **Foot — the caption pill.** `caption-width` × `caption-height` (750 × 78), horizontally centred on the stage, straddling the frame's bottom edge. A thin divider in the frame hue runs across the frame at the pill's top edge, so the pill sits on a shallow bottom tray.

Spacing uses an 8px `unit`; internal paddings are 16px (pill), 24px (pane) and 48px (frame). There is no responsive grid because there is no responsiveness.

## Elevation & Depth

The menu is a genuine **3D scene**: a camera looks at a stack of planes, drifts slightly at rest, and swings when screens change. Depth is conveyed by **layering, parallax and light**; the only shadows are hard offset copies, never blurs.

- **Layer 0 — void:** `surface` with the grids in perspective and the orbit rings. The rings are large tori (radius ~500–1200px) with a thin bright filament and a wide soft additive band, rotating slowly on their own axes behind the menu; three or four are visible at once at low opacity. They tint toward the current frame hue.
- **Layer 1 — frame:** a 4px stroke of the frame hue with a wide (~14px) 20%-opacity glow pass behind it and a thin offset highlight of the hue's bright variant along the top and right edges, giving the line a neon double edge. No fill. The wireframe preview box sits ~120px behind this plane, turned ~16° so its right edge is nearer.
- **Layer 2 — tabs:** opaque ink slabs with a thick gradient gold border and a **hard shadow copy** of the whole silhouette in dark gold (#5C4518) offset by about `tab-shadow-offset` down and right; they occlude the grid, which is what makes them feel physical. The selected tab sits ~120px in front of the stack, is opaque `primary`, grows ~5%, and carries a soft yellow bloom (~14–28px) around its silhouette.
- **Layer 2 — preview pane:** translucent glass (`tertiary-container`) with a 1.5px edge in the hue's bright variant; the grid and rings show through, so it reads as further back than the tabs.
- **Layer 3 — the marker:** on the selected tab the "P" is drawn additively with a `primary-bright` ring and a radial halo (~1.4× the ring's diameter) that pulses between ~70% and 100% opacity on a ~1 s cycle.
- **Motion:** confirming makes the tabs fly out through the back of the scene one after another (~260 ms, ~26 ms stagger, turning as they go), the camera swings ~10° and the preview box folds further away and back (~640 ms); the new stack flies in the same way. Moving the cursor pops the new tab forward over ~220 ms with a small overshoot.

Text legibility shadows are hard offsets (2–3px) in near-black, never blurs.

## Shapes

The shape language is **sharp, angular objects inside one rounded chassis**.

- The **console frame** has large, soft corners (`rounded.lg`, 44px) like moulded plastic, with the top-left corner replaced by the notched header and its diagonal hatch ramp.
- **Tabs are chevron-and-cap bars**: a horizontal bar whose left end is cut to a point (a chevron `tab-chevron` 40px deep, apex slightly below the vertical centre) and whose right end is a full semicircle. The silhouette is identical in every state — selection never changes the shape, only the fill, the marker and the position. The dark interior ends about 78px before the right edge; the rest of the cap is solid gold.
- The **"P" marker** is a black glyph cut into that gold cap: a stem ~14px wide running from just inside the top edge to ~18px *below* the bar, a D-shaped bowl (outer radius ~26px) to its right, a gold counter (radius ~17px) and a small dark half-dot against the stem inside the counter. On the selected tab the same glyph is redrawn as a target: a thin dark stem, the bowl's D as a teal stroke, a yellow centre disc with a dark dot, and a bright ring in `primary-bright` with a halo around it (`menu-tab-marker-selected`).
- The **preview box** is a wireframe cuboid; the **preview pane** inside it is a parallelogram with square corners, sloped as described under Layout.
- The **caption pill** is a long rectangle with small rounded ends (`rounded.sm`, 12px) and a 2px `outline` border.
- Decorative strokes are thin and diagonal: three hatch lines in the title header, and an inner skewed outline framing the preview region.

## Components

### Console frame

A single rounded outline (`console-frame`) that contains the whole menu. Stroke the current hue — `secondary`, `secondary-variant` or `secondary-tint` depending on the highlighted item — at `frame-stroke` (4px) with the glow pass described under Elevation, the top-left notch with four hatch strokes, and the bottom tray divider. The screen title (`screen-title`) is set in the notch, bold oblique with a hard shadow; one level down it shows only the section name, two levels down parent and child side by side, and the notch widens to fit.

### Menu tab

The only interactive element. Use `menu-tab` for the resting state: `surface-container-lowest` interior, thick gradient `primary-container` border and solid gold cap, hard shadow copy, `primary-dim` label in `label-tab` with a dark drop shadow, chevron left end, and the black "P" (`menu-tab-marker`) cut into the cap. On selection switch to `menu-tab-selected`: the same silhouette filled `primary` edge to edge (no visible border), label `on-primary` with no shadow, a yellow bloom, the tab slides right by `tab-select-shift` and forward ~120px over ~220 ms with a small overshoot, and the "P" becomes the glowing target (`menu-tab-marker-selected`). The frame hue crossfades to the item's colour at the same time. Only one tab is ever selected; there is no separate hover state — the selection *is* the hover. Disabled or locked items are shown as the same tab with the label replaced by "?" characters, never greyed out. Keyboard/gamepad up/down moves the selection and wraps; confirm advances, back returns.

### Preview pane

`preview-pane` is the translucent teal glass panel listing the sub-items of the selected tab in `label-preview`, left-aligned, with the rotated `preview-pane-label` ("NEXT SCREEN") in its left gutter. When a selection changes, the list cross-fades (~150 ms); for screens with no list, the pane shows a dimmed thumbnail of the next screen instead (the game shows a ghosted character-select grid, for example).

### Image box

The preview box reused as a frame for images, such as publication thumbnails. It follows the preview box above, with these changes:

- **Tilts toward the pointer.** At rest it keeps the −16° turn; while the pointer is over it, the box turns to follow it (up to about ±14°) and eases back on leave. The game's box is static apart from screen transitions.
- **Shallower depth.** The back face sits about 40px behind the front instead of ~90px, so small images don't look stretched.
- **No parallelogram skew.** The pane stays rectangular so the image inside isn't distorted.
- **Large variant fits the image.** On a detail page the box turns only −6° (±6° of tilt) and takes the image's own aspect ratio, so nothing is cropped.

### Caption pill

`caption-pill` carries the one-line description of the selected item in `body-caption`, centred, inside a 2px `outline` border on an ink fill, straddling the frame's bottom edge. It updates instantly with the selection.

### Background

`background-grid` describes the stage: `surface` fill, 1px lines of `surface-container-high` on a `grid-cell` pitch, and the orbit rings on top. The background is shared by every screen in the section and never stops moving.

## Do's and Don'ts

- Do keep the whole menu on a fixed 4:3 stage and scale it uniformly; never reflow it into a responsive layout.
- Do use `primary` yellow for exactly one tab — the selected one — and nowhere else on the screen.
- Do keep the background moving: a static navy field with a grid reads as "generic dark UI", the drifting orbit rings and the resting camera drift are what read as Melee.
- Do zig-zag the tab stack; a left-aligned column of tabs loses the look immediately.
- Do keep tab labels in Title Case and condense long labels horizontally rather than wrapping or shrinking the tab.
- Do crossfade the frame hue (and tint the rings) to the highlighted item's colour — blue for 1-P Mode, red-orange for VS. Mode, green for Trophies — and keep that hue for every screen within the section.
- Do keep one silhouette for every tab state: chevron left, semicircular gold cap right, black "P" cut into the cap, stem hanging below the bar.
- Do give the tabs their hard offset shadow copy and thick gradient border; a thin-bordered flat bar reads as a web button, not a Melee slab.
- Don't change a tab's outline, width or corner treatment when it is selected; only its fill, marker, position and bloom change.
- Don't use blurred drop shadows anywhere; shadows are hard offset copies, and glow is reserved for the selected tab and its marker.
- Don't add a hover state distinct from selection, or a mouse cursor; the selection moves with up/down and that is the only focus indicator.
- Don't make the preview pane opaque — the grid and rings must remain visible through it — and don't draw the preview region flat; it is a wireframe box with its right edge nearer.
- Don't use a light or condensed typeface; everything is heavy (700) and wide, and the title and preview items are oblique.
- Don't grey out locked items; show them as normal tabs whose label is replaced with "?".
- Don't rely on `on-surface-dim` text for anything the player must read; it is for the title and the "NEXT SCREEN" label only.