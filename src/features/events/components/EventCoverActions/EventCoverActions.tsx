import styles from "./EventCoverActions.module.css";

export function EventCoverActions() {
  return (
    <div className={styles.container}>
      <div className={styles.coverImageBox}>
        <div className={styles.coverPlaceholder} />
      </div>
      <div className={styles.actions}>
        <div className={styles.actionItem}>
          <button className={styles.rsvpBtn} aria-label="RSVP">
            🔥
          </button>
          <span className={styles.actionLabel}>RSVP</span>
        </div>
        <div className={styles.actionItem}>
          <button className={styles.inviteBtn} aria-label="Invite">
            <ShareIcon />
          </button>
          <span className={styles.actionLabel}>Invite</span>
        </div>
      </div>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}
