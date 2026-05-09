# PaleoLink Beta — Fix Changelog

All changes made during the code review are logged here.
Each entry includes: file changed, what was wrong, what was fixed, and which section it belongs to.
Entries are appended in order — nothing is ever overwritten.

---

<!-- Fixes will be appended below as each section is completed -->

---

## [2026-05-08] Ultra-Instinct Session 1 — Performance & Dead Code Pass

---

### Fix UI-1 — Move static data arrays to module level
**Type:** PERF
**File(s) changed:**
- `src/App.tsx` — `scientists`, `marketItems`, `digSites` moved from inside `DigSiteLocator` to module-level constants

**Before:** All three arrays declared inside the component body — new array objects allocated on every render.
**After:** Declared once at module level; component reads stable references.
**Linked step:** progress.md > Milestone 1 > item 1

---

### Fix UI-2 — Move WeatherAnimation to module level (fixes React identity bug)
**Type:** PERF
**File(s) changed:**
- `src/App.tsx` — `WeatherAnimation` moved from inside `DigSiteLocator` to module level

**Before:** Inner component definition caused React to treat it as a new component type on every parent render, unmounting and remounting all 6 weather animation instances.
**After:** Stable component identity; animations persist across parent re-renders.
**Linked step:** progress.md > Milestone 1 > item 2

---

### Fix UI-3 — Move pure helper functions to module level
**Type:** PERF
**File(s) changed:**
- `src/App.tsx` — `calculateSafetyRisk`, `getWeatherColor`, `getWeatherIcon`, `getSiteIcon` moved from inside `DigSiteLocator` to module level

**Before:** Four pure functions re-created as new function objects on every render.
**After:** Stable function references defined once at module scope.
**Linked step:** progress.md > Milestone 1 > item 3

---

### Fix UI-4 — Extract resourceMap and sourceTypeIcon to pathfinder constants
**Type:** PERF + ARCH
**File(s) changed:**
- `src/features/pathfinder/constants.tsx` (created) — exports `resourceMap` and `sourceTypeIcon`
- `src/App.tsx` — imports from constants, removes inline declarations from `.map()` callback

**Before:** `resourceMap` (large object, ~40 lines) redeclared inside the `.map()` callback — rebuilt for every matched site on every render. `sourceTypeIcon` also redeclared per iteration.
**After:** Single stable module-level constants; `.map()` callback reads them by reference.
**Linked step:** progress.md > Milestone 1 > item 4

---

### Fix UI-5 — Move inline CSS from JSX `<style>` block to index.css
**Type:** QUAL
**File(s) changed:**
- `src/index.css` — added keyframes (slideInFromLeft, slideInFromBottom, scaleIn, glowPulse) and utility classes
- `src/App.tsx` — removed inline `<style>{...}</style>` block from JSX return

**Before:** CSS injected via a JSX `<style>` string on every render, creating a DOM `<style>` element inside the component tree.
**After:** CSS compiled statically by Vite/PostCSS at build time.
**Linked step:** progress.md > Milestone 2 > item 1

---

### Fix UI-6 — Remove unused lucide-react imports
**Type:** DX
**File(s) changed:**
- `src/App.tsx` — removed `DollarSign`, `TrendingUp`, `Radio`, `Zap`, `Droplets`, `Thermometer`, `Building2`, `GraduationCap`, `Truck` from import line

**Before:** 9 icon imports that were either never used (`DollarSign`, `TrendingUp`) or only used in code now extracted to the pathfinder constants file.
**After:** Import line contains only icons actually used in App.tsx.
**Linked step:** progress.md > Milestone 2 > item 2

---

### Fix UI-7 — Delete unused src/assets/react.svg
**Type:** DX
**File(s) changed:**
- `src/assets/react.svg` (deleted) — Vite scaffold default, never imported

**Before:** Dead file from `npm create vite` scaffold.
**After:** Removed.
**Linked step:** progress.md > Milestone 2 > item 3

---

