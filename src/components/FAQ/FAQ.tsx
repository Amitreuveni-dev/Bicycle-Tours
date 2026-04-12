import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../../types';
import styles from './FAQ.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — accessible accordion with single-open behaviour
// ─────────────────────────────────────────────────────────────────────────────

const FAQ_DATA: FaqItem[] = [
  {
    id: '1',
    question: 'האם צריך ניסיון קודם ברכיבת הרים?',
    answer:
      'לא לכולם. יש לנו מסלולים לכל הרמות — מהמתחיל המוחלט ועד הרוכב המנוסה. בזמן ההרשמה אנחנו שואלים על רמת הניסיון ומתאימים לכם את המסלול הנכון.',
  },
  {
    id: '2',
    question: 'מה כלול במחיר?',
    answer:
      'כל מסלול כולל מדריך מקומי מוסמך, ציוד בטיחות בסיסי (קסדה). מסלולי eMTB כוללים גם אופניים חשמליות Premium. ארוחות בוקר וערב מצוינות כמפורט בפרטי הטיול.',
  },
  {
    id: '3',
    question: 'מה קורה אם מזג האוויר רע?',
    answer:
      'בטיחות היא עדיפות עליונה. במקרה של מזג אוויר קיצוני (גשם חזק, ברד, סופות) אנחנו מעדיפים לדחות את הטיול. מדיניות הביטול שלנו גמישה ומבוסת על כבוד לרוכב.',
  },
  {
    id: '4',
    question: 'כמה אנשים יש בכל קבוצה?',
    answer:
      'אנחנו שומרים על קבוצות קטנות של עד 10 רוכבים. כך כל אחד מקבל תשומת לב אישית מהמדריך, וכל הקבוצה נהנית מחוויה איכותית ואינטימית.',
  },
  {
    id: '5',
    question: 'האם אפשר לשכור אופניים?',
    answer:
      'כן! אנחנו מציעים השכרת אופניי הרים מקצועיות (hardtail ו-full suspension) וכן אופניים חשמליות (eMTB). האופניים עוברות בדיקה טכנית לפני כל טיול.',
  },
  {
    id: '6',
    question: 'כיצד ניצור קשר לתיאום טיול?',
    answer:
      'הדרך הקלה ביותר היא דרך כפתור ה-WhatsApp שבאתר. ניתן גם למלא את טופס "התאמת טיול" ואנחנו נחזור אליכם תוך 24 שעות.',
  },
];

interface AccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <motion.div
      className={`${styles.item} ${isOpen ? styles.open : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      <button
        className={styles.trigger}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${item.id}`}
        id={`faq-trigger-${item.id}`}
      >
        <span className={styles.question}>{item.question}</span>
        <motion.span
          className={styles.chevron}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${item.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
            className={styles.panelWrapper}
          >
            <p className={styles.answer}>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className={styles.section} aria-label="שאלות נפוצות">
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.heading}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            שאלות <span className={styles.accent}>נפוצות</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            יש לכם שאלה? כנראה שכבר ענינו עליה
          </motion.p>
        </div>

        {/* Accordion list */}
        <div className={styles.list} role="list">
          {FAQ_DATA.map((item, i) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
