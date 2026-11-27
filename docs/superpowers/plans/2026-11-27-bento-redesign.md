# Bento Home Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stacked home page with a filterable, animated bento
grid of 12 tiles. Project tiles show app logos and expand into a details
panel. The page works at 375 px to desktop.

**Architecture:**
- **Filter state** lives in the URL hash, read through one small hook.
  The header pills and the grid stay in sync without shared React context,
  and old `/#work`-style links keep working.
- **Animation:** Motion (`motion/react`) handles grid layout animation, the
  tile-to-panel shared-layout expansion and hover springs. Looping
  decoration stays in CSS.
- **Content:** all text comes from `lib/content.ts`.

**Tech Stack:**
- Already in the repo: Next.js 16.2.7 (App Router), React 19.2, Tailwind 4,
  lucide-react.
- Added: `motion@14.14.0`.
- Dev only: `vitest@5.1.2`, `@testing-library/react`, `jsdom`,
  `@vitejs/plugin-react`.

**Spec:** `docs/superpowers/specs/2026-11-27-bento-redesign-design.md`.
Read it before starting; it is the source of every value below.

## Global Constraints

- **Palette.** Use only the Tailwind tokens in `app/globals.css`:
  `navy`, `navy-2`, `navy-3`, `line`, `ink`, `ink-2`, `ink-3`,
  `vanilla`, `gold`, `sandy`, `terracotta`, `green`, `blue`.
  - Exceptions: PeraFlow logo `#34b98a` with ink `#06140f`, and
    QR Generator logo `#f55a00`.
- **No geometric decoration anywhere on the home page.** That means no
  floating circles, half-circles or squares, and no backdrops behind
  tiles.
- **No invented numbers or claims.** No testimonials, metrics, client names
  or years of experience.
- **Reduced motion.** With `prefers-reduced-motion: reduce`: no loops,
  filtering doesn't move tiles, the panel opens without expanding, and
  content is never hidden.
- **Interaction timing.** Interaction animations finish within about
  600 ms.
- **Accessibility.**
  - Every interactive tile is a real `<a>` or `<button>` with a visible
    `focus-visible` ring.
  - The filter buttons use `aria-pressed`.
  - The panel is `role="dialog"` with `aria-modal="true"`, labelled by the
    project title. Escape closes it, and focus returns to the tile.
- **No layout shift on load.** Server-rendered HTML shows every tile at
  full opacity, and nothing starts hidden.
- **Files.** CRLF line endings are used in existing files; keep each file's
  existing ending when you edit it.
- **Deploying.** Never push to `master` until the user has seen the live
  local preview. A push deploys to production.
- **Commits.** End every commit message with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Old or unknown hash.**
   - `/#experience` was a real anchor, so it must open with **About**
     selected.
   - `/#contact`, `/#work` and `/#about` select their own filter.
   - Any other hash (`#foo`, an empty `#`) selects **All**.
   - Owned by Task 1 (`parseFilter`).
2. **Clipboard unavailable or denied.** Copy email must fall back to
   opening `mailto:` and must never throw. Owned by Task 4.
3. **Focus inside a tile that a filter dims.** Dimmed tiles become `inert`,
   so focus must not get stuck on them. Keyboard users keep reaching the
   matching tiles. Owned by Task 4.
4. **320–375 px phones.** The four filter pills plus the JD mark must fit
   without horizontal scroll, and the header Résumé button is hidden
   below 1024 px. Owned by Task 3 (test) and Task 6 (visual check).
5. **Opening a project, then changing the hash** (back button or a filter
   click behind the panel). The panel stays usable and closes cleanly, and
   focus never lands on an inert tile. Owned by Task 5.

---

### Task 0: Lighthouse baseline

**Files:**
- Create: `docs/superpowers/plans/2026-11-27-lighthouse-baseline.md`

- [ ] **Step 1:** Run
  `npx lighthouse https://jdbuilds.vercel.app --preset=perf --form-factor=mobile --only-categories=performance,accessibility --output=json --output-path=./lh-before.json --chrome-flags="--headless=new"`.
  - Use the Edge binary via `CHROME_PATH` if Chrome is missing:
    `/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`.
  - Expected: a JSON file is written.
- [ ] **Step 2:** Record the performance and accessibility scores, LCP and
  total JS transfer size in the baseline file. Delete `lh-before.json`.