## Section 1 — Folder Structure & Architecture
**Completed:** 2026-05-07

---

### Fix 1.1 — Extract all TypeScript types to `src/types/index.ts`
**File changed:** `src/types/index.ts` (created), `src/App.tsx` (modified)
**What was wrong:** All domain types and interfaces (`WeatherCondition`, `SiteType`, `WeatherSeverity`, `MainTab`, `SafetyProfile`, `DigSite`, `Scientist`, `MarketItem`) were defined inline at the top of `App.tsx`. This is a type-based organization anti-pattern — types scattered inside components make them impossible to share across features without circular dependencies.
**What was fixed:** Moved all 4 union types and 4 interfaces to `src/types/index.ts` with named exports. Updated `App.tsx` to use `import type { ... } from './types'`.
**Why:** Type definitions have zero runtime cost and should be centralized so every feature can import them without coupling to `App.tsx`.

---

### Fix 1.2 — Extract `EXTENSIONS` to `src/constants/extensions.ts`
**File changed:** `src/constants/extensions.ts` (created), `src/App.tsx` (modified — const removed)
**What was wrong:** `const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']` was defined at module scope in `App.tsx` — a utility constant with no relation to the app's component tree.
**What was fixed:** Moved to `src/constants/extensions.ts`. The `ImageWithFallback` component (moved in Fix 1.3) imports it directly from there.
**Why:** Constants are shared infrastructure; co-locating them with components creates unnecessary coupling.

---

### Fix 1.3 — Move `ImageWithFallback` to `src/components/shared/ImageWithFallback.tsx`
**File changed:** `src/components/shared/ImageWithFallback.tsx` (created), `src/App.tsx` (modified — component definition removed)
**What was wrong:** `ImageWithFallback` is a fully independent, reusable React component (manages its own state, has no knowledge of dig sites or scientists). Embedding it at the top of `App.tsx` is a clear single-responsibility violation.
**What was fixed:** Extracted to `src/components/shared/ImageWithFallback.tsx`. Handles its own `react` and `lucide-react` imports. `App.tsx` now imports it as `import ImageWithFallback from './components/shared/ImageWithFallback'`.
**Why:** Shared utility components belong in a shared layer, not inside the file of the feature that first happened to need them. This also makes `src/components/shared/` the clear home for future shared components.

---

### Fix 1.4 — Create feature-based folder scaffold
**Files changed:** Directory tree created
**What was wrong:** `src/components/` was empty — no structure existed for organizing the 1,524-line monolith when splitting begins in Section 2.
**What was fixed:** Created the target feature-based directory tree:
```
src/features/{expedition,scientists,marketplace,pathfinder}/
src/features/expedition/{components,hooks,utils}/
src/features/{scientists,marketplace,pathfinder}/components/
src/hooks/
src/utils/
```
**Why:** Establishing the scaffold before refactoring ensures Section 2 has a defined home for every extracted piece. Feature-based folders (by domain) scale better than type-based folders (all components together, all hooks together) because related files stay co-located.

---

## Section 2 — Component Architecture
**Completed:** 2026-05-08

---

### Fix 2.1 — Extract expedition utility helpers
**Files changed:** `src/features/expedition/utils/safetyHelpers.ts`, `src/features/expedition/utils/weatherHelpers.tsx`, `src/features/expedition/utils/WeatherAnimation.tsx`, `src/hooks/useIntroSplash.ts`
**What was wrong:** `calculateSafetyRisk`, `getWeatherColor`, `getWeatherIcon`, `getSiteIcon`, and `WeatherAnimation` were at module level in `App.tsx`. `showIntro` timer logic was duplicated inside the component.
**What was fixed:** Moved each to its correct feature utils/hooks home with proper `import type` for types.

---

### Fix 2.2 — Extract data constants
**Files changed:** `src/constants/digSites.ts`, `src/features/scientists/constants.ts`, `src/features/marketplace/constants.ts`
**What was wrong:** Static data arrays (`digSites`, `scientists`, `marketItems`) lived at module level in `App.tsx` — mixing data and orchestration.
**What was fixed:** Each array extracted to its feature's constants file with `import type`.

