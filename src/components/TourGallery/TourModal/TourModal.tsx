import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MapPin, Clock, TrendingUp, Route,
  ShieldCheck, Users, Coffee, Utensils,
  Droplets, FileCheck, Wrench, Bike,
  Share2, CheckCircle2,
} from 'lucide-react';
import type { Tour } from '../../../types';
import styles from './TourModal.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// TourModal — detailed tour popup with included-list, equipment & WhatsApp share
// ─────────────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '+972547887700'; // ← Replace with real number

// Map icon-name strings (from JSON) to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck, Users, Coffee, Utensils,
  Droplets, FileCheck, Wrench, Bike,
};

function buildWhatsAppMessage(tour: Tour): string {
  const msg = `שלום! אני מעוניין/ת בטיול "${tour.title}" — ${tour.duration}, ${tour.distance}, ${tour.location}. החל מ-₪${tour.price}. אשמח לשמוע פרטים נוספים 😊`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

interface TourModalProps {
  tour: Tour | null;
  onClose: () => void;
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className={styles.dots} aria-label={`רמת קושי ${level} מתוך 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`${styles.dot} ${i < level ? styles.filled : ''}`} />
      ))}
    </div>
  );
}

export default function TourModal({ tour, onClose }: TourModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!tour) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [tour, onClose]);

  return (
    <AnimatePresence>
      {tour && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`פרטי מסלול: ${tour.title}`}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            {/* Close button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="סגור">
              <X size={22} aria-hidden="true" />
            </button>

            {/* Hero image */}
            <div className={styles.imageWrapper}>
              <img src={tour.image} alt={tour.title} className={styles.image} />
              <div className={styles.imageOverlay} />
              <div className={styles.imageContent}>
                <span className={`${styles.categoryBadge} ${styles[`cat${tour.category}`]}`}>
                  {tour.category}
                </span>
                <h2 className={styles.title}>{tour.title}</h2>
                <p className={styles.subtitle}>{tour.subtitle}</p>
              </div>
            </div>

            {/* Scrollable content */}
            <div className={styles.content}>
              {/* Stats bar */}
              <div className={styles.statsBar}>
                {[
                  { icon: MapPin, label: tour.location },
                  { icon: Clock, label: tour.duration },
                  { icon: Route, label: tour.distance },
                  { icon: TrendingUp, label: tour.elevation },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className={styles.stat}>
                    <Icon size={16} aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Difficulty */}
              <div className={styles.difficultyRow}>
                <span className={styles.difficultyLabel}>רמת קושי:</span>
                <DifficultyDots level={tour.difficulty} />
              </div>

              {/* Description */}
              <p className={styles.description}>{tour.description}</p>

              {/* What's Included */}
              <section className={styles.section} aria-label="מה כלול">
                <h3 className={styles.sectionTitle}>✅ מה כלול?</h3>
                <ul className={styles.includedList}>
                  {tour.included.map((item) => {
                    const IconComp = ICON_MAP[item.icon] ?? CheckCircle2;
                    return (
                      <li key={item.text} className={styles.includedItem}>
                        <IconComp size={18} className={styles.includedIcon} aria-hidden="true" />
                        <span>{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* Equipment list */}
              <section className={styles.section} aria-label="ציוד אישי נדרש">
                <h3 className={styles.sectionTitle}>🎒 ציוד אישי נדרש</h3>
                <ul className={styles.equipmentList}>
                  {tour.equipment.map((item) => (
                    <li key={item} className={styles.equipmentItem}>
                      <span className={styles.bullet} aria-hidden="true">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Highlights */}
              <section className={styles.section} aria-label="נקודות השיא">
                <h3 className={styles.sectionTitle}>⭐ נקודות השיא</h3>
                <ul className={styles.highlightList}>
                  {tour.highlights.map((h) => (
                    <li key={h} className={styles.highlightItem}>{h}</li>
                  ))}
                </ul>
              </section>

              {/* Footer CTA */}
              <div className={styles.modalFooter}>
                <div className={styles.priceBlock}>
                  <span className={styles.priceFrom}>החל מ-</span>
                  <span className={styles.priceValue}>₪{tour.price.toLocaleString()}</span>
                  <span className={styles.pricePer}> לאדם</span>
                </div>
                <motion.a
                  href={buildWhatsAppMessage(tour)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="שתף ב-WhatsApp ופצור קשר"
                >
                  <Share2 size={18} aria-hidden="true" />
                  שלח ב-WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
