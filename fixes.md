# PaleoLink Beta — Fix Changelog

All changes made during the code review are logged here.
Each entry includes: file changed, what was wrong, what was fixed, and which section it belongs to.
Entries are appended in order — nothing is ever overwritten.

---

<!-- Fixes will be appended below as each section is completed -->

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
