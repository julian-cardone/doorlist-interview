import { useHorizontalWheelScroll } from "../../../../hooks/useHorizontalWheelScroll";
import styles from "./EventCoverPicker.module.css";

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const SEEDS = [
  "ev3",
  "ev4",
  "ev5",
  "ev6",
  "ev7",
  "ev8",
  "ev9",
  "ev10",
  "ev13",
  "ev14",
];

const SAMPLE_PHOTOS = [
  { id: 0, url: "/cover-default.png" },
  ...SEEDS.map((seed, i) => ({
    id: i + 1,
    url: `https://picsum.photos/seed/${seed}/400`,
  })),
];

type EventCoverPickerProps = {
  selectedUrl?: string;
  onSelect: (url: string) => void;
  onOpenPhotoPicker: () => void;
};

export function EventCoverPicker({
  selectedUrl,
  onSelect,
  onOpenPhotoPicker,
}: EventCoverPickerProps) {
  const horizontalScroll = useHorizontalWheelScroll<HTMLDivElement>();

  return (
    <div className={styles.picker}>
      <div className={styles.coverImageBox}>
        {selectedUrl ? (
          <img
            src={selectedUrl}
            alt="Event cover"
            className={styles.coverImage}
          />
        ) : (
          <div className={styles.coverPlaceholder} />
        )}
      </div>

      <div
        className={`${styles.thumbnails} scrollX`}
        ref={horizontalScroll.ref}
        onWheel={horizontalScroll.onWheel}
      >
        <button
          type="button"
          className={cx(styles.thumbnail, styles.thumbnailOpenPicker)}
          aria-label="Open photo picker"
          onClick={onOpenPhotoPicker}
        >
          <PhotoIcon />
        </button>

        {SAMPLE_PHOTOS.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className={cx(
              styles.thumbnail,
              selectedUrl === photo.url && styles.thumbnailSelected,
            )}
            aria-label={`Select photo ${photo.id}`}
            aria-pressed={selectedUrl === photo.url}
            onClick={() => onSelect(photo.url)}
          >
            <img src={photo.url} alt="" className={styles.thumbnailImage} />
          </button>
        ))}
      </div>
    </div>
  );
}

function PhotoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
