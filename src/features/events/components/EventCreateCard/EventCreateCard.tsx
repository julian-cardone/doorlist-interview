import { EventCreateForm } from "../EventCreateForm/EventCreateForm";
import { EventCoverPicker } from "../EventCoverPicker/EventCoverPicker";
import styles from "./EventCreateCard.module.css";

export function EventCreateCard() {
  return (
    <div className={styles.card}>
      <div className={styles.formArea}>
        <EventCreateForm />
      </div>
      {/* <div className={styles.pickerArea}>
        <EventCoverPicker />
      </div> */}
    </div>
  );
}
