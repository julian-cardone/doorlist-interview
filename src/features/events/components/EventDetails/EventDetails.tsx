import { useState } from "react";
import { Button } from "../../../../components/ui/Button/Button";
import styles from "./EventDetails.module.css";
import { LocationIcon } from "../../../../components/ui/icons/LocationIcon";
import { CalendarIcon } from "../../../../components/ui/icons/CalendarIcon";
import type { EventViewModel } from "../../models/event.model";
import { Avatar } from "../../../../components/ui/Avatar/Avatar";
import { gradientFor } from "../../../../lib/sampleData";
import {
  formatDateRange,
  formatTimeRange,
} from "../DateTimePickerPanel/dateTimePickerUtils";
import { FloatingEmojis } from "../FloatingEmojis/FloatingEmojis";

type EventDetailsProps = {
  event: EventViewModel;
};

export function EventDetails({ event }: EventDetailsProps) {
  const [expanded, setExpanded] = useState(false);

  const displayText =
    event.description && event.description.length > 120 && !expanded
      ? event.description.slice(0, 120) + "…"
      : event.description;

  const mapSrc =
    "https://www.openstreetmap.org/export/embed.html?bbox=-122.1%2C37.2%2C-121.6%2C37.6&layer=mapnik";
  return (
    <div className={styles.container}>
      {event.themeEmoji && (
        <div>
          <FloatingEmojis
            emoji={event.themeEmoji}
            zIndex={0}
            count={5}
            speedScale={0.6}
          />
          <FloatingEmojis
            emoji={event.themeEmoji}
            zIndex={2}
            count={5}
            sizeScale={1.4}
            speedScale={1.4}
          />
        </div>
      )}
      <div className={styles.host}>
        <Avatar
          name={event.hostNames[0]}
          gradient={gradientFor(event.hostNames[0])}
        />
        <span className={styles.hostName}>{event.hostNames[0]}</span>
      </div>

      <h1 className={styles.title}>{event.title}</h1>

      <div className={styles.detail}>
        <span className={styles.detailIcon}>
          <CalendarIcon />
        </span>
        <div className={styles.detailText}>
          <span className={styles.detailPrimary}>
            {formatDateRange(event.startsAt, event.endsAt)}
          </span>
          <span className={styles.detailSecondary}>
            {formatTimeRange(event.startsAt, event.endsAt)}
          </span>
        </div>
      </div>

      <div className={styles.detail}>
        <span className={styles.detailIcon}>
          <LocationIcon />
        </span>
        <div className={styles.detailText}>
          <span className={styles.detailPrimary}>{event.location}</span>
          <Button variant="link" type="button" className={styles.addressLink}>
            {event.location}
          </Button>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        <iframe
          className={styles.map}
          src={mapSrc}
          title="Event location map"
          loading="lazy"
        />
      </div>

      <div className={styles.about}>
        <span className={styles.aboutLabel}>About</span>
        <p className={styles.aboutText}>{displayText}</p>
        {event.description && event.description.length > 120 && (
          <Button variant="link" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "See Less" : "See More"}
          </Button>
        )}
      </div>
    </div>
  );
}
