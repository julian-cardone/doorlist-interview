import { useEffect, useRef, useState } from "react";
import { cx } from "../../../../lib/cssUtils";
import type { EventViewModel } from "../../models/event.model";
import styles from "./EventCoverActions.module.css";
import { Button } from "../../../../components/ui/Button/Button";
import { useNavigate } from "react-router";

type EventCoverActionsProps = {
  event: EventViewModel;
};

type RsvpStatus = "Going" | "Maybe" | "Can't Go";
type RsvpOption = { status: RsvpStatus; emoji: string };

const RSVP_OPTIONS: RsvpOption[] = [
  { status: "Going", emoji: "🔥" },
  { status: "Maybe", emoji: "🤔" },
  { status: "Can't Go", emoji: "😢" },
];

const coverImage = "/cover-default.png";

export function EventCoverActions({ event }: EventCoverActionsProps) {
  const [rsvpStatus, setRsvpStatus] = useState<RsvpOption | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pickerOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        pickerWrapperRef.current &&
        !pickerWrapperRef.current.contains(e.target as Node)
      )
        setPickerOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pickerOpen]);

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url);
    alert("Event URL copied to clipboard");
  };

  async function handleInvite() {
    const url = `${window.location.origin}/events/${event.id}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ url, title: event.title });
      } catch {
        // Sharing failed (e.g. user cancelled); fallback to clipboards
        await copyToClipboard(url);
      }
    } else {
      await copyToClipboard(url);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.coverImageBox}>
        <div
          className={styles.coverPlaceholder}
          style={{
            backgroundImage: `url(${event.coverImageUrl || coverImage})`,
          }}
        />
      </div>

      <div className={styles.actions}>
        {/* RSVP */}
        <div className={styles.actionItem} ref={pickerWrapperRef}>
          {pickerOpen && (
            <div className={styles.rsvpPicker} role="listbox">
              {RSVP_OPTIONS.map((opt) => (
                <button
                  key={opt.status}
                  type="button"
                  role="option"
                  aria-selected={rsvpStatus?.status === opt.status}
                  className={cx(
                    styles.rsvpOption,
                    rsvpStatus?.status === opt.status &&
                      styles.rsvpOptionSelected,
                  )}
                  onClick={() => {
                    setRsvpStatus(opt);
                    setPickerOpen(false);
                  }}
                >
                  <span className={styles.rsvpOptionEmoji}>{opt.emoji}</span>
                  <span className={styles.rsvpOptionLabel}>{opt.status}</span>
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            className={cx(styles.actionBtn, styles.rsvpBtn)}
            aria-label="RSVP"
            aria-expanded={pickerOpen}
            aria-haspopup="listbox"
            onClick={() => setPickerOpen((p) => !p)}
          >
            {rsvpStatus?.emoji ?? "🔥"}
          </button>
          <span className={styles.actionLabel}>
            {rsvpStatus?.status ?? "RSVP"}
          </span>
        </div>

        {/* Invite */}
        <div className={styles.actionItem}>
          <button
            type="button"
            className={cx(styles.actionBtn, styles.inviteBtn)}
            aria-label="Invite"
            onClick={handleInvite}
          >
            <img src="/icons/invite.svg" alt="" />
          </button>
          <span className={styles.actionLabel}>Invite</span>
        </div>
      </div>
      <Button variant="link" onClick={() => navigate(`/events/create`)}>
        Create an event
      </Button>
    </div>
  );
}
