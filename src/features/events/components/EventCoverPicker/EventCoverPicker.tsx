import { PhotoIcon } from "../../../../components/ui/icons/PhotoIcon";
import { useHorizontalWheelScroll } from "../../../../hooks/useHorizontalWheelScroll";
import { cx } from "../../../../lib/cssUtils";
import { SAMPLE_PHOTOS } from "../../../../lib/sampleData";
import styles from "./EventCoverPicker.module.css";

type EventCoverPickerProps = {
  selectedUrl: string;
  onSelect: (url: string) => void;
  onOpenPhotoPicker: () => void;
};

export function EventCoverPicker({
  selectedUrl,
  onSelect,
  onOpenPhotoPicker,
}: EventCoverPickerProps) {
  const { ref: horizontalScrollRef, onWheel: handleHorizontalWheel } =
    useHorizontalWheelScroll<HTMLDivElement>();

  return (
    <div className={styles.picker}>
      <div className={styles.coverImageBox}>
        <img
          src={selectedUrl}
          alt="Event cover"
          className={styles.coverImage}
        />
      </div>

      <div
        className={cx(styles.thumbnails, "scrollX")}
        ref={horizontalScrollRef}
        onWheel={handleHorizontalWheel}
      >
        <button
          type="button"
          className={cx(styles.thumbnail, styles.thumbnailOpenPicker)}
          aria-label="Open photo picker"
          onClick={onOpenPhotoPicker}
        >
          <PhotoIcon />
        </button>

        {SAMPLE_PHOTOS.map((photo) => {
          const isSelected = selectedUrl === photo.url;

          return (
            <button
              key={photo.id}
              type="button"
              className={cx(
                styles.thumbnail,
                isSelected && styles.thumbnailSelected,
              )}
              aria-label={`Select photo ${photo.id}`}
              aria-pressed={isSelected}
              onClick={() => onSelect(photo.url)}
            >
              <img src={photo.url} alt="" className={styles.thumbnailImage} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
