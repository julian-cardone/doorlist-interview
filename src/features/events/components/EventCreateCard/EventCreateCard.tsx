import { EventCreateForm } from "../EventCreateForm/EventCreateForm";
import { EventCoverPicker } from "../EventCoverPicker/EventCoverPicker";
import type { EventFormData } from "../../models/event";
import styles from "./EventCreateCard.module.css";

type EventCreateCardProps = {
  onSubmit: (data: EventFormData) => void;
  isSubmitting?: boolean;
};

export function EventCreateCard({
  onSubmit,
  isSubmitting,
}: EventCreateCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.formArea}>
        <EventCreateForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </div>
      <div className={styles.pickerArea}>
        <EventCoverPicker />
      </div>
    </div>
  );
}
