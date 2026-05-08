import { EventCreateCard } from "../../components/EventCreateCard/EventCreateCard";
import styles from "./EventCreatePage.module.css";

export default function EventCreatePage() {
  return (
    <div className={styles.page}>
      <EventCreateCard />
    </div>
  );
}
