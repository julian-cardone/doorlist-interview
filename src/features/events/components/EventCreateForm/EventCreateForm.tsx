import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/Input/Input";
import { Button } from "../../../../components/ui/Button/Button";
import { EventFormSchema, type EventFormData } from "../../models/event";
import styles from "./EventCreateForm.module.css";

const REACTION_EMOJIS = ["❤️", "🎉", "🔥", "✨", "✔️", "👀", "💀", "😁"];

type EventCreateFormProps = {
  onSubmit: (data: EventFormData) => void;
  isSubmitting?: boolean;
};

export function EventCreateForm({
  onSubmit,
  isSubmitting,
}: EventCreateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({ resolver: zodResolver(EventFormSchema) });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.rows}>
        <div className={styles.row}>
          <Input
            variant="title"
            placeholder="Event Title"
            aria-label="Event title"
            {...register("title")}
          />
          {errors.title && (
            <span className={styles.fieldError}>{errors.title.message}</span>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.hostRow}>
            <div className={styles.avatarStack}>
              <span className={styles.avatar} />
              <span className={styles.avatar} />
              <span className={styles.avatar} />
            </div>
            <Button variant="ghost">Add host</Button>
          </div>
        </div>
        <div className={styles.rowDivider} />
        <div className={styles.row}>
          <span className={styles.rowIcon}>
            <CalendarIcon />
          </span>
          <div className={styles.dateRow}>
            <span className={styles.dateText}>Tue, Jul 22 8:00PM</span>
            <Button variant="link">Add End Time</Button>
          </div>
        </div>
        <Input
          variant="pill"
          prefix={<LocationIcon />}
          placeholder="Location"
          aria-label="Location"
          className={styles.pillField}
          {...register("location")}
        />
        <Input
          variant="pill"
          prefix={<NotesIcon />}
          placeholder="Description"
          aria-label="Description"
          className={styles.pillField}
          {...register("description")}
        />
        <div className={styles.row}>
          <span className={styles.rowIcon}>
            <PhotoIcon />
          </span>
          <Button variant="ghost">ADD PHOTOS</Button>
        </div>
        <div className={styles.rowDivider} />
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.reactions}>
          {REACTION_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className={styles.reactionBtn}
              aria-label={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating…" : "Create Event"}
      </Button>
    </form>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="17" y1="10" x2="3" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="17" y1="18" x2="3" y2="18" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