---

### Fix 2.3 — Extract IntroSplash, ScientistCard, MarketItemRow, StatsFooter
**Files changed:** `src/components/shared/IntroSplash.tsx`, `src/features/scientists/components/ScientistCard.tsx`, `src/features/marketplace/components/MarketItemRow.tsx`, `src/features/expedition/components/StatsFooter.tsx`
**What was wrong:** Four independent, reusable UI units were inlined in `App.tsx`.
**What was fixed:** Each extracted to its domain folder with typed props.

---

### Fix 2.4 — Extract SiteDetailPanel
**Files changed:** `src/features/expedition/components/SiteDetailPanel.tsx`
**What was wrong:** The site detail panel (portal, animation, 3 tabs, safety/3D/details content) was 300+ lines inlined inside a `.map()` in `App.tsx`. Panel state (`animatingItems`, `activeTab`, `showModel`, `panelRef`) all lived in the parent.
**What was fixed:** Extracted to `SiteDetailPanel` with props `{ site, onClose }`. Component now owns its own ref, state, and opening animation `useEffect`. Close handler animates out then calls `onClose()`. `createPortal` is internal.

---

### Fix 2.5 — Extract SiteResourceCard
**Files changed:** `src/features/pathfinder/components/SiteResourceCard.tsx`
**What was wrong:** Per-site Pathfinder resource card (header, alert, resource grid) inlined in a filtered `.map()` in `App.tsx`.
**What was fixed:** Extracted to `SiteResourceCard` with `{ site: DigSite }` prop, imports `resourceMap`/`sourceTypeIcon` from `../constants`.

---

### Fix 2.6 — Extract WorldMap
**Files changed:** `src/features/expedition/components/WorldMap.tsx`
**What was wrong:** The entire world map section (header, legend, map container, weather layers, site markers) was inline in `App.tsx`. `selectedSite` state lived in the parent.
**What was fixed:** Extracted to `WorldMap` with `{ digSites }` prop. Owns `selectedSite` state. Renders `<SiteDetailPanel key={selectedSite.id} ... />` — the `key` forces a fresh panel mount (and fresh opening animation) on every site change.

---

### Fix 2.7 — Slim App.tsx to tab orchestration; rename to App
**Files changed:** `src/App.tsx`
**What was wrong:** `App.tsx` was 1,347 lines mixing data, helpers, components, state, and orchestration.
**What was fixed:** Reduced to 157 lines. Contains only: `mainTab` state, `useIntroSplash` hook, 4 nav tab buttons, `AnimatePresence` with 4 `motion.div` tabs delegating to feature components. Renamed from `DigSiteLocator` to `App` to match `main.tsx` import.

---

## Section 3 — State Management
**Completed:** 2026-05-09

**State inventory (all correct, no structural issues):**
- `mainTab` in `App` — top-level nav, correctly owned by the orchestrator
- `showIntro` via `useIntroSplash()` — timer-based state, correctly encapsulated in a custom hook
- `selectedSite` in `WorldMap` — panel selection, correctly local (no other component needs it)
- `animatingItems`, `activeTab`, `showModel` in `SiteDetailPanel` — all local panel state, correctly placed
- No state requires Context or useReducer — app is simple enough

---

### Fix 3.1 — Replace IIFE in safety tab with component-level const
**Type:** QUAL
**File(s) changed:** `src/features/expedition/components/SiteDetailPanel.tsx`
**What was wrong:** The safety tab JSX was wrapped in a `{(() => { const risk = ...; return (...) })()}` IIFE to introduce a local variable inside JSX. This pattern adds indentation, obscures the component structure, and is not idiomatic React.
**What was fixed:** `const risk = calculateSafetyRisk(site.safetyProfile)` moved to component scope (directly after `panelRef`). The IIFE wrapper removed; safety tab JSX now uses `risk` directly.
**Why:** Computed values needed in JSX belong at component scope, not inside IIFEs. The calculation is pure, cheap, and correct to run on every render.

