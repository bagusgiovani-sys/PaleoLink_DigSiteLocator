# PaleoLink Beta — Code Review Progress

## Project Summary
- **Type:** Vite + React 18 + TypeScript SPA (not Next.js)
- **Tooling:** Vite 6, Tailwind CSS 3, Framer Motion 12, Lucide React
- **State:** All local React state — no Redux, no TanStack Query
- **Architecture:** Single monolithic `src/App.tsx` (1,524 lines), `src/components/` is empty
- **Tests:** None
- **Data:** Hardcoded inline — no API or backend integration

---

## Review Sections

| # | Section | Status |
|---|---------|--------|
| 1 | Folder Structure & Architecture | COMPLETE |
| 2 | Component Architecture | PENDING |
| 3 | State Management | PENDING |
| 4 | Error Handling | PENDING |
| 5 | Performance | PENDING |
| 6 | Dead Code & Cleanliness | PENDING |
| 7 | Type Safety (TypeScript) | PENDING |
| 8 | Security | PENDING |
| 9 | Unit Tests | PENDING |
| 10 | Accessibility | PENDING |

---

## Section Notes (pre-review adjustments)

**Section 3 — State Management:**
No Redux or TanStack Query exists. Review will focus on:
- useState/useReducer usage patterns
- Whether any state should be lifted or lowered
- Identifying state that can be derived (no need to store)
- Identifying state that warrants Context or useReducer

**Section 8 — Security:**
No backend/API integration found. Review will focus on:
- Environment variable hygiene
- Any dangerouslySetInnerHTML usage
- Input sanitization if user-facing forms exist

---

## Target Architecture (established in Section 1)

```
src/
  features/
    expedition/
      components/       ← WorldMap, SiteMarker, SiteDetailPanel, WeatherAlert, StatsFooter
      hooks/            ← useDigSitePanel (selectedSite + animation + panelRef logic)
      utils/            ← weatherHelpers, safetyHelpers
    scientists/
      components/       ← ScientistCard
    marketplace/
      components/       ← MarketItemRow
    pathfinder/
      components/       ← SiteResourceCard, ResourceItem
  components/
    shared/
      ImageWithFallback.tsx  ✓ DONE
  hooks/                ← useIntroSplash
  types/
    index.ts            ✓ DONE — all domain types/interfaces
  constants/
    extensions.ts       ✓ DONE — EXTENSIONS array
  utils/
  App.tsx               ← will slim down to just tab orchestration
  main.tsx
  index.css
```

**Naming note:** The component exported from `App.tsx` is internally named `DigSiteLocator` but imported as `App` in `main.tsx`. This works but will be cleaned up in Section 2.

**Unused imports flagged (fix in Section 6):** `DollarSign`, `TrendingUp` from lucide-react.

**Unused asset flagged (fix in Section 6):** `src/assets/react.svg` — Vite template default, never imported.

---

## Entry Log

---
### [2026-05-07 — Session Start]
**Status:** Pre-work complete. `progress.md` and `fixes.md` created.
**Completed:** Project explored. Architecture documented above.
**Pending:** Awaiting user confirmation to begin Section 1 code changes.
**Blockers:** None.

---
### [2026-05-07 — Section 1 Complete]
**Status:** Section 1 — Folder Structure & Architecture — DONE.
**Completed:**
- Created `src/types/index.ts` — extracted all 4 union types + 4 interfaces from App.tsx
- Created `src/constants/extensions.ts` — extracted EXTENSIONS constant
- Created `src/components/shared/ImageWithFallback.tsx` — moved misplaced shared component
- Updated `src/App.tsx` imports (removed ~100 lines of inline definitions, added 2 import lines)
- Created feature folder scaffold: `src/features/{expedition,scientists,marketplace,pathfinder}/`, `src/hooks/`, `src/utils/`
- Verified: `npm run build` passes cleanly (no regressions)
**Pending:** Section 2 — Component Architecture (splitting DigSiteLocator into feature components)
**Blockers:** None.