- [ ] **Step 3:** Commit `docs: record Lighthouse baseline before bento redesign`.

### Task 1: Test setup, filter logic and content model

**Files:**
- Modify: `package.json`
  - Add devDeps vitest, @testing-library/react, jsdom and
    @vitejs/plugin-react.
  - Add script `"test": "vitest run"`.
- Create: `vitest.config.ts`
  - `environment: "jsdom"`, the react plugin, and the alias
    `@` → project root.
- Create: `lib/filter.ts`
- Modify: `lib/content.ts`
- Test: `tests/filter.test.ts`, `tests/content.test.ts`

**Interfaces:**
- Produces:
  - `type Filter = "all" | "about" | "work" | "contact"`
  - `type Category = Exclude<Filter, "all">`
  - `FILTERS: readonly Filter[] = ["all", "about", "work", "contact"]`
  - `parseFilter(hash: string): Filter`
  - `filterToHash(f: Filter): string`, which returns `""` for `"all"`, else
    `"#" + f`
  - `matches(category: Category, f: Filter): boolean`
  - Additions to `lib/content.ts`:
    - `profile.locationShort = "Bacolod, PH"`
    - `Project.logo: ProjectLogoId`, where
      `type ProjectLogoId = "peraflow" | "jdcreates" | "qr" | "lynko"`
    - `Project.glow: string`, a CSS colour for the tile glow: peraflow
      `#34b98a`, jdcreates `var(--color-gold)`, qr `#f55a00`, lynko
      `var(--color-terracotta)`

- [ ] **Step 1: Write failing tests**

```ts
// tests/filter.test.ts
expect(parseFilter("#work")).toBe("work");
expect(parseFilter("#about")).toBe("about");
expect(parseFilter("#contact")).toBe("contact");
expect(parseFilter("#experience")).toBe("about");
expect(parseFilter("")).toBe("all");
expect(parseFilter("#")).toBe("all");
expect(parseFilter("#foo")).toBe("all");
expect(parseFilter("#WORK")).toBe("work");
expect(filterToHash("all")).toBe("");
expect(filterToHash("work")).toBe("#work");
expect(matches("work", "all")).toBe(true);
expect(matches("work", "work")).toBe(true);
expect(matches("about", "work")).toBe(false);

// tests/content.test.ts
expect(profile.locationShort).toBe("Bacolod, PH");
expect(projects.map((p) => p.logo)).toEqual(["peraflow", "jdcreates", "qr", "lynko"]);
expect(projects.find((p) => p.slug === "lynko")!.image).toBeUndefined();
expect(projects.every((p) => p.glow.length > 0)).toBe(true);
```

- [ ] **Step 2:** Run `npm i -D vitest@5.1.2 @testing-library/react jsdom @vitejs/plugin-react && npm test`.
  Expected: FAIL (module `@/lib/filter` not found, `locationShort`
  undefined).
- [ ] **Step 3:** Implement `lib/filter.ts`, and add the fields to
  `lib/content.ts`.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: filter model and project logo fields`.

### Task 2: Project logos

**Files:**
- Create: `components/bento/project-logo.tsx`
- Test: `tests/project-logo.test.tsx`

**Interfaces:**
- Consumes: `ProjectLogoId` (Task 1), and `Mark` from `components/logo.tsx`.
- Produces: `ProjectLogo({ id, className }: { id: ProjectLogoId; className?: string })`.
  It renders a rounded-square tile (`rounded-[24%]`, `aspect-square`)
  with an `aria-hidden` SVG inside, and sets `data-logo={id}`.
- Marks, with exact values from the spec:
  - **peraflow:** bg `#34b98a`, stroke `#06140f`, `viewBox 0 0 24 24`,
    stroke width 2.2, round caps and joins. Paths:
    - `M6 20V5h7a4.5 4.5 0 0 1 0 9H6`
    - `M3 9.5h12M3 13h9`
  - **jdcreates:** bg `navy` with a 1 px `line` border, and `<Mark />` in
    `ink` at 52% width.
  - **qr:** bg `#f55a00`, white fill, `viewBox 0 0 24 24`, path
    `M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h2v2h-2zM17 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2z`.
  - **lynko:** bg `#1a1f2e`, `viewBox 0 0 200 100`. Two circles at cx 70
    and cx 130, cy 50, r 38, no fill, stroke `terracotta`, stroke width 18.
    The second circle has `mix-blend-mode: screen`.
