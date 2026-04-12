import { motion } from 'framer-motion';
import { MapPin, Clock, TrendingUp, Route } from 'lucide-react';
import type { Tour } from '../../../types';
import styles from './TourCard.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// TourCard — clickable tour summary card
// ─────────────────────────────────────────────────────────────────────────────

interface TourCardProps {
  tour: Tour;
  onSelect: (tour: Tour) => void;
}

/** Renders 5 difficulty dots, filled up to the tour's difficulty level. */
function DifficultyDots({ level }: { level: number }) {
  return (
    <div className={styles.dots} aria-label={`רמת קושי ${level} מתוך 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`${styles.dot} ${i < level ? styles.filled : ''}`}
        />
      ))}
    </div>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  XC:   'קרוס קאנטרי',
  MTB:  'הר',
  eMTB: 'חשמלי',
};

export default function TourCard({ tour, onSelect }: TourCardProps) {
  return (
    <motion.article
      className={styles.card}
      onClick={() => onSelect(tour)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(tour); }}
      aria-label={`${tour.title} — לחץ לפרטים`}
      whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Image */}
      <div className={styles.imageWrapper}>
        <img
          src={tour.image}
          alt={tour.title}
          className={styles.image}
          loading="lazy"
        />
        {/* Category badge */}
        <span className={`${styles.categoryBadge} ${styles[`cat${tour.category}`]}`}>
          {tour.category}
        </span>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Location */}
        <div className={styles.location}>
          <MapPin size={13} aria-hidden="true" />
          <span>{tour.location}</span>
          <span className={styles.categoryLabel}>{CATEGORY_LABELS[tour.category]}</span>
        </div>

        {/* Title */}
        <h3 className={styles.title}>{tour.title}</h3>
        <p className={styles.subtitle}>{tour.subtitle}</p>

        {/* Meta chips */}
        <div className={styles.meta}>
          <span className={styles.chip}>
            <Clock size={13} aria-hidden="true" />
            {tour.duration}
          </span>
          <span className={styles.chip}>
            <Route size={13} aria-hidden="true" />
            {tour.distance}
          </span>
          <span className={styles.chip}>
            <TrendingUp size={13} aria-hidden="true" />
            {tour.elevation}
          </span>
        </div>

        {/* Difficulty */}
        <div className={styles.difficultyRow}>
          <span className={styles.difficultyLabel}>קושי:</span>
          <DifficultyDots level={tour.difficulty} />
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceFrom}>החל מ-</span>
            <span className={styles.priceValue}>€{tour.price.toLocaleString()}</span>
          </div>
          <span className={styles.detailsCta}>פרטים ←</span>
        </div>
      </div>
    </motion.article>
  );
}
