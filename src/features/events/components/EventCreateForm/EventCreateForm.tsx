import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/Input/Input";
import { Button } from "../../../../components/ui/Button/Button";
import { EventDateRow } from "../EventDateRow/EventDateRow";
import { isRequiredField } from "../../../../lib/form";
import { FloatingEmojis } from "../FloatingEmojis/FloatingEmojis";
import { EventHostRow } from "../EventHostRow/EventHostRow";
import styles from "./EventCreateForm.module.css";
import { EventFormSchema, type EventFormModel } from "../../models/event.model";
import { useHorizontalWheelScroll } from "../../../../hooks/useHorizontalWheelScroll";

const REACTION_EMOJIS = ["", "❤️", "🎉", "🔥", "✨", "✔️", "👀", "💀", "😁"];

type EventCreateFormProps = {
  onSubmit: (data: EventFormModel) => void;
  isSubmitting?: boolean;
  coverImageUrl?: string;
};

export function EventCreateForm({
  onSubmit,
  isSubmitting,
  coverImageUrl,
}: EventCreateFormProps) {
  const [hosts, setHosts] = useState<string[]>([]);
  const horizontalScroll = useHorizontalWheelScroll<HTMLDivElement>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<EventFormModel>({
    resolver: zodResolver(EventFormSchema),
    mode: "onChange",
    defaultValues: { hostNames: [] },
  });

  function handleAddHost(name: string) {
    const updated = [...hosts, name];
    setHosts(updated);
    setValue("hostNames", updated, { shouldValidate: true });
  }

  function handleRemoveHost(index: number) {
    const updated = hosts.filter((_, idx) => idx !== index);
    setHosts(updated);
    setValue("hostNames", updated, { shouldValidate: true });
  }

  useEffect(() => {
    setValue("coverImageUrl", coverImageUrl, { shouldValidate: false });
  }, [coverImageUrl, setValue]);

  useEffect(() => {
    // temporary set start and end dates for testing
    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
    setValue("startAt", now.toISOString().slice(0, 16), {
      shouldValidate: true,
    });
    setValue("endAt", inOneHour.toISOString().slice(0, 16), {
      shouldValidate: true,
    });
  }, [setValue]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FloatingEmojis
        emoji={watch("reaction") ?? ""}
        zIndex={0}
        count={5}
        speedScale={0.6}
      />
      <FloatingEmojis
        emoji={watch("reaction") ?? ""}
        zIndex={2}
        count={5}
        sizeScale={1.4}
        speedScale={1.4}
      />
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

        <div className={styles.row}>
          <EventHostRow
            hosts={hosts}
            onAdd={handleAddHost}
            onRemove={handleRemoveHost}
          />
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
      </div>

      <div className={styles.bottomBar}>
        <div
          className={`${styles.reactions} scrollX`}
          ref={horizontalScroll.ref}
          onWheel={horizontalScroll.onWheel}
        >
          {REACTION_EMOJIS.map((emoji) => {
            const selected = emoji !== "" && watch("reaction") === emoji;
            return (
              <button
                key={emoji || "none"}
                type="button"
                className={`${styles.reactionBtn}${selected ? ` ${styles.reactionBtnSelected}` : ""}`}
                aria-label={emoji || "No reaction"}
                aria-pressed={selected}
                onClick={() => setValue("reaction", selected ? "" : emoji)}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>
      <Button
        variant="primary"
        type="submit"
        disabled={!isValid || isSubmitting}
      >
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
