# PaleoLink Beta — Refactor Design Spec
**Date:** 2026-05-10
**Scope:** Tailwind CSS v3 → v4 migration + full component decomposition (Option B: section-level)

---

## Goals

1. Migrate Tailwind CSS from v3.4.19 to v4 using the `@tailwindcss/vite` plugin.
2. Decompose all large components into focused, single-responsibility units (Option B: section-level).
3. Visual output must remain pixel-identical. No className, Tailwind class, or inline style changes permitted.

---

## Part 1 — Tailwind v4 Migration

### Package changes
- Uninstall `tailwindcss@3`
- Install `tailwindcss@^4` and `@tailwindcss/vite`
- Remove `autoprefixer` (v4 handles vendor prefixes natively)

### File changes

| File | Action |
|------|--------|
| `postcss.config.js` | Delete |
| `tailwind.config.js` | Delete |
| `vite.config.ts` | Add `import tailwindcss from '@tailwindcss/vite'`; add `tailwindcss()` to `plugins` array before `react()` |
| `src/index.css` | Replace `@tailwind base;` / `@tailwind components;` / `@tailwind utilities;` with `@import "tailwindcss";` |

### What is preserved unchanged
- All 4 `@keyframes` blocks in `index.css`
- All custom utility classes: `.animate-slide-left`, `.animate-slide-bottom`, `.animate-scale-in`, `.glow-pulse`, `.item-hidden`
- All map height classes: `.map-container`, `.map-mobile-spacer`, `.map-desktop-spacer`
- Every Tailwind utility class in every component (all confirmed valid in v1.14.0)

### Verification gate
After the migration commit, run `npm run build` and `npm run typecheck` — both must pass clean before any component work begins.

---

## Part 2 — Component Decomposition

### Approach
Option B (section-level): each distinct logical section becomes its own component. Atoms (primitives used in only one place) are NOT extracted. Shared primitives graduate to `components/shared/` only when reused in 2+ places.

### Sequencing
1. `WeatherAnimation` split (isolated utility, no shared deps to coordinate)
2. `WorldMap` split (extracts `SiteMarker`)
3. `SiteDetailPanel` split (largest file, 7 components)
4. `SiteResourceCard` split (extracts `ResourceItem`)
5. `App.tsx` split (extracts tab wrappers + `AppHeader` + `MainTabBar`)

### New files (19 total)

#### `App.tsx` extractions → `components/shared/` and feature tab wrappers
| New file | Content extracted |
|----------|------------------|
| `src/components/shared/AppHeader.tsx` | "PALEO LINK" title, divider line, tagline (~15 lines) |
| `src/components/shared/MainTabBar.tsx` | `role="tablist"` container + 4 tab buttons with active styling (~55 lines) |
| `src/features/scientists/components/ScientistsTab.tsx` | RECRUITMENT section wrapper + grid of ScientistCards (~20 lines) |
| `src/features/marketplace/components/MarketplaceTab.tsx` | MARKETPLACE section wrapper + REFRESH LIST button + MarketItemRow grid (~25 lines) |
| `src/features/pathfinder/components/PathfinderTab.tsx` | PATHFINDER header + description + AlertSummaryBar (3 stat boxes) + SiteResourceCard list (~45 lines) |

**Props:**
- `MainTabBar`: `activeTab: MainTab`, `onTabChange: (tab: MainTab) => void`
- `ScientistsTab`: no props (imports `scientists` constant directly)
- `MarketplaceTab`: no props (imports `marketItems` constant directly)
- `PathfinderTab`: no props (imports `digSites` + `resourcesMatched` directly)

#### `WeatherAnimation.tsx` split → 5 condition components
| New file | Content |
|----------|---------|
| `src/features/expedition/utils/RainyAnimation.tsx` | `useState` for 20 particle positions + rain drop motion (~30 lines) |
| `src/features/expedition/utils/ThunderstormAnimation.tsx` | `useState` for 15 drops + lightning delay + flash overlay (~40 lines) |
| `src/features/expedition/utils/FloodAnimation.tsx` | Rising water level animation (~15 lines) |
| `src/features/expedition/utils/SunnyAnimation.tsx` | Rotating sun rays animation (~20 lines) |
| `src/features/expedition/utils/TyphoonAnimation.tsx` | Spinning debris animation (~20 lines) |

`WeatherAnimation.tsx` becomes a pure switch router (~20 lines): receives `condition: WeatherCondition`, returns the matching animation component or `null`.

Each condition component takes no props. The `useState` lazy initialisers for random particle positions move into `RainyAnimation` and `ThunderstormAnimation` respectively.

#### `WorldMap.tsx` split
| New file | Content |
|----------|---------|
| `src/features/expedition/components/SiteMarker.tsx` | Animated ping circle + site icon button + weather icon badge + `SiteDetailPanel` portal (~45 lines) |

