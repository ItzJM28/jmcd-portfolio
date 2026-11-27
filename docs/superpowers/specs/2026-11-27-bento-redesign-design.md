# Bento redesign of the home page

Date: 2026-11-27
Status: waiting for approval (builder check done)

## Why

John Martin is starting to apply for front-end roles. He feels the current
home page is "too simple and not really interesting to look at". He wants
more motion, a page that works well on phones, and his current color theme.

His reference is mchiu.co.uk, a product designer's portfolio laid out as a
grid of rounded tiles ("bento"). It has filter pills, and many tiles carry
their own small live animation. We take that pattern and leave its look
behind. Nothing from that site (art, copy, illustrations, layout specifics)
is copied.

The readers are hiring managers, recruiters and engineering leads who skim
for under a minute on desktop or phone (see `PRODUCT.md`). Within a few
seconds they should be able to see what he built, where he worked, and how
to reach him or get the résumé.

## Goals

- Replace the stacked home page (Hero, Work, Experience, Skills, Contact)
  with one bento grid that shows everything on a screen or two.
- Make the page feel alive through motion that serves the content:
  - filter reflow
  - tile hover
  - a project tile opening into a details panel
  - a few small looping touches
- Make it solidly responsive: 4 columns on desktop, 2 on tablet and phone.
  Nothing overlaps, and every link can be reached on a phone.
- Keep the content model: all text comes from `lib/content.ts`.

## Non-goals

- No change to the résumé page (`/resume`), the résumé dialog, or the
  `/api/contact` route.
- No light theme or theme toggle.
- No new content, such as a blog, testimonials or metrics.
- No redesign of the project apps themselves.

## Anti-goals (a failure even if it technically works)

- It looks like a copy of mchiu.co.uk or of JD Creates.
- Motion that gets in the way of reading:
  - anything that blocks the first paint
  - scroll-jacking
  - loops that distract from the text
  - motion that ignores "reduce motion"
- Invented numbers or claims. `PRODUCT.md` rules out testimonials, metrics,
  client names and stated years of experience.
- Geometric decoration. The user explicitly dropped the floating
  circle, half-circle and square shapes. They must not come back anywhere
  on the home page, including as backdrops behind project tiles or in the
  contact section.
- A page that is slower to load or harder to use on a phone than today's.

## Constraints

- **Stack.** Next.js 16 (App Router, Turbopack), React 19, Tailwind 4, all
  already in the repo. Fonts are Inter and JetBrains Mono, self-hosted.
- **Colors** (from `PRODUCT.md`):
  - Background `#0C120C`, with white text.
  - Accents only: Vanilla Custard `#F2F3AE`, Light Gold `#EDD382`, Sandy
    Brown `#FC9E4F`, Fiery Terracotta `#F4442E`, green `#16DB65`, blue
    `#2176FF`.
  - The one exception is app logos, which keep their own colors: PeraFlow
    green `#34b98a`, QR Generator orange `#f55a00`. These are the apps'
    identities, not part of the site palette.
- **Deploy.** Pushing to `master` on ItzJM28/jmcd-portfolio auto-deploys to
  jdbuilds.vercel.app.
- **Accessibility.**
  - Every tile that does something is a real link or button with a
    visible focus ring.
  - The filter is a group of buttons that report which one is pressed
    (`aria-pressed`).
  - The project panel is a dialog: focus moves into it, Escape closes it,
    and focus goes back to the tile.
  - With `prefers-reduced-motion`, everything shows instantly. There are
    no loops, the filter changes without moving tiles, and the panel
    opens with no expand animation.
- **Performance.** Motion adds about 35 KB gzipped of JavaScript. Hold the
  line elsewhere: tile animations are CSS where possible, and the
  `motion` code only runs in the client components that need it.

## Approaches considered

1. **Motion library (chosen).**
   - Uses `motion` (the current package name for Framer Motion). JD Creates
     already uses it, and its `Tile`, `Work` and `ProjectModal` components
     can be adapted.
   - Gives smooth layout animation when filtering, a tile that expands into
     its details panel (shared layout), and springy hover.
   - Costs about 35 KB of JavaScript.
