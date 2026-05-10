import { EventCreateForm } from "../EventCreateForm/EventCreateForm";
import { EventCoverPicker } from "../EventCoverPicker/EventCoverPicker";
import styles from "./EventCreateCard.module.css";
import type { EventFormModel } from "../../models/event.model";

type EventCreateCardProps = {
  onSubmit: (data: EventFormModel) => void;
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