---

### Fix 3.2 — Derive RESOURCES MATCHED count from actual data
**Type:** QUAL
**File(s) changed:** `src/App.tsx`, `src/features/pathfinder/constants.tsx` (read-only)
**What was wrong:** The Pathfinder "RESOURCES MATCHED" stat box displayed the hardcoded value `12`. The actual count of available resources across all alert sites is **15** — so the value was also wrong.
**What was fixed:** Added `import { resourceMap }` from `./features/pathfinder/constants`. Added a module-level `const resourcesMatched` that computes the count: filter digSites by `weather.alert`, flatMap to tools arrays via resourceMap, filter by `available: true`, take `.length`. Replaced literal `12` with `{resourcesMatched}`.
**Why:** Stat boxes should always reflect live data. Hardcoded values silently diverge as data changes and are a class of derived-state bug (`useState` or hardcode instead of computing).

---

## Section 4 — Error Handling
**Completed:** 2026-05-09

---

### Fix 4.1 — State-based world map image fallback
**Type:** QUAL
**File(s) changed:** `src/features/expedition/components/WorldMap.tsx`
**What was wrong:** `onError` imperatively set `e.currentTarget.style.display = 'none'` — the image silently disappeared with no user-visible indication. The parent container remained, leaving an invisible element in the DOM.
**What was fixed:** Added `mapImgFailed: boolean` state. `onError` now calls `setMapImgFailed(true)`. When true, renders a "MAP IMAGE UNAVAILABLE" placeholder instead of the hidden `<img>`. Map functionality (markers, weather, grid overlay) is unaffected.
**Why:** Declarative state is the React idiom for conditional rendering. Imperative DOM mutations inside `onError` bypass React's reconciler and leave the DOM in an inconsistent state relative to React's view of it.

---

### Fix 4.2 — Add ErrorBoundary component; wrap all four tabs
**Type:** QUAL
**File(s) changed:** `src/components/shared/ErrorBoundary.tsx` (created), `src/App.tsx`
**What was wrong:** No error boundaries existed. A render error in any component (e.g. WeatherAnimation, SiteDetailPanel, ScientistCard) would unmount the entire React tree, showing a blank page.
**What was fixed:** Created `ErrorBoundary` as a React class component (the only way to implement error boundaries). Uses `getDerivedStateFromError` to catch render errors. Shows a "SECTION UNAVAILABLE" fallback styled to match the app theme. Wrapped the content inside each of the four `motion.div` tab containers in `App.tsx`.
**Why:** Error boundaries are the standard React mechanism for graceful degradation. Wrapping at the tab level means one broken tab doesn't break the others — the header, navigation, and other tabs remain fully functional.

---

## Section 5 — Performance
**Completed:** 2026-05-09

---

### Fix 5.1 — Memoize Math.random() particle positions in WeatherAnimation
**Type:** PERF
**File(s) changed:** `src/features/expedition/utils/WeatherAnimation.tsx`
**What was wrong:** `Math.random()` was called inline in `initial.x`, `animate.x`, and `transition.delay` props for 20 rain drops (`rainy`) and 15 rain drops + 1 lightning delay (`thunderstorm`). These expressions evaluate on every render. Since `WeatherAnimation` re-renders whenever its parent `WorldMap` re-renders (e.g. when `selectedSite` changes), all particle positions and delays regenerated on every map interaction — causing all animations to restart with new random positions (visually: particles teleport on every site-pin click).
**What was fixed:** Added two `useState` lazy initializers — `rainyParticles` (array of `{ initialX, animateX, delay }` × 20) and `thunderParticles` (`{ drops: [...] × 15, lightningDelay }`). Lazy initializers are called once at mount and never again. All `Math.random()` removed from JSX.
**Why:** Random values used as animation seed values must be stable. `useState(() => ...)` is the correct React idiom — the initializer runs exactly once at mount and is not re-evaluated on re-renders. Note: `useMemo` was initially used but the `react-hooks/purity` ESLint rule correctly flagged it (useMemo callbacks can re-run in concurrent mode; `Math.random` inside useMemo violates render purity). `useState` initializers are not subject to this constraint.