- [ ] **Step 1: Failing test.** Render each id, then assert:
  - `container.querySelector("[data-logo=qr] path")?.getAttribute("d")`
    starts with `"M5 5h6v6H5z"`
  - lynko renders exactly 2 `circle`s
  - jdcreates contains the Mark path, which starts with `"M586 0h73"`
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: project logo marks`.

### Task 3: Hash filter hook and header pills

**Files:**
- Create: `lib/use-filter.ts`
- Create: `components/bento/filter-pills.tsx`
- Modify: `components/site-header.tsx`
  - Replace the Work / Experience / Contact link list with
    `<FilterPills />`.
  - Add `hidden lg:inline-flex` to the Résumé button.
- Test: `tests/filter-pills.test.tsx`

**Interfaces:**
- Consumes: `parseFilter`, `filterToHash`, `FILTERS` (Task 1).
- Produces:
  - `useFilter(): [Filter, (f: Filter) => void]`
    - It reads `location.hash` on mount and on `hashchange`.
    - The server snapshot is `"all"`. Use `useSyncExternalStore`.
    - The setter calls `history.replaceState(null, "", filterToHash(f) || location.pathname)`
      and then dispatches a `hashchange` event, so every subscriber
      updates and the page doesn't jump.
  - `FilterPills()`:
    - On `/`, it renders a `role="group"` with `aria-label="Filter tiles"`
      containing four `<button aria-pressed>` labelled All, About, Work,
      Contact.
    - On other paths (`usePathname() !== "/"`), it renders four `<a>`s
      with `href="/" + filterToHash(f)`.
    - The active highlight is a gold `motion.span` with
      `layoutId="pill"` and a spring. Reduced motion is handled by
      `MotionConfig reducedMotion="user"` from Task 4.
- [ ] **Step 1: Failing tests.**
  - Render at `/` and click "Work". Expect:
    - "Work" has `aria-pressed="true"` and "All" has `"false"`
    - `location.hash === "#work"`
  - Set `location.hash = "#experience"` and dispatch `hashchange`.
    Expect "About" to have `aria-pressed="true"`.
  - Mock `usePathname` to `/resume`. Expect "Work" to be a link with
    `href="/#work"`.
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implement. Pills are `text-xs px-3 h-8` below `sm` and
  `text-sm px-4 h-9` from `sm` up, so all four plus the logo fit at
  320 px.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: header filter pills synced to URL hash`.

### Task 4: Grid, tile shell and the eight non-project tiles

**Files:**
- Create: `components/bento/motion-root.tsx`
  - `"use client"`.
  - Wraps its children in `<MotionConfig reducedMotion="user">`.
  - Mounted in `app/layout.tsx` around `<main>`.
- Create: `components/bento/tile.tsx`
- Create: `components/bento/bento-grid.tsx`
- Create: `components/bento/tiles.tsx`
  - Contains `IntroTile`, `CopyEmailTile`, `LinkTile`, `ToolkitTile`,
    `ExperienceTile`, `LocationTile` and `ResumeTile`.
- Modify: `app/globals.css`
  - Add keyframes `marquee`, `ring-spin`, `ping-soft` and `bob`.
  - Each is disabled under `prefers-reduced-motion`.
- Test: `tests/tiles.test.tsx`, `tests/bento-grid.test.tsx`

**Interfaces:**
- Consumes: `useFilter`, `matches`, `Category` (Tasks 1 and 3), `profile`,
  `experience`, `education`, `skills`, `tech`, `ResumeLink`.
- Produces:
  - `Tile({ category, span, className, children }: { category: Category; span: "1x1" | "2x1" | "1x2" | "2x2"; className?: string; children: ReactNode })`
    - It is a `motion.div` with `layout`.
    - Spans map to grid classes:
      - `2x1` → `col-span-2`
      - `1x2` → `row-span-2`
      - `2x2` → `col-span-2 row-span-2`
    - Look: `rounded-[22px] border border-line bg-navy-2 p-4 overflow-hidden relative`.
    - When it doesn't match the filter: `inert`, `aria-hidden`,
      `opacity-15 grayscale blur-[2px]`, transition 350 ms.
    - It sets `data-dimmed`.
  - `BentoGrid()`:
    - It is a `<section aria-label="Portfolio">` holding the grid
      `grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] lg:auto-rows-[150px] gap-3 [grid-auto-flow:dense]`.
    - It renders the 12 tiles in spec order and categories. Task 5 fills
      the four project slots with `ProjectTile`.
    - When the filter changes, matching tiles do a stagger "pop" (scale
      0.96 → 1, 25 ms stagger).
