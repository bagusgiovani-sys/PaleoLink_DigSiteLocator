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
| 2 | Component Architecture | COMPLETE |
| 3 | State Management | COMPLETE |
| 4 | Error Handling | COMPLETE |
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

---
### [2026-05-07 — Session End / Handoff Notes]

## CRITICAL CONTEXT FOR NEXT SESSION — READ THIS FIRST

### What this project actually is
- **PaleoLink Beta** — a paleontology expedition management SPA
- **Stack:** Vite 6 + React 18 + TypeScript (strict) + Tailwind CSS 3 + Framer Motion 12 + Lucide React
- **NOT Next.js** — the original review prompt said Next.js but this is a plain Vite SPA
- **No Redux, no TanStack Query, no backend, no API** — all data is hardcoded
- **Git remote:** `https://github.com/bagusgiovani-sys/PaleoLink_DigSiteLocator.git` (branch: `main`)
- **Build command:** `npm run build` — passes cleanly as of session end
- **TypeScript check:** Use `.\node_modules\.bin\tsc --noEmit` (PowerShell) — Vite doesn't run tsc on build

### Current file state (as of session end)
```
src/
  App.tsx              ← ~1,424 lines — still monolithic, but now has proper imports
  main.tsx             ← untouched — imports App as default from ./App
  index.css            ← untouched
  types/
    index.ts           ← NEW — WeatherCondition, SiteType, WeatherSeverity, MainTab,
                                SafetyProfile, DigSite, Scientist, MarketItem
  constants/
    extensions.ts      ← NEW — EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
  components/
    shared/
      ImageWithFallback.tsx  ← NEW — moved from top of App.tsx; imports EXTENSIONS from constants
  features/
    expedition/components/   ← EMPTY (scaffold only, .gitkeep)
    expedition/hooks/        ← EMPTY (scaffold only, .gitkeep)
    expedition/utils/        ← EMPTY (scaffold only, .gitkeep)
    scientists/components/   ← EMPTY (scaffold only, .gitkeep)
    marketplace/components/  ← EMPTY (scaffold only, .gitkeep)
    pathfinder/components/   ← EMPTY (scaffold only, .gitkeep)
  hooks/               ← EMPTY (scaffold only, .gitkeep)
  utils/               ← EMPTY (scaffold only, .gitkeep)
  assets/
    react.svg          ← UNUSED (Vite default, flag in Section 6)
```

### What's still inside App.tsx (what Section 2 needs to split out)
The component exported is named `DigSiteLocator` (main.tsx imports it as `App` — minor inconsistency to fix in Section 2).

**State (all useState, all inside DigSiteLocator):**
- `selectedSite: DigSite | null` — which map pin is open
- `animatingItems: Record<string, boolean>` — staggered panel entry animations
- `activeTab: 'details' | 'model' | 'safety'` — inner tab in the site detail panel
- `mainTab: MainTab` — top-level nav tab (expedition/scientists/marketplace/pathfinder)
- `showIntro: boolean` — intro splash screen (auto-hides after 3s)
- `showModel: boolean` — whether the 3D model image is loaded in the panel
- `panelRef: useRef<HTMLDivElement>` — direct DOM manipulation for panel open/close animation

**Data arrays (hardcoded inside DigSiteLocator, NOT in constants yet):**
- `scientists: Scientist[]` — 4 scientists (lines ~17–173 of current App.tsx)
- `marketItems: MarketItem[]` — 4 market items (lines ~175–224)
- `digSites: DigSite[]` — 6 dig sites with full weather/safety/model data (lines ~250–419)

**Helper functions (defined inside DigSiteLocator):**
- `calculateSafetyRisk(profile: SafetyProfile)` → `{ level, color, textColor, borderColor }` — computes risk level from 5 factors (score 0–12)
- `getWeatherColor(severity: WeatherSeverity)` → Tailwind bg class string
- `getWeatherIcon(condition: WeatherCondition)` → JSX icon element
- `getSiteIcon(type: SiteType, status: string)` → JSX icon element

**Inner component (defined inside DigSiteLocator):**
- `WeatherAnimation({ condition })` — renders Framer Motion weather particles; has 5 cases (rainy, thunderstorm, flood, sunny, typhoon); `default` returns null

**Two useEffect hooks:**
1. Fires on `selectedSite` change → resets animatingItems + activeTab + showModel, manually sets panelRef styles, then runs 6 staggered setTimeout calls to animate panel sections in
2. Fires once on mount → sets a 3s timeout to hide the intro splash (`setShowIntro(false)`)

**Render structure:**
```
if (showIntro) → return <IntroSplash />  (full-screen animated logo, auto-dismisses)

return <main layout>
  <Header />                             — "PALEO LINK" title + tagline
  <MainTabNav />                         — 4 buttons: Expedition/Scientists/Marketplace/Pathfinder
  <AnimatePresence>
    {mainTab === 'expedition'} →
      <WorldMap>                         — bg image + SVG grid + weather animation layer
        {digSites.map(site =>
          <SiteMarker />                 — animated ping circle + icon button
          {selectedSite === site →
            createPortal(<SiteDetailPanel />, document.body)
            — tabs: Site Details | Safety Profile | 3D Data
          }
        )}
      </WorldMap>
      <StatsFooter />                    — 4 stat boxes (active/alerts/models/critical)

    {mainTab === 'scientists'} →
      {scientists.map(s => <ScientistCard />)}

    {mainTab === 'marketplace'} →
      {marketItems.map(i => <MarketItemRow />)}

    {mainTab === 'pathfinder'} →
      <AlertSummaryBar />                — 3 counters (critical/warning/matched)
      {digSites.filter(alert).map(site =>
        <SiteResourceCard />             — per-site resource list, resourceMap keyed by weather condition
      )}
  </AnimatePresence>
```

