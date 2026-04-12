import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Tour, FilterCategory } from '../../types';
import toursData from '../../data/tours.json';
import TourCard from './TourCard/TourCard';
import SkeletonCard from './SkeletonCard/SkeletonCard';
import TourModal from './TourModal/TourModal';
import styles from './TourGallery.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// TourGallery — filter tabs, skeleton loaders, responsive card grid, modal
// ─────────────────────────────────────────────────────────────────────────────

const tours = (toursData as Tour[]).filter(t => t.active !== false);

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'הכל',  value: 'all'  },
  { label: 'XC',   value: 'XC'   },
  { label: 'MTB',  value: 'MTB'  },
  { label: 'eMTB', value: 'eMTB' },
];

const SKELETON_COUNT = 6;
const LOAD_DELAY_MS  = 1600;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};

export default function TourGallery() {
  const [isLoading, setIsLoading]       = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  // Simulate async data fetch
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOAD_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const filteredTours = useMemo(
    () =>
      activeFilter === 'all'
        ? tours
        : tours.filter((t) => t.category === activeFilter),
    [activeFilter],
  );

  return (
    <div className={styles.gallery}>
      <div className={styles.container}>
        {/* Section heading */}
        <div className={styles.heading}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            המסלולים <span className={styles.accent}>שלנו</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            מהכרמל הירוק ועד מכתש רמון — מסלול בשבילך
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          role="group"
          aria-label="סינון מסלולים"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${activeFilter === f.value ? styles.active : ''}`}
              onClick={() => setActiveFilter(f.value)}
              aria-pressed={activeFilter === f.value}
            >
              {f.label}
              {activeFilter === f.value && (
                <motion.span
                  className={styles.filterPill}
                  layoutId="filterPill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid — skeleton or cards */}
        {isLoading ? (
          <div className={styles.grid} aria-busy="true" aria-label="טוען מסלולים">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className={styles.grid}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredTours.map((tour) => (
                <motion.div key={tour.id} variants={cardVariants}>
                  <TourCard tour={tour} onSelect={setSelectedTour} />
                </motion.div>
              ))}

              {filteredTours.length === 0 && (
                <motion.p
                  className={styles.empty}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  לא נמצאו מסלולים בקטגוריה זו.
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Detail modal */}
      <TourModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
    </div>
  );
}