- Tile content, using the spec's tile list:
  - **Intro:** the JD badge inside a conic accent ring (`ring-spin` 10 s
    on the ring only; the badge text does not rotate). It shows "Hey 👋
    I'm **{profile.name}**, a front-end developer building responsive,
    accessible web apps with React, Next.js and TypeScript.", then the
    green ping dot and "Open to front-end roles".
  - **CopyEmailTile:** a `<button>`.
    - `onClick`: `navigator.clipboard?.writeText(profile.email)`, then
      show "Email copied" for 1.6 s.
    - If `navigator.clipboard` is undefined or the promise rejects, set
      `location.href = "mailto:" + profile.email`.
    - Label: "Copy email".
  - **LinkTile:** used for LinkedIn and GitHub. It takes `{ href, label, icon }`
    and renders an `<a target="_blank" rel="noopener noreferrer">`.
  - **ToolkitTile:** three marquee rows, one per `skills` group, using
    tech names. The text is doubled for a seamless loop, and the rows
    alternate direction.
  - **ExperienceTile:** one row each for the two `experience` items and
    `education`. Each row has a colored marker (`hue`; education is
    `gold`), the role or degree, the company, and the period in mono.
  - **LocationTile:** a CSS grid-line "map" with a pulsing blue pin,
    labelled `profile.locationShort`.
  - **ResumeTile:** `<ResumeLink>` filling the tile, `bg-gold text-navy`,
    with the text "View résumé ↗".
