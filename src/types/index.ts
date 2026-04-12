// ─────────────────────────────────────────────────────────────────────────────
// types/index.ts — Global TypeScript interfaces & type aliases
// ─────────────────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type TourCategory = 'XC' | 'MTB' | 'eMTB';

export type FilterCategory = 'all' | TourCategory;

export type BikeType = 'regular' | 'electric';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// ── Included-item entry ────────────────────────────────────────────────────
export interface IncludedItem {
  /** Lucide-React icon component name (e.g. "ShieldCheck") */
  icon: string;
  /** Hebrew display text */
  text: string;
}

// ── Main Tour entity ───────────────────────────────────────────────────────
export interface Tour {
  id: string;
  active?: boolean;             // false = hidden from gallery (draft/disabled)
  title: string;
  subtitle: string;
  price: number;               // ILS — starting price per person
  difficulty: DifficultyLevel; // 1 (easiest) → 5 (expert)
  category: TourCategory;
  image: string;               // Unsplash URL / local asset path
  duration: string;            // e.g. "6 שעות"
  distance: string;            // e.g. "35 ק\"מ"
  elevation: string;           // e.g. "700 מ'"
  location: string;            // e.g. "הגולן"
  description: string;         // Hebrew paragraph
  routeDetails?: string;       // Optional: detailed itinerary breakdown
  included: IncludedItem[];    // What's included (with icon)
  notIncluded?: IncludedItem[]; // What's NOT included (with icon)
  equipment: string[];         // Required personal equipment list
  highlights: string[];        // 3 key selling points
}

// ── Tour-matching lead-gen form ────────────────────────────────────────────
export interface UserPreferences {
  name: string;
  bikeType: BikeType;
  fitnessLevel: FitnessLevel;
  destination: string;
  notes: string;
}

// ── Theme context shape ────────────────────────────────────────────────────
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// ── FAQ item ───────────────────────────────────────────────────────────────
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// ── Why-Us feature card ────────────────────────────────────────────────────
export interface Feature {
  icon: string;
  title: string;
  description: string;
}
