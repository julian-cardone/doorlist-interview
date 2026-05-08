import styles from "./EventCoverPicker.module.css";

const SAMPLE_THUMBNAILS = [
  { id: 1, color: "#c084fc" },
  { id: 2, color: "#f472b6" },
  { id: 3, color: "#34d399" },
  { id: 4, color: "#60a5fa" },
];

export function EventCoverPicker() {
  return (
    <div className={styles.picker}>
      <div className={styles.coverImageBox}>
        <div className={styles.coverPlaceholder} />
      </div>
      <div className={styles.thumbnails}>
        {SAMPLE_THUMBNAILS.map((t) => (
          <div key={t.id} className={styles.thumbnail} style={{ backgroundColor: t.color }} />
        ))}
      </div>
    </div>
  );
}