- [ ] **Step 1: Failing tests.**
  - Copy email, success: mock `navigator.clipboard.writeText` to resolve.
    After clicking, `writeText` was called with `profile.email` and
    "Email copied" is visible.
  - Copy email, failure: set `navigator.clipboard` to undefined. After
    clicking, `location.href` is `"mailto:" + profile.email` (stub
    `location` assignment). It does not throw.
  - Grid with `location.hash="#work"`: every tile with `data-category`
    other than `work` has the `inert` attribute and `data-dimmed`. The
    four project tiles do not.
  - Grid with no hash: no tile has `inert`, and the count of
    `[data-category]` is 12.
  - LocationTile shows "Bacolod, PH".
  - ResumeTile is a link to `/resume` with the text "View résumé".
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implement, with placeholder project slots that render
  `<Tile category="work">` around the title.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: bento grid with filterable tiles`.

### Task 5: Project tiles and project panel

**Files:**
- Create: `components/bento/project-tile.tsx`
- Create: `components/bento/project-panel.tsx`
- Modify: `components/bento/bento-grid.tsx`
  - Replace the placeholders.
  - Hold `openSlug` state.
  - Render `<ProjectPanel>` inside `AnimatePresence`.
- Test: `tests/project-panel.test.tsx`

**Interfaces:**
- Consumes: `Tile`, `ProjectLogo`, `projects`, `TechIcon`, `tech`.
- Produces:
  - `ProjectTile({ project, span, onOpen }: { project: Project; span: Span; onOpen: (slug: string, trigger: HTMLElement) => void })`.
    - The whole tile is a `<button aria-haspopup="dialog">` with
      `motion` `layoutId={"project-" + slug}`.
    - Its background is a radial glow,
      `color-mix(in srgb, glow 14%, transparent)` over `navy-2`.
    - The logo is centered on 2×2 and 1×2 tiles, and top-left at 50 px on
      the others. Small tiles hide the eyebrow label.
    - The logo bobs (CSS `bob`, 5 s, 4 px).
    - On hover or focus it springs to `y:-6, scale:1.08, rotate:-4`,
      the glow shadow grows, and the corner ↗ chip turns gold and rotates
      45°.
    - The title and summary sit at the bottom-left.
    - Lynko shows the mono note "stand-in logo".
    - Spans: peraflow `2x2`, jdcreates `1x2`, qr `2x1`, lynko `1x1`.
  - `ProjectPanel({ project, onClose }: { project: Project; onClose: () => void })`.
    - It is a `motion.div` with `role="dialog" aria-modal="true" aria-labelledby`,
      using the same `layoutId`, so it expands from the tile.
    - Desktop: centered, `max-w-3xl`. Below `lg`: full screen, entering
      from the bottom.
    - Contents:
      - the logo, title (`h2`), summary, detail and `TechIcon` chips
      - "Visit site" only when `liveUrl` is set, plus "Source code"
      - the `next/image` screenshot when `image` is set; otherwise the
        logo at a large size in the same spot
    - Close with the × button, Escape, or a backdrop click.
    - While it's open, `body` overflow is hidden.
    - Focus goes to the close button on open and back to the trigger
      element on close.
    - It also closes on `hashchange`.
- [ ] **Step 1: Failing tests.**
  - Click the PeraFlow tile. Expect:
    - `getByRole("dialog", { name: "PeraFlow" })` exists
    - the "Visit site" link `href` is `"https://peraflowph.vercel.app"`
    - the close button has focus
  - Press Escape. The dialog is gone and the PeraFlow tile button has
    focus.
  - Open Lynko. Expect:
    - no "Visit site" link
    - no `img`
    - `[data-logo=lynko]` is inside the dialog
    - "Source code" `href` is `"https://github.com/ItzJM28/lynko"`
  - Open QR, then dispatch `hashchange` with `#about`. The dialog closes,
    and `document.activeElement` is not inside an `[inert]` element.
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implement. Use `AnimatePresence` exit for close. Reuse
  the open/Escape/overflow pattern from
  `../gdp/src/components/ProjectModal.tsx`, but not its gallery or
  arrow-key slides.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: project tiles expand into a details panel`.

### Task 6: Swap the home page, remove the old sections, verify in the browser

**Files:**
- Modify: `app/page.tsx`. It renders
  `<div className="mx-auto max-w-6xl px-4 py-6 sm:px-6"><BentoGrid /></div>`.
- Delete:
  - `components/sections.tsx`
  - `components/code-window.tsx`
  - any part of `components/text.tsx` that is no longer imported
    (`SplitWords`, `TypeIn`), if unused after the swap
- Modify: `app/globals.css`.
  - Remove the `drift` rules, the `pop` reveal variant and the `type`
    (typewriter) rules if nothing references them. Check with
    `grep -rn "drift\|data-reveal=\"pop\"\|TypeIn" app components`.
  - Keep `scroll-progress`.
- Modify: `components/motion.tsx`. Keep `RevealObserver` only if some
  `[data-reveal]` remains; otherwise remove it and its mount in
  `app/layout.tsx`.

**Interfaces:** consumes `BentoGrid`.

- [ ] **Step 1:** Run `npm test && npm run lint && npm run build`.
  Expected: all pass, and `/` and `/resume` are prerendered.
- [ ] **Step 2:** Run the live preview with `preview_start` "portfolio"
  (port 3200). Check each of these:
  - Widths 1280, 1024, 768, 414, 375 and 320:
    - no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`)
    - no text overlapping logos
    - pills fit
  - Keyboard only:
    - Tab to the pills and choose Work
    - Tab reaches only the 4 project tiles
    - Enter opens a panel, Escape closes it, and focus returns
  - Emulate `prefers-reduced-motion: reduce`: no loops, and the filter
    and panel are instant.
  - No geometric shapes appear anywhere on `/`.
  - `/#experience` loads with About selected.
- [ ] **Step 3:** Commit
  `feat: bento home page replaces stacked sections`.

### Task 7: User preview, deploy and Lighthouse check

- [ ] **Step 1:** Show the user the live preview at http://localhost:3200
  and wait for their go-ahead. Apply any changes they ask for, and re-run
  Task 6 Step 1.
- [ ] **Step 2:** Run `git push origin master`. Then poll the Vercel
  deployments for project `prj_QQwuJ876MobxhgJW76PpZwZqPrHb` until it is
  READY.
- [ ] **Step 3:** Run the Task 0 Lighthouse command against production.
  - Expected: performance ≥ 90, accessibility ≥ 90, and performance no
    lower than the baseline.
  - Record the result in the baseline file and commit
    `docs: record Lighthouse after bento redesign`.
  - If it falls short, report the numbers to the user rather than
    claiming done.
