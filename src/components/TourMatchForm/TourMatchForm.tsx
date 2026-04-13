import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bike, Activity, MapPin, MessageSquare } from 'lucide-react';
import type { UserPreferences } from '../../types';
import styles from './TourMatchForm.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// TourMatchForm — lead-gen form that opens WhatsApp with a pre-filled message
// ─────────────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '+972547887700';

const DESTINATIONS = [
  'יער הכרמל',
  'מכתש רמון (נגב)',
  'הגליל העליון',
  'הרי יהודה',
  'חוף הכינרת',
  'רמת הגולן',
  'מפתיע אותי — בחרו בשבילי!',
];

const FITNESS_LABELS: Record<string, string> = {
  beginner:     'מתחיל — רכיבה בסיסית',
  intermediate: 'בינוני — רוכב סדיר',
  advanced:     'מתקדם — ניסיון הרים',
  expert:       'מקצועי — כושר גבוה',
};

const DEFAULT_PREFS: UserPreferences = {
  name:         '',
  bikeType:     'regular',
  fitnessLevel: 'intermediate',
  destination:  DESTINATIONS[0],
  notes:        '',
};

function buildWhatsAppLink(prefs: UserPreferences): string {
  const fitnessHe = FITNESS_LABELS[prefs.fitnessLevel] ?? prefs.fitnessLevel;
  const bikeHe    = prefs.bikeType === 'electric' ? 'חשמלית (eMTB)' : 'רגילה (MTB/XC)';

  const msg = [
    `שלום! אני ${prefs.name} ואני מחפש/ת טיול אופניים מתאים 🚵‍♂️`,
    ``,
    `🚲 סוג אופניים: ${bikeHe}`,
    `💪 רמת כושר: ${fitnessHe}`,
    `📍 יעד מועדף: ${prefs.destination}`,
    prefs.notes ? `📝 הערות: ${prefs.notes}` : '',
    ``,
    `אשמח לשמוע אילו מסלולים מתאימים לי — תודה!`,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function TourMatchForm() {
  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULT_PREFS);

  const update = (field: keyof UserPreferences) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setPrefs((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!prefs.name.trim()) return; // basic guard
    window.open(buildWhatsAppLink(prefs), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={styles.section} aria-label="טופס התאמת טיול">
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.heading}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className={styles.accent}>התאמת טיול</span> אישי
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            ספרו לנו קצת ונמצא את הטיול המושלם עבורכם
          </motion.p>
        </div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          noValidate
        >
          {/* Name */}
          <div className={styles.field}>
            <label htmlFor="match-name" className={styles.label}>
              <User size={16} aria-hidden="true" />
              שם מלא
            </label>
            <input
              id="match-name"
              type="text"
              className={styles.input}
              placeholder="ישראל ישראלי"
              value={prefs.name}
              onChange={update('name')}
              required
              aria-required="true"
            />
          </div>

          {/* Bike type */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              <Bike size={16} aria-hidden="true" />
              סוג אופניים
            </legend>
            <div className={styles.radioGroup}>
              {([
                { value: 'electric', label: 'חשמלית (eMTB)' },
                { value: 'electric', label: 'רגיל (eMTB)' },
              ] as const).map(({ value, label }) => (
                <label
                  key={value}
                  className={`${styles.radioCard} ${prefs.bikeType === value ? styles.radioSelected : ''}`}
                >
                  <input
                    type="radio"
                    name="bikeType"
                    value={value}
                    checked={prefs.bikeType === value}
                    onChange={update('bikeType')}
                    className={styles.radioInput}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Fitness level */}
          <div className={styles.field}>
            <label htmlFor="match-fitness" className={styles.label}>
              <Activity size={16} aria-hidden="true" />
              רמת כושר
            </label>
            <select
              id="match-fitness"
              className={styles.select}
              value={prefs.fitnessLevel}
              onChange={update('fitnessLevel')}
            >
              {Object.entries(FITNESS_LABELS).map(([val, lbl]) => (
                <option key={val} value={val}>{lbl}</option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div className={styles.field}>
            <label htmlFor="match-dest" className={styles.label}>
              <MapPin size={16} aria-hidden="true" />
              יעד מועדף
            </label>
            <select
              id="match-dest"
              className={styles.select}
              value={prefs.destination}
              onChange={update('destination')}
            >
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className={styles.field}>
            <label htmlFor="match-notes" className={styles.label}>
              <MessageSquare size={16} aria-hidden="true" />
              הערות נוספות (אופציונלי)
            </label>
            <textarea
              id="match-notes"
              className={styles.textarea}
              rows={4}
              placeholder="תאריכים מועדפים, מגבלות רפואיות, מספר משתתפים..."
              value={prefs.notes}
              onChange={update('notes')}
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className={styles.submitBtn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!prefs.name.trim()}
          >
            <Send size={18} aria-hidden="true" />
            שלח ב-WhatsApp
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
