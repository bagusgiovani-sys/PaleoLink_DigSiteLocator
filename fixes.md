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
