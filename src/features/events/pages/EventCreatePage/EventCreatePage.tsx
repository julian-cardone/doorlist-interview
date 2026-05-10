import { useNavigate } from "react-router-dom";
import { EventCreateCard } from "../../components/EventCreateCard/EventCreateCard";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import type { EventFormModel } from "../../models/event.model";
import styles from "./EventCreatePage.module.css";

export default function EventCreatePage() {
  const { submit, isSubmitting } = useCreateEvent();
  const navigate = useNavigate();

  async function handleSubmit(data: EventFormModel) {
    if (isSubmitting) return;
    try {
      const event = await submit(data);

      navigate(`/events/${event.id}`);
    } catch {
      // error is captured in useAsync state; no navigation on failure
    }
  }

  return (
    <div className={styles.page}>
      <EventCreateCard onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
