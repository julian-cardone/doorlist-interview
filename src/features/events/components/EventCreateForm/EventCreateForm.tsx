import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/Input/Input";
import { Button } from "../../../../components/ui/Button/Button";
import { EventDateRow } from "../EventDateRow/EventDateRow";
import { EventFormSchema, type EventFormData } from "../../models/event";
import { isRequiredField } from "../../../../lib/form";
import styles from "./EventCreateForm.module.css";

const REACTION_EMOJIS = ["", "❤️", "🎉", "🔥", "✨", "✔️", "👀", "💀", "😁"];

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
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<EventFormData>({
    resolver: zodResolver(EventFormSchema),
    mode: "onChange",
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.rows}>
        <div className={styles.row}>
          <Input
            id="event-title"
            variant="title"
            required={isRequiredField(EventFormSchema, "title")}
            placeholder="Event Title"
            {...register("title")}
          />
          {errors.title && (
            <span className={styles.fieldError}>{errors.title.message}</span>
          )}
        </div>
        {/* <div className={styles.rowDivider} /> */}

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
        <div className={styles.row}>
          <EventDateRow
            startAt={watch("startAt") ?? ""}
            onStartAtChange={(v) =>
              setValue("startAt", v, { shouldValidate: true })
            }
            endAt={watch("endAt")}
            onEndAtChange={(v) =>
              setValue("endAt", v, { shouldValidate: true })
            }
          />
        </div>
        <div className={styles.row}>
          <Input
            variant="pill"
            textPrefix={<LocationIcon />}
            placeholder="Location"
            aria-label="Location"
            {...register("location")}
          />
        </div>
        <div className={styles.row}>
          <Input
            variant="pill"
            textPrefix={<NotesIcon />}
            placeholder="Description"
            aria-label="Description"
            {...register("description")}
          />
        </div>
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
      <Button variant="primary" type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Creating…" : "Create Event"}
      </Button>
    </form>
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
