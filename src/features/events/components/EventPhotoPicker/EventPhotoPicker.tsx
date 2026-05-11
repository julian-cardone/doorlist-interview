import { useState } from "react";
import { cx } from "../../../../lib/cssUtils";
import styles from "./EventPhotoPicker.module.css";
import { ChevronRightIcon } from "../../../../components/ui/icons/ChevronLeftIcon";
import { PHOTO_SETS } from "../../../../lib/sampleData";
import type { EventPhotoPickerProps } from "./EventPhotoPickerProps";

type PhotoCategory = {
  label: string;
  icon: string;
};

const CATEGORIES: PhotoCategory[] = [
  { label: "Featured", icon: "↯" },
  { label: "Gifs", icon: "GIF" },
  { label: "Party", icon: "🎉" },
  { label: "Meme", icon: "☁️" },
  { label: "Greek Life", icon: "♻︎" },
];

export function EventPhotoPicker({
  onBack,
  onSelectPhoto,
}: EventPhotoPickerProps) {
  const [activeCategory, setActiveCategory] = useState("Featured");
  const [search, setSearch] = useState("");

  const photos = PHOTO_SETS[activeCategory];

  return (
    <section className={styles.photoPicker}>
      <header className={styles.header}>
        <button className={styles.backButton} type="button" onClick={onBack}>
          <ChevronRightIcon />
        </button>

        <h2 className={styles.title}>Event Cover</h2>
      </header>

      <label className={styles.searchBar}>
        <span className={styles.searchIcon}>⌕</span>

        <input
          className={styles.searchInput}
          placeholder="Find an image"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.label;

          return (
            <button
              key={category.label}
              className={cx(styles.category, isActive && styles.activeCategory)}
              type="button"
              onClick={() => setActiveCategory(category.label)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          );
        })}
      </nav>

      {search ? (
        <div className={styles.emptyState}>
          <img
            className={styles.emptyImage}
            src="/icons/try-something-else.svg"
            alt=""
          />

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