**Props for `SiteMarker`:** `site: DigSite`, `isSelected: boolean`, `onToggle: () => void`

`WorldMap.tsx` retains: map image + error state, grid overlay, weather animation layer, scanning lines. Renders `SiteMarker` per site (~75 lines).

#### `SiteDetailPanel.tsx` split (6 new components)
| New file | Content |
|----------|---------|
| `src/features/expedition/components/SitePanelHeader.tsx` | Site name, location + type line, status badge, weather badge, close button (~40 lines) |
| `src/features/expedition/components/WeatherAlertBanner.tsx` | Alert box (icon + severity colour + message + Document/Satellite Scan buttons with submitted state) (~35 lines) |
| `src/features/expedition/components/DiscoveriesList.tsx` | Gem icon header + animated discovery items list (~25 lines) |
| `src/features/expedition/components/TeamSection.tsx` | Users icon header + team text box (~15 lines) |
| `src/features/expedition/components/ToolsList.tsx` | Wrench icon header + animated tools list (~25 lines) |
| `src/features/expedition/components/SafetyProfileTab.tsx` | Risk assessment badge + 5 safety field rows + recommendations block (~80 lines) |
| `src/features/expedition/components/ModelViewerTab.tsx` | 3D model viewer: available/unavailable branches, ImageWithFallback, show/hide toggle (~65 lines) |

**State ownership after split:**
- `docSubmitted` / `scanSubmitted` → move into `WeatherAlertBanner` (self-contained)
- `showModel` → move into `ModelViewerTab` (self-contained)
- `animatingItems`, `activeTab`, `panelRef` → stay in `SiteDetailPanel` (orchestration state)
- `risk` constant → computed inside `SafetyProfileTab` (only consumer)

**Props for `SitePanelHeader`:** `site: DigSite`, `animatingItems: Record<string, boolean>`, `onClose: (e: React.MouseEvent) => void`
**Props for `WeatherAlertBanner`:** `site: DigSite`, `animatingItems: Record<string, boolean>`
**Props for `DiscoveriesList`:** `discoveries: string[]`, `animatingItems: Record<string, boolean>`
**Props for `TeamSection`:** `team: string`, `animatingItems: Record<string, boolean>`
**Props for `ToolsList`:** `tools: string[]`, `animatingItems: Record<string, boolean>`
**Props for `SafetyProfileTab`:** `site: DigSite`
**Props for `ModelViewerTab`:** `site: DigSite`

`SiteDetailPanel` retains: `panelRef`, `animatingItems` state + timers, `activeTab` state, `handleClose`, panel animation effect, `createPortal` wrapper, tab bar, `AnimatePresence` tab router (~65 lines).

#### `SiteResourceCard.tsx` split
| New file | Content |
|----------|---------|
| `src/features/pathfinder/components/ResourceItem.tsx` | Individual resource card: icon, name, source type, distance, ETA, availability, contact button (~40 lines) |

**Props for `ResourceItem`:** `resource: Resource` — add a `Resource` interface to `src/types/index.ts` with fields `name: string`, `source: string`, `sourceType: SourceType`, `distance: string`, `eta: string`, `available: boolean`, `icon: LucideIcon`.

`SiteResourceCard` retains: card border/bg, site header, alert message row, "NEAREST AVAILABLE RESOURCES" heading, grid of `ResourceItem` (~45 lines).

### Files unchanged
`StatsFooter`, `ScientistCard`, `MarketItemRow`, `ErrorBoundary`, `ImageWithFallback`, `IntroSplash`, `weatherHelpers.tsx`, `safetyHelpers.ts`, `useIntroSplash.ts`, `types/index.ts`, all constants files.

---

## Commit plan

| # | Commit message | Files |
|---|---------------|-------|
| 1 | `chore(tailwind): migrate from v3 to v4 via @tailwindcss/vite` | `vite.config.ts`, `index.css`, delete `postcss.config.js` + `tailwind.config.js`, `package.json`, `package-lock.json` |
| 2 | `refactor(weather): split WeatherAnimation into 5 condition components` | `WeatherAnimation.tsx` + 5 new files |
| 3 | `refactor(map): extract SiteMarker from WorldMap` | `WorldMap.tsx`, `SiteMarker.tsx` |
| 4 | `refactor(panel): decompose SiteDetailPanel into 6 focused components` | `SiteDetailPanel.tsx` + 6 new files |
| 5 | `refactor(pathfinder): extract ResourceItem from SiteResourceCard` | `SiteResourceCard.tsx`, `ResourceItem.tsx` |
| 6 | `refactor(app): extract AppHeader, MainTabBar, and 3 tab wrappers; slim App.tsx to ~40 lines` | `App.tsx` + 5 new files |

Each commit: run `npm run build` + `npm run typecheck` + `npm test` before committing.

---

## Constraints (carry-over from review rules)
- No className, Tailwind class, or inline style changes
- No visual output changes
- All tests must remain green throughout
