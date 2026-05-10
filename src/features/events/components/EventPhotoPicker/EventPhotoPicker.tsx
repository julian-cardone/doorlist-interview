import styles from "./EventPhotoPicker.module.css";

type PhotoCategory = {
  label: string;
  icon: string;
};

const categories: PhotoCategory[] = [
  { label: "Featured", icon: "↯" },
  { label: "Gifs", icon: "GIF" },
  { label: "Party", icon: "🎉" },
  { label: "Meme", icon: "☁️" },
  { label: "Greek Life", icon: "♻︎" },
];

const photos = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  src: `https://picsum.photos/300/300?random=${index + 1}`,
  alt: "Event cover option",
}));

type Props = {
  onBack?: () => void;
  onSelectPhoto?: (imageUrl: string) => void;
};

export function EventPhotoPicker({ onBack, onSelectPhoto }: Props) {
  return (
    <section className={styles.photoPicker}>
      <header className={styles.header}>
        <button className={styles.backButton} type="button" onClick={onBack}>
          ›
        </button>

        <h2 className={styles.title}>Event Cover</h2>
      </header>

      <label className={styles.searchBar}>
        <span className={styles.searchIcon}>⌕</span>
        <input className={styles.searchInput} placeholder="Find an image" />
      </label>

      <nav className={styles.categories} aria-label="Photo categories">
        {categories.map((category, index) => (
          <button
            key={category.label}
            className={`${styles.category} ${
              index === 0 ? styles.activeCategory : ""
            }`}
            type="button"
          >
            <span className={styles.categoryIcon}>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.photoGrid}>
        {photos.map((photo) => (
          <button
            key={photo.id}
            className={styles.photoButton}
            type="button"
            onClick={() => onSelectPhoto?.(photo.src)}
          >
            <img className={styles.photo} src={photo.src} alt={photo.alt} />
          </button>
        ))}
      </div>
    </section>
  );
}