### Specific things to note for Section 2
1. **The site detail panel uses `createPortal`** — it renders into `document.body` to escape map container stacking contexts. Keep this; it's intentional.
2. **`panelRef` direct DOM manipulation** — the open/close animation imperatively sets `style.opacity` and `style.transform`. This is a deliberate choice to avoid Framer Motion re-mounting the portal content. Do NOT replace with state-based animation without testing carefully.
3. **`WeatherAnimation` inner component** — it's defined inside `DigSiteLocator`. Move to `src/features/expedition/utils/WeatherAnimation.tsx` in Section 2.
4. **`resourceMap` in Pathfinder** — a large `Record<string, {...}>` defined inline inside the `.map()` callback. Move to `src/features/pathfinder/constants.ts` in Section 2.
5. **`calculateSafetyRisk` and weather helpers** — pure functions with no React dependencies; move to `src/features/expedition/utils/safetyHelpers.ts` and `src/features/expedition/utils/weatherHelpers.ts`.
6. **The two useEffect hooks** — extract to `src/hooks/useIntroSplash.ts` (the 3s timer) and `src/features/expedition/hooks/useDigSitePanel.ts` (the complex panel animation effect).

### Deferred issues (for later sections)
- **Section 6:** `DollarSign`, `TrendingUp` unused in lucide-react import line of App.tsx
- **Section 6:** `src/assets/react.svg` unused Vite default
- **Section 5:** `Math.random()` calls inside `WeatherAnimation` re-run on every render — positions not memoized
- **Section 10:** Close (X) button in site detail panel has no `aria-label`
- **Section 10:** Map site marker buttons have no accessible label
- **Section 10:** "Document" and "Satellite Scan" buttons are icon+text but could use aria improvements
- **Section 4:** No error boundaries anywhere
- **Section 4:** `onError` on the world map image silently hides it — no fallback shown
- **Section 9:** Zero tests exist; no test runner configured (Vitest not installed)

### Rules reminder for whoever picks this up
- DO NOT change any className, Tailwind classes, or inline styles
- DO NOT change any component's visual output or layout  
- After each section: update this file, append to fixes.md, `git add . && git commit && git push`
- Wait for user confirmation before starting each new section

---

## Ultra-Instinct Improvement Plan
> Initiated: 2026-05-08 | Last updated: 2026-05-08

## Status Legend
- [ ] Pending
- [~] In Progress
- [x] Done

---

## Milestone 1 — Critical Fixes (Performance)
- [x] **[PERF]** Move `scientists`, `marketItems`, `digSites` to module-level constants — `src/App.tsx:17–320` (was)
- [x] **[PERF]** Move `WeatherAnimation` to module level (fixes React identity/remount bug) — `src/App.tsx:347–469` (was)
- [x] **[PERF]** Move `calculateSafetyRisk`, `getWeatherColor`, `getWeatherIcon`, `getSiteIcon` to module level — `src/App.tsx:127–345` (was)
- [x] **[PERF]** Extract `resourceMap` and `sourceTypeIcon` to `src/features/pathfinder/constants.tsx`

## Milestone 2 — Major Improvements
- [x] **[QUAL]** Move inline `<style>` JSX block to `src/index.css`
- [x] **[DX]** Remove unused lucide-react imports (`DollarSign`, `TrendingUp` + 7 more moved to constants)
- [x] **[DX]** Delete `src/assets/react.svg` (unused Vite default)
- [x] **[ARCH]** Section 2 — Split `App.tsx` into feature components — COMPLETE
- [x] **[QUAL]** Add error boundaries around tab content
- [x] **[QUAL]** Fix hardcoded `"12"` for RESOURCES MATCHED — derive from actual data (`src/App.tsx` pathfinder section)
- [ ] **[DX]** Add `lint` script to `package.json` (`eslint.config.js` exists but no script)

## Milestone 3 — Quality & Polish
- [ ] **[PERF]** Memoize `Math.random()` positions in `WeatherAnimation` (use `useMemo` with stable seed)
- [ ] **[QUAL]** Fix wrong icon: `getWeatherIcon` returns `<CloudSnow>` for `thunderstorm`
- [x] **[QUAL]** Replace IIFE `{(() => { ... })()}` in safety tab with extracted variable
- [ ] **[A11Y]** Add `aria-label` to site detail panel close button
- [ ] **[A11Y]** Add accessible labels to site marker buttons
- [ ] **[QUAL]** Add `onClick` handlers to "Document" and "Satellite Scan" buttons
- [ ] **[DEP]** Upgrade `lucide-react` from `^0.263.1` to current (check for icon renames first)
- [ ] **[QUAL]** Add `typescript` as explicit `devDependency`

---

## Session Log
| Session | Date       | Token % at close | Summary                                                    |
|---------|------------|------------------|------------------------------------------------------------|
| 1       | 2026-05-08 | ~40%             | origin.md created; Milestone 1 complete; Milestone 2 partial (3/7 done) |
| 2       | 2026-05-08 | ~60%             | Section 2 complete — App.tsx reduced to 157 lines; 14 new files extracted |
| 3       | 2026-05-09 | —                | Section 3 complete — 2 fixes: IIFE removed, hardcoded "12" replaced with derived count (actual: 15) |
| 4       | 2026-05-09 | —                | Section 4 complete — 2 fixes: ErrorBoundary component + 4 tab wrappers; world map image state-based fallback |