2. **No library.** Plain CSS plus the browser's View Transitions API.
   - Lightest option.
   - The filter animation only runs in newer browsers; in others the tiles
     jump.
   - The tile-to-panel expansion isn't possible, so the panel would just
     fade in.
   - Rejected because the smooth filter and expanding tile are the moments
     that make the page feel alive.
3. **Clone JD Creates and recolor it.**
   - Fastest.
   - Rejected because a recruiter who opens both sites would see the same
     site twice.

The user picked approach 1.

## The design (as agreed with the user)

The approved sketch is "bento v4" from the brainstorming session. It is
the reference for layout and feel; this document wins where they differ.

### Header

- A sticky bar with the JD mark on the left, the filter pills in the
  center, and the gold "Résumé" button on the right.
- **Filter pills:** All · About · Work · Contact. A gold highlight slides
  to the active pill. The default is All.
- On phones (<1024 px), the pills stay visible, sized to fit 375 px wide,
  and the header Résumé button is hidden. The gold résumé tile (tile 12)
  covers it. The tile shows at every width, so desktop has two résumé
  entry points (header plus tile), the same as the approved sketch.
  *(Builder-check call.)*
- The old Work / Experience / Contact anchor links go away; the pills
  replace them. On phones this fixes the problem that "Experience" was
  hidden.
- The scroll progress bar under the header stays.

### Grid

- 4 equal columns on desktop (≥1024 px), 2 below that, filled densely in
  order (`grid-auto-flow: dense`).
- Base row height is about 150 px. Tiles span 1×1, 2×1, 1×2 or 2×2.
- Tiles have rounded corners (about 22 px) and a dark tile background a
  step lighter than the page, with a 1 px line border.
- **Filtering:** tiles that don't match fade to low opacity and stay in
  place; they can't be clicked or focused. The approved sketch dims; it
  doesn't hide. Matching tiles give a small scale "pop" in a stagger.
- The filter also updates the URL hash (`#work`, `#about`, `#contact`), so
  old links to `/#work` and friends still land on a filtered view.

### Tiles, in order, with their category

1. **Intro (About, 2×1)**
   - A "JD" badge inside a slowly rotating ring made of the accent colors.
   - "Hey 👋 I'm **John Martin Demonteverde**…", using the role line from
     content.
   - The pulsing green "Open to front-end roles" dot.
2. **Copy email (Contact, 1×1)**
   - Clicking copies `profile.email` to the clipboard and shows an "Email
     copied" chip that slides down.
   - Falls back to `mailto:` when the Clipboard API isn't available.
3. **LinkedIn (Contact, 1×1).** Opens `profile.linkedin` in a new tab.
4. **PeraFlow (Work, 2×2, featured).** Shows the app's logo; see Project
   tiles below.
5. **JD Creates (Work, 1×2).** Shows the JD mark as its logo.
6. **Toolkit (About, 1×1).** Three rows of tech names scrolling slowly
   (marquee), alternating direction, taken from `skills`.
7. **Experience (About, 2×1).** One line per role and for education:
   colored marker, role, company, period. Taken from `experience` and
   `education`.
8. **QR Generator (Work, 2×1).**
9. **Lynko (Work, 1×1).**
10. **Location (About, 1×1).**
    - A dark grid "map" with a pulsing blue pin.
    - The label is "Bacolod, PH", from a new `profile.locationShort`
      field in `content.ts`. `profile.location` keeps its full value for
      other uses. *(Builder-check call.)*
11. **GitHub (Contact, 1×1).** Opens `profile.github`.
12. **Résumé (Contact, 1×1).**
    - A gold tile labelled "View résumé" with a small arrow. `ResumeLink`
      opens the résumé dialog, which has its own download button, so
      "Download" would be wrong. *(Builder-check call.)*
    - It uses the existing `ResumeLink`, so behavior matches today's
      résumé button.

The footer stays below the grid (© line).

### Project tiles

