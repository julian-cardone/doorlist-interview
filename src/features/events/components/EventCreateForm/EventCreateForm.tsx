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
import { NotesIcon } from "../../../../components/ui/icons/NotesIcon";
import { cx } from "../../../../lib/cssUtils";
import { REACTION_EMOJIS } from "../../../../lib/sampleData";
import type { EventCreateFormProps } from "./EventCreateFormProps";
import { LocationIcon } from "../../../../components/ui/icons/LocationIcon";

export function EventCreateForm({
  onSubmit,
  isSubmitting,
  coverImageUrl,
}: EventCreateFormProps) {
  const [hosts, setHosts] = useState<string[]>([]);
  const { ref: horizontalScrollRef, onWheel: handleHorizontalWheel } =
    useHorizontalWheelScroll<HTMLDivElement>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
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
            className={styles.title}
            {...register("title")}
          />
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
          className={cx(styles.reactions, "scrollX")}
          ref={horizontalScrollRef}
          onWheel={handleHorizontalWheel}
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
        className={styles.submitBtn}
      >
        {isSubmitting ? "Creating…" : "Create Event"}
      </Button>
    </form>
  );
}
