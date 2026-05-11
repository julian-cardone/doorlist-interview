import { useState } from "react";
import { Button } from "../../../../components/ui/Button/Button";
import styles from "./EventDetails.module.css";
import { LocationIcon } from "../../../../components/ui/icons/LocationIcon";
import { CalendarIcon } from "../../../../components/ui/icons/CalendarIcon";

const SAMPLE_EVENT = {
  hostName: "David Roselle",
  title: "My Birthday Party",
  dateRange: "Friday, July 22 - 23",
  timeRange: "9:40PM – 9:41",
  venueName: "Johns house",
  address: "123 Choule St, WA 12345",
  description:
    "Long Description for this party Long Description for this party Long Description for this party Long Description for this party Long Description for this party Long Description f",
  mapSrc:
    "https://www.openstreetmap.org/export/embed.html?bbox=-122.1%2C37.2%2C-121.6%2C37.6&layer=mapnik",
};

export function EventDetails() {
  const [expanded, setExpanded] = useState(false);
  const {
    hostName,
    title,
    dateRange,
    timeRange,
    venueName,
    address,
    description,
    mapSrc,
  } = SAMPLE_EVENT;

  const displayText =
    description.length > 120 && !expanded
      ? description.slice(0, 120) + "…"
      : description;

  return (
    <div className={styles.container}>
      <div className={styles.host}>
        <span className={styles.hostAvatar} />
        <span className={styles.onlineDot} />
        <span className={styles.hostName}>{hostName}</span>
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.detail}>
        <span className={styles.detailIcon}>
          <CalendarIcon />
        </span>
        <div className={styles.detailText}>
          <span className={styles.detailPrimary}>{dateRange}</span>
          <span className={styles.detailSecondary}>{timeRange}</span>
        </div>
      </div>

      <div className={styles.detail}>
        <span className={styles.detailIcon}>
          <LocationIcon />
        </span>
        <div className={styles.detailText}>
          <span className={styles.detailPrimary}>{venueName}</span>
          <a className={styles.addressLink} href="#">
            {address}
          </a>
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
        {description.length > 120 && (
          <Button variant="link" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "See Less" : "See More"}
          </Button>
        )}
      </div>
    </div>
  );
}
