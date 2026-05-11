import { ShareIcon } from "../../../../components/ui/icons/ShareIcon";
import { cx } from "../../../../lib/cssUtils";
import styles from "./EventCoverActions.module.css";

const ACTIONS = [
  {
    label: "RSVP",
    icon: "🔥",
    className: styles.rsvpBtn,
  },
  {
    label: "Invite",
    icon: <ShareIcon />,
    className: styles.inviteBtn,
  },
];

export function EventCoverActions() {
  return (
    <div className={styles.container}>
      <div className={styles.coverImageBox}>
        <div className={styles.coverPlaceholder} />
      </div>

      <div className={styles.actions}>
        {ACTIONS.map((action) => (
          <div key={action.label} className={styles.actionItem}>
            <button
              type="button"
              className={cx(styles.actionBtn, action.className)}
              aria-label={action.label}
            >
              {action.icon}
            </button>

            <span className={styles.actionLabel}>{action.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
