import styles from './SkeletonCard.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// SkeletonCard — shimmer placeholder shown while tours are loading
// ─────────────────────────────────────────────────────────────────────────────
export default function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.image} />
      <div className={styles.body}>
        <div className={styles.badge} />
        <div className={styles.title} />
        <div className={styles.subtitle} />
        <div className={styles.row}>
          <div className={styles.chip} />
          <div className={styles.chip} />
        </div>
        <div className={styles.footer}>
          <div className={styles.price} />
          <div className={styles.btn} />
        </div>
      </div>
    </div>
  );
}
