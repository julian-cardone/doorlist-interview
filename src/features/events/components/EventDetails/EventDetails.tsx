import { useState } from "react";
import { Button } from "../../../../components/ui/Button/Button";
import styles from "./EventDetails.module.css";

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
  const { hostName, title, dateRange, timeRange, venueName, address, description, mapSrc } =
    SAMPLE_EVENT;

  const displayText =
    description.length > 120 && !expanded ? description.slice(0, 120) + "…" : description;

  return (
    <div className={styles.container}>
      <div className={styles.host}>
        <span className={styles.hostAvatar} />
        <span className={styles.onlineDot} />
        <span className={styles.hostName}>{hostName}</span>
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.detail}>
        <span className={styles.detailIcon}><CalendarIcon /></span>
        <div className={styles.detailText}>
          <span className={styles.detailPrimary}>{dateRange}</span>
          <span className={styles.detailSecondary}>{timeRange}</span>
        </div>
      </div>

      <div className={styles.detail}>
        <span className={styles.detailIcon}><LocationIcon /></span>
        <div className={styles.detailText}>
          <span className={styles.detailPrimary}>{venueName}</span>
          <a className={styles.addressLink} href="#">{address}</a>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        <iframe className={styles.map} src={mapSrc} title="Event location map" loading="lazy" />
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

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
