import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// Navbar — sticky, glassmorphism, smooth-scroll, mobile hamburger, theme toggle
// ─────────────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'בית',         href: '#home'    },
  { label: 'מסלולים',    href: '#tours'   },
  { label: 'למה אנחנו',  href: '#why-us'  },
  { label: 'שאלות נפוצות', href: '#faq'  },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [activeLink, setActiveLink]   = useState('#home');

  // Add / remove scrolled class for backdrop-blur effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const scrollTo = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const offset = 72; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveLink(href);
    setIsMenuOpen(false);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}
      role="navigation"
      aria-label="ניווט ראשי"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <button
          className={styles.logo}
          onClick={() => scrollTo('#home')}
          aria-label="חזרה לראש העמוד"
        >
          <Mountain size={26} className={styles.logoIcon} aria-hidden="true" />
          <span>
            Trail<strong>Blaze</strong>
            <span className={styles.logoSuffix}> Israel</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                className={`${styles.link} ${activeLink === link.href ? styles.active : ''}`}
                onClick={() => scrollTo(link.href)}
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.span
                    className={styles.linkUnderline}
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right-side actions */}
        <div className={styles.actions}>
          {/* Theme toggle */}
          <motion.button
            className={styles.themeBtn}
            onClick={toggleTheme}
            whileTap={{ scale: 0.85 }}
            aria-label={isDark ? 'מעבר למצב בהיר' : 'מעבר למצב כהה'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate:   0, opacity: 1 }}
                exit={{   rotate:  90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* CTA */}
          <motion.button
            className={styles.cta}
            onClick={() => scrollTo('#match')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            התאמת טיול
          </motion.button>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ul role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    className={`${styles.drawerLink} ${activeLink === link.href ? styles.active : ''}`}
                    onClick={() => scrollTo(link.href)}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 }}
              >
                <button
                  className={styles.drawerCta}
                  onClick={() => scrollTo('#match')}
                >
                  התאמת טיול
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
