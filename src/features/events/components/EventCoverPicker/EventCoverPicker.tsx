import styles from "./EventCoverPicker.module.css";

const SAMPLE_THUMBNAILS = [
  { id: 1, color: "#c084fc" },
  { id: 2, color: "#f472b6" },
  { id: 3, color: "#34d399" },
  { id: 5, color: "#60a5fa" },
  { id: 6, color: "#60a5fa" },
  { id: 7, color: "#60a5fa" },
  { id: 8, color: "#60a5fa" },
  { id: 9, color: "#60a5fa" },
  { id: 10, color: "#60a5fa" },
  { id: 11, color: "#60a5fa" },
  { id: 12, color: "#60a5fa" },
  { id: 13, color: "#60a5fa" },
];

export function EventCoverPicker() {
  return (
    <div className={styles.picker}>
      <div className={styles.coverImageBox}>
        <div className={styles.coverPlaceholder} />
      </div>
      <div className={styles.thumbnails}>
        {SAMPLE_THUMBNAILS.map((t) => (
          <div
            key={t.id}
            className={styles.thumbnail}
            style={{ backgroundColor: t.color }}
          />
        ))}
      </div>
    </div>
  );
}
