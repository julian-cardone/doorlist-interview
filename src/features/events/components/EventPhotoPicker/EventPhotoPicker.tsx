import { useState } from "react";
import styles from "./EventPhotoPicker.module.css";

function ChevronLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type Photo = { id: string; src: string; alt: string };

function genPhotos(prefix: string, count: number): Photo[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    src: `https://picsum.photos/seed/${prefix}${i + 1}/300/300`,
    alt: "Event cover option",
  }));
}

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

const PHOTO_SETS: Record<string, Photo[]> = {
  Featured: genPhotos("feat", 16),
  Gifs: genPhotos("gif", 16),
  Party: genPhotos("party", 16),
  Meme: genPhotos("meme", 16),
  "Greek Life": genPhotos("greek", 16),
};

type Props = {
  onBack?: () => void;
  onSelectPhoto?: (imageUrl: string) => void;
};

export function EventPhotoPicker({ onBack, onSelectPhoto }: Props) {
  const [activeCategory, setActiveCategory] = useState("Featured");
  const [search, setSearch] = useState("");
  const photos = PHOTO_SETS[activeCategory];

  return (
    <section className={styles.photoPicker}>
      <header className={styles.header}>
        <button className={styles.backButton} type="button" onClick={onBack}>
          <ChevronLeftIcon />
        </button>
        <h2 className={styles.title}>Event Cover</h2>
      </header>

      <label className={styles.searchBar}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          className={styles.searchInput}
          placeholder="Find an image"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </label>

      <nav className={styles.categories} aria-label="Photo categories">
        {categories.map((category) => (
          <button
            key={category.label}
            className={cx(
              styles.category,
              activeCategory === category.label && styles.activeCategory,
            )}
            type="button"
            onClick={() => setActiveCategory(category.label)}
          >
            <span className={styles.categoryIcon}>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </nav>

      {search ? (
        <div className={styles.emptyState}>
          <img src="/icons/try-something-else.svg" alt="" />
          <p className={styles.emptyTitle}>Try something else!</p>
          <p className={styles.emptySubtext}>
            Couldn't find what you were looking for. Try a different search.
          </p>
        </div>
      ) : (
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
      )}
    </section>
  );
}
