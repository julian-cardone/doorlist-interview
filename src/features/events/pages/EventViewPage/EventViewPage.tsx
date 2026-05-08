import { EventDetails } from "../../components/EventDetails/EventDetails";
import { EventCoverActions } from "../../components/EventCoverActions/EventCoverActions";
import styles from "./EventViewPage.module.css";

export default function EventViewPage() {
  return (
    <div className={styles.page}>
      <div className={styles.bgGradient} aria-hidden="true" />
      <div className={styles.layout}>
        <div className={styles.detailsArea}>
          <EventDetails />
        </div>
        <div className={styles.coverArea}>
          <EventCoverActions />
        </div>
      </div>
    </div>
  );
}