---

## Section 6 — Dead Code & Cleanliness
**Completed:** 2026-05-09

---

### Fix 6.1 — Wrong icon: CloudSnow → CloudLightning for thunderstorm
**Type:** QUAL
**File(s) changed:** `src/features/expedition/utils/weatherHelpers.tsx`
**What was wrong:** `getWeatherIcon('thunderstorm')` returned `<CloudSnow />` — a snowflake icon. This has been wrong since the original code; thunderstorm should show a lightning icon.
**What was fixed:** Replaced `CloudSnow` import and usage with `CloudLightning`.
**Why:** Wrong icon is dead/incorrect code — the original author probably grabbed the wrong icon name.

---

### Fix 6.2 — Remove .gitkeep files from non-empty directories
**Type:** DX
**File(s) changed:** 6 `.gitkeep` files deleted from `expedition/components/`, `expedition/utils/`, `marketplace/components/`, `pathfinder/components/`, `scientists/components/`, `hooks/`
**What was wrong:** `.gitkeep` files are placeholder files to track empty directories in git. All 6 directories now contain real files — the `.gitkeep` files are dead scaffolding.
**What was fixed:** Deleted all 6 files.

---

### Fix 6.3 — Remove empty scaffold directories never populated
**Type:** DX
**File(s) changed:** `src/features/expedition/hooks/` (dir + .gitkeep), `src/utils/` (dir + .gitkeep)
**What was wrong:** Both directories were created as scaffolding in Section 1 with the expectation that content would be added in Section 2. `useDigSitePanel` was never extracted (state stayed inside `SiteDetailPanel`), and no utility functions needed a shared `utils/` folder.
**What was fixed:** Both empty directories removed.
**Why:** Dead structure — empty directories in source trees create confusion about whether something is "coming soon" or forgotten.

---

### Fix 6.4 — Restore tailwind.config.js with correct content globs
**Type:** PERF + QUAL
**File(s) changed:** `tailwind.config.js` (restored)
**What was wrong:** `tailwind.config.js` was deleted (unstaged working tree deletion). Without content configuration, Tailwind CSS generates a near-empty CSS file (just Preflight base styles) in production builds — all utility classes are missing, leaving the app largely unstyled in production. The build warning confirmed this: "your generated CSS will be missing styles."
**What was fixed:** Restored with standard Vite + React content globs (`./index.html`, `./src/**/*.{js,ts,jsx,tsx}`). CSS bundle now correctly includes all used utility classes (5.60 kB → 23.32 kB — the increase is correct; the previous 5.60 kB was broken).
**Why:** Tailwind v3 requires content configuration for production CSS generation; without it the production bundle is missing most styles.

---

