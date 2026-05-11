import { EventDetails } from "../../components/EventDetails/EventDetails";
import { EventCoverActions } from "../../components/EventCoverActions/EventCoverActions";
import styles from "./EventViewPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetEvent } from "../../hooks/useGetEvent";
import type { EventViewModel } from "../../models/event.model";

export default function EventViewPage() {
  const { id } = useParams<{ id: string }>();
  const { fetch, isfetchting, error } = useGetEvent();
  const [event, setEvent] = useState<EventViewModel | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState("/cover-default.png");

  useEffect(() => {
    if (id) {
      handleFetch(id);
    }
  }, [id]);

  async function handleFetch(id: string) {
    try {
      const event = await fetch(id);
      setEvent(event);
      setCoverImageUrl(event.coverImageUrl || "/cover-default.png");
    } catch {
      // error is captured in useAsync state;
      // no navigation on failure
    }
  }

  if (isfetchting) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className={styles.page}>
      <div
        className={styles.bgImage}
        style={{
          backgroundImage: `url(${event.coverImageUrl || coverImageUrl})`,
        }}
      />
      <div className={styles.layout}>
        <div className={styles.detailsArea}>
          <EventDetails event={event} />
        </div>
        <div className={styles.coverArea}>
          <EventCoverActions event={event} />
        </div>
      </div>
    </div>
  );
}
