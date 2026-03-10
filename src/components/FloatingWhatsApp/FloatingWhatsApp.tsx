import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import styles from './FloatingWhatsApp.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// FloatingWhatsApp — fixed pulsing button, opens WA chat with greeting
// ─────────────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER  = '972501234567'; // ← Replace with real number
const GREETING_MESSAGE = 'שלום TrailBlaze Israel! אני מעוניין/ת לשמוע על טיולי האופניים שלכם 🚵‍♂️';

function buildLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(GREETING_MESSAGE)}`;
}

export default function FloatingWhatsApp() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            className={styles.tooltip}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{   opacity: 0, x: 12 }}
            transition={{ duration: 0.18 }}
            role="tooltip"
          >
            <p className={styles.tooltipTitle}>צריכים עזרה?</p>
            <p className={styles.tooltipSub}>נשמח לענות בWhatsApp</p>
            {/* Close tooltip on mobile */}
            <button
              className={styles.tooltipClose}
              onClick={() => setIsTooltipVisible(false)}
              aria-label="סגור"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse ring */}
      <span className={styles.pulse} aria-hidden="true" />

      {/* Main button */}
      <motion.a
        href={buildLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
        aria-label="פתח שיחת WhatsApp עם TrailBlaze Israel"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.5 }}
      >
        <MessageCircle size={28} aria-hidden="true" />
      </motion.a>
    </div>
  );
}
