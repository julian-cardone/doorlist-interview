import { EventCreateCard } from "../../components/EventCreateCard/EventCreateCard";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import styles from "./EventCreatePage.module.css";

export default function EventCreatePage() {
  const { submit, isSubmitting } = useCreateEvent();

  return (
    <div className={styles.page}>
      <EventCreateCard onSubmit={submit} isSubmitting={isSubmitting} />
    </div>
  );
}