### Fix 6.5 — Install ESLint + TypeScript; add lint and typecheck scripts
**Type:** DX
**File(s) changed:** `package.json`
**What was wrong:** `eslint.config.js` referenced `eslint`, `@eslint/js`, `globals`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, and `typescript-eslint` — none of which were installed. `typescript` was also used (Vite's TypeScript project) but not in `devDependencies`. `package.json` had no `lint` or `typecheck` scripts.
**What was fixed:** Installed all 7 missing devDependencies. Added `"lint": "eslint ."` and `"typecheck": "tsc --noEmit"` scripts. Running lint revealed 2 further issues (Fix 6.6, 6.7).
**Why:** Dead config files that can't run are misleading — they signal intent but provide no actual value.

---

### Fix 6.6 — WeatherAnimation: useMemo → useState lazy init for particle positions
**Type:** QUAL (lint-driven)
**File(s) changed:** `src/features/expedition/utils/WeatherAnimation.tsx`
**What was wrong:** ESLint's `react-hooks/purity` rule (from newly-installed `eslint-plugin-react-hooks` v7) flagged `Math.random()` inside `useMemo` callbacks. The rule is correct: `useMemo` can re-run in React's concurrent mode, making `Math.random()` inside it a purity violation. This was introduced in Fix 5.1.
**What was fixed:** Changed `useMemo` → `useState` lazy initializers (`useState(() => ...)`). Lazy initializers run exactly once at mount, are never re-evaluated on re-renders, and are not subject to purity rules.

---

### Fix 6.7 — pathfinder/constants.tsx: icon: any → icon: LucideIcon
**Type:** QUAL (lint-driven)
**File(s) changed:** `src/features/pathfinder/constants.tsx`
**What was wrong:** `resourceMap` typed `icon` as `any` — ESLint's `@typescript-eslint/no-explicit-any` flagged this correctly.
**What was fixed:** Added `import type { LucideIcon } from 'lucide-react'`; replaced `icon: any` with `icon: LucideIcon` in the resource map type.
**Why:** `any` defeats TypeScript's type safety. `LucideIcon` is the correct type for Lucide icon components and was already available from the installed version.

---

## Section 7 — Type Safety (TypeScript)
**Completed:** 2026-05-10

---

### Fix 7.1 — resourceMap: `Record<string, …>` → `Record<WeatherCondition, …>`
**Type:** TYPE
**File(s) changed:** `src/features/pathfinder/constants.tsx`
**What was wrong:** `resourceMap` was typed as `Record<string, …>`. Any arbitrary string key was valid, and TypeScript could not verify that all five `WeatherCondition` values were present.
**What was fixed:** Added `import type { WeatherCondition }` from types; changed the key type to `Record<WeatherCondition, …>`. TypeScript now enforces exhaustive coverage of all five weather conditions.
**Why:** Using the domain union type as the key makes the exhaustiveness check part of the type system — a missing weather entry becomes a compile error rather than a silent runtime `undefined`.

---

### Fix 7.2 — Define `SourceType` union and tighten `sourceType` field
**Type:** TYPE
**File(s) changed:** `src/features/pathfinder/constants.tsx`
**What was wrong:** Each resource entry's `sourceType` field was typed as `string`. The only valid values are `'University'`, `'Government'`, `'Supplier'`, `'Depot'`, but this constraint was invisible to the type checker.
**What was fixed:** Added local `type SourceType = 'University' | 'Government' | 'Supplier' | 'Depot'`; changed `sourceType: string` to `sourceType: SourceType` in the resourceMap type.
**Why:** A `string` field documents nothing about what values are expected and allows typos to silently produce incorrect icon rendering.

---

### Fix 7.3 — `sourceTypeIcon` parameter and return type
**Type:** TYPE
**File(s) changed:** `src/features/pathfinder/constants.tsx`
**What was wrong:** `sourceTypeIcon(type: string): <return inferred>` — the parameter accepted any string and the return type was implicitly inferred.
**What was fixed:** Changed parameter to `type: SourceType`; added explicit `: JSX.Element` return type annotation.
**Why:** The call site in `SiteResourceCard` passes `resource.sourceType`, which is now typed as `SourceType`, making the end-to-end flow fully typed. The explicit return type also documents the function's contract clearly.

---

### Fix 7.4 — `getSiteIcon` `status` parameter narrowed from `string` to `'Active' | 'Planning'`
**Type:** TYPE
**File(s) changed:** `src/features/expedition/utils/weatherHelpers.tsx`
**What was wrong:** `getSiteIcon(type: SiteType, status: string)` — `status` was typed as `string`, weaker than `DigSite['status']` which is `'Active' | 'Planning'`.
**What was fixed:** Changed `status: string` to `status: 'Active' | 'Planning'`.
**Why:** Narrowing the parameter type documents the function's contract and would catch call sites passing an incorrect string at compile time.
