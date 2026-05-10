import { EventCreateForm } from "../EventCreateForm/EventCreateForm";
import { EventCoverPicker } from "../EventCoverPicker/EventCoverPicker";
import type { EventFormModel } from "../../models/event.model";
import styles from "./EventCreateCard.module.css";

type EventCreateCardProps = {
  onSubmit: (data: EventFormModel) => void;
  isSubmitting?: boolean;
  coverImageUrl?: string;
  onSelectCoverImage: (url: string) => void;
  onOpenPhotoPicker: () => void;
};

export function EventCreateCard({
  onSubmit,
  isSubmitting,
  coverImageUrl,
  onSelectCoverImage,
  onOpenPhotoPicker,
}: EventCreateCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.formArea}>
        <EventCreateForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          coverImageUrl={coverImageUrl}
        />
      </div>

      <div className={styles.pickerArea}>
        <EventCoverPicker
          selectedUrl={coverImageUrl}
          onSelect={onSelectCoverImage}
          onOpenPhotoPicker={onOpenPhotoPicker}
        />
      </div>
    </div>
  );
}