- **Logo, not screenshot.** Each project tile shows the app's own logo,
  centered in big tiles and top-left in small tiles. Behind it is a soft
  radial glow in the app's color, and below it the title and one-line
  summary.
  - **PeraFlow:** a green rounded square with the PeraFlow "₱" mark, the
    same path as `BrandMark` in the budget-app repo.
  - **JD Creates:** the JD mark, already in `components/logo.tsx`.
  - **QR Generator:** an orange (`#f55a00`) rounded square with the QR
    glyph. This is the app's favicon from ItzJM28/web-qr-code-generator
    `index.html`: `viewBox="0 0 24 24"`, white fill, with path
    `M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h2v2h-2zM17 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2z`.
  - **PeraFlow path, for reference:** `BrandMark` is a 24×24 stroke icon:
    stroke width 2.2, round caps and joins, on `#34b98a` with
    `#06140f` ink. Its paths are `M6 20V5h7a4.5 4.5 0 0 1 0 9H6` and
    `M3 9.5h12M3 13h9`.
  - **Lynko:** it has no logo yet. Use the two-ring mark currently on the
    portfolio with a small "stand-in logo" note. Today that mark lives in
    `components/sections.tsx`, inside the Lynko card's no-image branch:
    two `<circle>`s, r 38, stroke width 18, terracotta, `viewBox 0 0 200 100`.
    Move it into its own component before deleting `sections.tsx`. Swap it when the user
    supplies a real one.
- **Motion:**
  - The logo bobs very gently, by about 4 px.
  - On hover or focus it lifts, scales a little, tilts a few degrees, and
    its glow grows.
  - The corner ↗ chip turns gold and rotates.
- **Click opens the project panel.**
  - The tile expands into a dialog using Motion's shared layout.
  - The panel contains:
    - the logo and title
    - the summary and detail text
    - the stack as icon chips (the existing `TechIcon`)
    - "Visit site" (when there's a `liveUrl`) and "Source code" buttons
    - the existing screenshot from `public/work/` as a picture of the app.
      When a project has no `image` (Lynko), the panel shows the logo
      large in that spot instead, and there is no "Visit site" button
      because there is no `liveUrl`. *(Builder-check call.)*
  - Close with ×, Escape, or a backdrop click.
- **Data change.** Add a `logo` field to `Project` in `lib/content.ts`
  (component or path plus a background color). Keep `image` for the panel.

### Phones and tablets (<1024 px)

- 2 columns:
  - 2×2 and 2×1 tiles span the full width.
  - 1×2 tiles keep their 2-row height.
  - 1×1 tiles sit in pairs.
- No hover effects. Tapping a project opens the panel full-screen, sliding
  up from the bottom.
- Test at 375, 414, 768 and 1024 px wide. No horizontal scroll, and no
  text overlapping logos (the sketch hit this, so check it on purpose).

### What goes away

- The "developer.ts" code window (`components/code-window.tsx`). The hero
  text moves into the intro tile.
- All geometric shapes and backdrops: the blue circle and orange half-circle
  in the hero, the per-project backdrops, and the shape field in the contact
  section. Remove the `drift` and `pop` reveal CSS if nothing uses it any
  more.
- The `<SelectedWork />`-style code headings.
- The large "Hiring a front-end developer?" contact section. Contact lives
  in the four Contact tiles. The footer keeps the © line.

## Left to the builder

- Exact spring and easing values, stagger timing, and loop durations,
  within the feel of the sketch: quick, soft, never more than about 600 ms
  for an interaction.
- File and component layout. A reasonable split is `components/bento/`
  with `grid.tsx`, `tile.tsx`, `filter-pills.tsx`, `project-panel.tsx`,
  and a small file per special tile. Delete `sections.tsx` and
  `code-window.tsx` once nothing imports them.
- Whether the toolkit marquee uses the existing `TechIcon` chips or text
  only. Use whichever reads better at tile size.
- Metadata (`app/layout.tsx` title and description) stays unless something
  breaks.

## Process

- Build only after the user approves this document.
- Before changing anything, record a Lighthouse mobile baseline of the
  current production site. That gives "no slower than today" a number.
- Show the user the change in the live local preview (`preview_start`
  "portfolio", port 3200). Claude then pushes to `master`, which
  auto-deploys, and checks the production URL.
- Leave `public/work/hiraya.png` alone. It is not Lynko's screenshot.

## How we'll know it's done

- It matches the approved sketch's layout and feel on desktop and on phone.
- Lighthouse on the production URL, mobile:
  - performance and accessibility each at least 90
  - performance no lower than the baseline
- Keyboard only: you can filter, open and close a project, copy the email
  and download the résumé.
- With reduce-motion turned on, nothing loops or moves.
- The user has seen it in the live local preview before it's pushed.
