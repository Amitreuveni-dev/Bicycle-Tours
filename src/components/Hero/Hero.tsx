import { motion } from 'framer-motion';
import { ChevronDown, Compass, Zap } from 'lucide-react';
import styles from './Hero.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// Hero — full-viewport landing section with animated text & dual CTA
// ─────────────────────────────────────────────────────────────────────────────

const HERO_BG =
  'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=1800&auto=format&fit=crop&q=85';

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// Stagger container variant
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="כותרת ראשית">
      {/* Background image */}
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${HERO_BG})` }}
        role="img"
        aria-label="רוכב אופניים בנוף הרי ישראל"
      />

      {/* Gradient overlay */}
      <div className={styles.overlay} />

      {/* Animated content */}
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div className={styles.badge} variants={fadeUp}>
          <Compass size={15} aria-hidden="true" />
          <span>טיולי בוטיק בארץ ובעולם</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 className={styles.title} variants={fadeUp}>
          גלה את העולם<br />
          <span className={styles.accent}>על שתי רגליים או שני גלגלים</span>
        </motion.h1>

        {/* Sub-title */}
        <motion.p className={styles.subtitle} variants={fadeUp}>
          מסלולי MTB מדהימים, מדריכים מקצועיים, וחוויות שיישארו איתך לנצח.
          <br />
          
        </motion.p>

        {/* CTA row */}
        <motion.div className={styles.ctaRow} variants={fadeUp}>
          <motion.button
            className={styles.ctaPrimary}
            onClick={() => scrollTo('#tours')}
            whileHover={{ scale: 1.04, boxShadow: '0 6px 30px rgba(255,107,0,0.5)' }}
            whileTap={{ scale: 0.96 }}
          >
            <Compass size={18} aria-hidden="true" />
            גלה מסלולים
          </motion.button>

          <motion.button
            className={styles.ctaSecondary}
            onClick={() => scrollTo('#match')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Zap size={18} aria-hidden="true" />
            התאמת טיול אישי
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div className={styles.stats} variants={fadeUp}>
          {[
            { value: '6+',   label: 'מסלולים ייחודיים' },
            { value: '500+', label: 'רוכבים שמחים' },
            { value: '12',   label: 'שנות ניסיון' },
          ].map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className={styles.scrollIndicator}
        onClick={() => scrollTo('#tours')}
        aria-label="גלול לתוכן"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
}
