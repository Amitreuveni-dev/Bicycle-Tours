import { motion } from 'framer-motion';
import { ShieldCheck, Star, Users, Wrench, Map, Heart } from 'lucide-react';
import type { Feature } from '../../types';
import styles from './WhyUs.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// WhyUs — animated feature-cards section
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES: (Feature & { iconComp: React.ElementType })[] = [
  {
    icon:        'ShieldCheck',
    iconComp:    ShieldCheck,
    title:       'בטיחות מעל הכל',
    description: 'כל מסלול מתוכנן עם מדריכים מוסמכים, ציוד בטיחות מלא וביטוח מקיף לכל רוכב.',
  },
 {
    icon:        'Star',
    iconComp:    Star,
    title:       'ניסיון של 3 שנים',
    description: ',תכנון מסלולים רבים מאחורינו — אנחנו מכירים כל שביל, כל אבן וכל נוף בישראל.',
 // },
  {
    icon:        'Users',
    iconComp:    Users,
    title:       'קבוצות קטנות',
    description: 'עד 10 רוכבים לקבוצה, להבטחת חוויה אישית ומקצועית לכל אחד.',
  },
  {
    icon:        'Wrench',
    iconComp:    Wrench,
    title:       'תמיכה טכנית בשטח',
    description: 'לווי טכני מקצועי — שטח לא עוצר אותנו.',
  },
  {
    icon:        'Map',
    iconComp:    Map,
    title:       'מסלולים ייחודיים',
    description: 'שבילים שלא תמצאו בשום מדריך — גלויים ועמוקים, ממדבר, שפלה, עמק והר.',
  },
  {
    icon:        'Heart',
    iconComp:    Heart,
    title:       'אהבה לטבע ולרכיבה',
    description: 'אנחנו רוכבים בעצמנו. הטיולים שלנו נולדים מאהבה אמיתית לשבילים.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0  },
};

export default function WhyUs() {
  return (
    <section className={styles.section} aria-label="למה TrailBlaze Israel">
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.heading}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            למה <span className={styles.accent}>אנחנו?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            לא סתם טיולי אופניים — חוויה שמשנה פרספקטיבה
          </motion.p>
        </div>

        {/* Feature grid */}
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {FEATURES.map((feat) => {
            const Icon = feat.iconComp;
            return (
              <motion.div
                key={feat.title}
                className={styles.card}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-md)' }}
              >
                <div className={styles.iconWrapper} aria-hidden="true">
                  <Icon size={26} />
                </div>
                <h3 className={styles.cardTitle}>{feat.title}</h3>
                <p className={styles.cardDesc}>{feat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
