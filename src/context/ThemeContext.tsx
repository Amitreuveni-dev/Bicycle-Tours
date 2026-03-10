import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Theme, ThemeContextType } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// ThemeContext
// Provides dark / light mode state to the entire tree.
// The active theme is persisted in localStorage and applied as a
// data-theme attribute on <html> so CSS custom properties respond instantly.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'trailblaze-theme';
const DEFAULT_THEME: Theme = 'dark';

const ThemeContext = createContext<ThemeContextType | null>(null);

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // localStorage unavailable (e.g. SSR / private mode)
  }
  // Respect OS preference as a fallback
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : DEFAULT_THEME;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply the theme to <html> every time it changes
  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore write errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ── Consumer hook ─────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
}
