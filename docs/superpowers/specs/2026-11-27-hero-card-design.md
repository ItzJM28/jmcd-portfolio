# Hero card, wordmark, video and number tiles (short design)

Date: 2026-11-27. Status: approved by the user ("Yes, build it") from the
sketch `hero-v1`.

## Why

The user is applying for front-end roles. They want the top of the bento
page to look like a reference portfolio shot that has:

- a big "About me" intro card with a portrait in a ring
- a large wordmark
- a video tile with a play button
- bold number tiles

Everything stays in the site's dark theme and palette.

## Approaches

There is one sensible way: extend the existing bento grid (`components/bento/*`).

- A separate hero section above the grid was rejected because the filters
  would no longer cover the hero.
- A rebuild was rejected because the grid, filters, panel and tests already
  work.

## Design

### Desktop (≥1024 px, 4 columns, explicit placement)

- **Intro card** (About), column 1, rows 1–3. It contains:
  - a blue (`blue`) card with a dark "✦ About me" notch tab
  - a white ring around a sandy circle holding the animated JD mark, which
    stands in until the user sends a photo
  - the visible `h1` "I'm **John Martin**", plus "Demonteverde, Front-End
    Developer" for screen readers only
  - the email as a `mailto:` link with a mail icon
  - a rotating circular badge reading "FRONT-END DEVELOPER · OPEN TO WORK ·",
    with no year so it never goes stale
- **Wordmark "Portfolio"** (About), columns 2–4, row 1. It is large and
  heavy, with a corner tick.
- **Video tile** (About), columns 2–3, rows 2–3. It has:
  - a colourful gradient poster
  - a pulsing play button
  - the caption "Showreel · coming soon"
  - clicking shows the status "Showreel coming soon"
  - when `profile.showreel` (a video URL) is set, the tile plays that video
    in place instead
- **Number tiles**, column 4:
  - row 2: **4** "Projects shipped" (Work, `vanilla`), which is `projects.length`
  - row 3: **24** "Tools I build with" (About, `green`), which is the count
    of unique ids in `skills`
- **Side menu:** the filters (All · About · Work · Contact) run vertically
  in a column left of the grid. The header pills are hidden at this width.
- **The rest:** the previous tiles follow below, except the old intro tile,
  which the card replaces. The toolkit and location tiles become 2×1 so the
  grid has no holes: 20 cells below the hero.

### Phones and tablets (<1024 px, 2 columns, in DOM order)

1. wordmark (2×1)
2. intro card (2×3)
3. video (2×1)
4. the two number tiles side by side
5. the rest

The header pills stay at this width, and there is no side menu.

## Scroll motion (added by the user mid-build: "make it scrollable and have animations and motion")

- **Scroll reveal.**
  - Tiles now animate in when they scroll into view, not all at once on
    load. Each tile fades up and scales from 0.96 when it enters the
    viewport.
  - This uses the `IntersectionObserver` in `useInView`, which adds
    `data-inview`.
  - Tiles already on screen at load reveal immediately with the existing
    stagger.
  - Without JavaScript, everything is visible.
- **Parallax in the hero, while it is on screen:**
  - the wordmark drifts left as you scroll down
  - the photo circle rises slower than the card
  - the badge spins faster with scroll velocity
  - It's driven by Motion's `useScroll` and `useTransform`. Reduced motion
    gets no parallax, because `MotionConfig` disables transforms.
- **Number tiles count up** from 0 when they scroll into view. The final
  number is in the server HTML.
- **Smooth in-page scrolling** for the side menu and pills: picking a
  filter scrolls to the top of the grid when the grid is off screen.

## Rules kept

- The numbers are counted from content, never typed in by hand.
- No geometric decoration beyond the reference's corner ticks and the
  ring around the photo.
- Reduced motion stops:
  - the badge spin
  - the play pulse
  - the entrances

## Left to the builder

The exact type sizes, gradient stops and badge text spacing.
