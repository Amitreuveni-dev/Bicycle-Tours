# TrailBlaze Israel 🚵‍♂️

> **Boutique Mountain Biking Tours** — Hebrew RTL landing page
> React · TypeScript · SCSS Modules · Framer Motion · Lucide React

---

## Table of Contents
1. [Project Vision](#1-project-vision)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Global SCSS Variables](#4-global-scss-variables)
5. [TypeScript Interfaces](#5-typescript-interfaces)
6. [Styling Rules](#6-styling-rules)
7. [Component Architecture](#7-component-architecture)
8. [Data Layer — No Database](#8-data-layer--no-database)
9. [Theme System (Dark / Light)](#9-theme-system-dark--light)
10. [WhatsApp Integration](#10-whatsapp-integration)
11. [Getting Started](#11-getting-started)
12. [Environment Checklist](#12-environment-checklist)

---

## 1. Project Vision

TrailBlaze Israel is a **boutique biking-tour company** landing page.
The site is a **single-page application** built as a pure frontend with **no backend
and no database**. All tour data lives in a static JSON file (`src/data/tours.json`).

### Core goals
| Goal | Implementation |
|---|---|
| Beautiful, high-end UI | Dark/light theme, Framer Motion animations |
| Hebrew / RTL first | `dir="rtl"` on `<html>`, RTL-aware SCSS properties |
| Lead generation | Tour-match form → pre-filled WhatsApp message |
| Accessibility | ARIA roles/labels, `:focus-visible` ring, keyboard nav |
| Performance | Lazy-loaded images, CSS skeleton loaders, code splitting via Vite |

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 (Vite) | Fast HMR, ESM-native bundling |
| Language | TypeScript (strict mode) | Type safety, self-documenting code |
| Styling | **SCSS Modules** only | Scoped styles, no global leakage |
| Animation | Framer Motion 11 | Stagger, spring physics, `whileInView` |
| Icons | Lucide React | Tree-shakeable, consistent design |
| Fonts | Google Fonts — Heebo | Optimised Hebrew glyph rendering |
| Data | Local JSON | Zero backend, zero latency |

---

## 3. Folder Structure

```
NewBikeProject/
├── index.html                     # Entry HTML — dir="rtl", data-theme="dark"
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
│
└── src/
    ├── main.tsx                   # ReactDOM render + global style import
    ├── App.tsx                    # Root layout: Navbar + sections + Footer
    ├── App.module.scss
    │
    ├── styles/
    │   ├── variables.module.scss  # ★ Source of Truth (CSS vars + SCSS vars)
    │   └── globals.scss           # Reset, RTL base, typography, scrollbar
    │
    ├── context/
    │   └── ThemeContext.tsx       # Dark/light ThemeProvider + useTheme hook
    │
    ├── types/
    │   └── index.ts               # All TS interfaces & type aliases
    │
    ├── data/
    │   └── tours.json             # Static tour data (6 tours)
    │
    └── components/
        ├── Navbar/
        │   ├── Navbar.tsx         # Sticky, smooth-scroll, theme toggle
        │   └── Navbar.module.scss
        │
        ├── Hero/
        │   ├── Hero.tsx           # Full-viewport banner, stagger animation
        │   └── Hero.module.scss
        │
        ├── TourGallery/
        │   ├── TourGallery.tsx    # Filter tabs + skeleton + card grid
        │   ├── TourGallery.module.scss
        │   ├── TourCard/
        │   │   ├── TourCard.tsx   # Summary card with difficulty dots
        │   │   └── TourCard.module.scss
        │   ├── TourModal/
        │   │   ├── TourModal.tsx  # Detail popup, equipment, WA share
        │   │   └── TourModal.module.scss
        │   └── SkeletonCard/
        │       ├── SkeletonCard.tsx   # Shimmer loading placeholder
        │       └── SkeletonCard.module.scss
        │
        ├── WhyUs/
        │   ├── WhyUs.tsx          # 6 animated feature cards
        │   └── WhyUs.module.scss
        │
        ├── FAQ/
        │   ├── FAQ.tsx            # Single-open accordion
        │   └── FAQ.module.scss
        │
        ├── TourMatchForm/
        │   ├── TourMatchForm.tsx  # Lead-gen form → WhatsApp deep link
        │   └── TourMatchForm.module.scss
        │
        └── FloatingWhatsApp/
            ├── FloatingWhatsApp.tsx    # Floating pulsing WA button
            └── FloatingWhatsApp.module.scss
```

---

## 4. Global SCSS Variables

All design tokens live in **`src/styles/variables.module.scss`**.
Components reference CSS custom properties with `var(--token-name)`.
SCSS variables (static layout values) are imported via `@use '../../styles/variables.module' as v;`.

### CSS Custom Properties (theme-switchable)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--bg-primary` | `#fafafa` | `#0a0a0a` | Page background |
| `--bg-secondary` | `#f0f0f0` | `#141414` | Subtle surface, section alt |
| `--bg-card` | `#ffffff` | `#1a1a1a` | Card backgrounds |
| `--text-primary` | `#111111` | `#f0f0f0` | Headings, body text |
| `--text-secondary` | `#555555` | `#aaaaaa` | Captions, descriptions |
| `--text-muted` | `#999999` | `#666666` | Placeholder, labels |
| `--accent` | `#ff6b00` | `#ff6b00` | Primary brand orange |
| `--accent-hover` | `#e55a00` | `#ff8c33` | Hover state of accent |
| `--accent-light` | `rgba(255,107,0,0.12)` | `rgba(255,107,0,0.15)` | Tinted backgrounds |
| `--nav-bg` | `rgba(250,250,250,0.9)` | `rgba(10,10,10,0.9)` | Navbar backdrop |
| `--border` | `rgba(0,0,0,0.09)` | `rgba(255,255,255,0.07)` | Subtle dividers |
| `--border-strong` | `rgba(0,0,0,0.18)` | `rgba(255,255,255,0.14)` | Form inputs |
| `--shadow-md` | `0 4px 20px rgba(0,0,0,0.12)` | `0 4px 20px rgba(0,0,0,0.55)` | Card shadow |
| `--shadow-accent` | `0 4px 24px rgba(255,107,0,0.35)` | same | CTA button glow |
| `--skeleton-base` | `#e2e2e2` | `#1e1e1e` | Skeleton placeholder |
| `--skeleton-shine` | `#f0f0f0` | `#252525` | Skeleton shimmer |
| `--difficulty-empty` | `rgba(0,0,0,0.15)` | `rgba(255,255,255,0.15)` | Unfilled difficulty dot |

### SCSS Variables (static)

```scss
$font-primary:  'Heebo', 'Assistant', sans-serif;
$max-width:     1200px;
$nav-height:    72px;

$radius-sm:     8px;
$radius-md:     12px;
$radius-lg:     20px;
$radius-full:   9999px;

$transition-fast: all 0.18s ease;
$transition-base: all 0.3s  ease;

// Breakpoints
$sm:  576px;
$md:  768px;
$lg:  1024px;
$xl:  1280px;
```

### Responsive mixins (defined in variables.module.scss)

```scss
@mixin sm { @media (max-width: 576px)  { @content; } }
@mixin md { @media (max-width: 768px)  { @content; } }
@mixin lg { @media (max-width: 1024px) { @content; } }
```

---

## 5. TypeScript Interfaces

Defined in `src/types/index.ts`.

### `Tour` — main data entity

```typescript
interface Tour {
  id: string;
  title: string;           // Hebrew name, e.g. "יער הכרמל"
  subtitle: string;        // One-liner description
  price: number;           // ILS per person (starting price)
  difficulty: 1|2|3|4|5;  // 1 = beginner, 5 = expert
  category: 'XC'|'MTB'|'eMTB';
  image: string;           // Unsplash URL or local /public asset
  duration: string;        // e.g. "5 שעות"
  distance: string;        // e.g. "35 ק\"מ"
  elevation: string;       // e.g. "700 מ'"
  location: string;        // e.g. "הגולן"
  description: string;     // Full Hebrew paragraph
  included: IncludedItem[];// What's included (with Lucide icon name)
  equipment: string[];     // Required personal gear list
  highlights: string[];    // 3 key selling points
}

interface IncludedItem {
  icon: string;   // Lucide icon component name, e.g. "ShieldCheck"
  text: string;   // Hebrew label
}
```

### `UserPreferences` — tour-match lead form

```typescript
interface UserPreferences {
  name: string;
  bikeType: 'regular' | 'electric';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  destination: string;   // Chosen from preset list or free-text
  notes: string;         // Optional free-text
}
```

### Other types

```typescript
type Theme          = 'light' | 'dark';
type DifficultyLevel= 1 | 2 | 3 | 4 | 5;
type TourCategory   = 'XC' | 'MTB' | 'eMTB';
type FilterCategory = 'all' | TourCategory;

interface ThemeContextType {
  theme:       Theme;
  toggleTheme: () => void;
  isDark:      boolean;
}

interface FaqItem {
  id:       string;
  question: string;
  answer:   string;
}
```

---

## 6. Styling Rules

| Rule | Detail |
|---|---|
| **SCSS Modules only** | Every component has a co-located `.module.scss`. No global class names except utilities in `globals.scss`. |
| **CSS custom properties** | All theme colours use `var(--token)`. Components never hardcode colours. |
| **RTL-aware properties** | Use `inset-inline-start/end` instead of `left/right`. Use `margin-inline-start` instead of `margin-left`. |
| **No `@import`** | Use `@use '../../styles/variables.module' as v;` only when SCSS variables (`v.$max-width`) are needed in a component. |
| **No inline styles** | Motion style overrides via Framer `style` prop are acceptable. |
| **Responsive** | Mobile-first via `@include v.md` / `v.sm` / `v.lg` breakpoint mixins. |
| **Animation** | Framer Motion for enter/exit. CSS `transition` for hover micro-interactions only. |

---

## 7. Component Architecture

### Data flow

```
App.tsx
 ├─ Navbar          (useTheme hook → toggleTheme)
 ├─ Hero            (static — no props)
 ├─ TourGallery     (reads tours.json → state: filter, skeleton, modal)
 │    ├─ TourCard   (receives Tour, calls onSelect)
 │    ├─ TourModal  (receives selected Tour | null)
 │    └─ SkeletonCard (no props)
 ├─ WhyUs           (static feature cards)
 ├─ TourMatchForm   (local form state → WhatsApp link)
 ├─ FAQ             (local accordion state)
 └─ FloatingWhatsApp(static WA link)
```

### Scroll navigation

`Navbar` smooth-scrolls to `#home | #tours | #why-us | #match | #faq`
(IDs are on `<section>` elements in `App.tsx`).

---

## 8. Data Layer — No Database

All tour data is in **`src/data/tours.json`** and imported as a static module:

```typescript
import toursData from '../../data/tours.json';
const tours = toursData as Tour[];
```

The skeleton loader (`setTimeout` of 1600 ms) simulates an async fetch,
making it trivial to swap the import for a real `fetch()` in the future.

### Adding a new tour

1. Open `src/data/tours.json`.
2. Append a new JSON object following the `Tour` interface schema.
3. `included[].icon` must be a valid **Lucide React** component name.

---

## 9. Theme System (Dark / Light)

| Layer | Mechanism |
|---|---|
| Storage | `localStorage` key `trailblaze-theme` |
| Initial value | localStorage → OS preference → `'dark'` |
| Application | `document.documentElement.setAttribute('data-theme', theme)` |
| CSS response | `variables.module.scss` has `:root[data-theme='dark']` and `'light'` blocks |
| Provider | `ThemeContext.tsx` → `<ThemeProvider>` wraps `<App>` in `main.tsx` |
| Consumer | `useTheme()` hook returns `{ theme, toggleTheme, isDark }` |
| Toggle UI | Navbar button with animated Sun ↔ Moon icon swap |

---

## 10. WhatsApp Integration

Three entry points — all open `https://wa.me/<number>?text=<encoded>`:

| Component | Message content |
|---|---|
| `FloatingWhatsApp` | Generic greeting |
| `TourModal` | Tour name, duration, distance, location, price |
| `TourMatchForm` | Name, bike type, fitness level, destination, notes |

**Important:** Replace the placeholder `972501234567` in:
- `src/components/TourModal/TourModal.tsx` (line 16)
- `src/components/TourMatchForm/TourMatchForm.tsx` (line 14)
- `src/components/FloatingWhatsApp/FloatingWhatsApp.tsx` (line 12)

---

## 11. Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server (http://localhost:5173)
npm run dev

# 3. Type-check
npx tsc --noEmit

# 4. Production build
npm run build

# 5. Preview production build locally
npm run preview
```

**Node.js >= 18** required.

---

## 12. Environment Checklist

- [ ] Replace WhatsApp number in all 3 components (see section 10)
- [ ] Replace `vite.config.ts` `api: 'modern-compiler'` with `api: 'legacy'` if Sass < 1.70
- [ ] Optionally replace Unsplash image URLs with locally hosted `/public/images/*.jpg`
- [ ] Set `<meta name="og:image">` in `index.html` for social sharing
- [ ] Add Google Analytics / Meta Pixel scripts if needed (in `index.html`)
