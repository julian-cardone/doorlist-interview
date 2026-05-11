import type { EventFormModel } from "../../features/events/models/event.model";
import type { EventHostInsertDbModel, EventInsertDbModel } from "./events.db";

function emptyToNull(value?: string) {
  return value?.trim() ? value.trim() : null;
}

export function mapEventFormToEventInsert(
  form: EventFormModel,
): EventInsertDbModel {
  return {
    title: form.title.trim(),
    starts_at: new Date(form.startAt).toISOString(),
    ends_at: form.endAt ? new Date(form.endAt).toISOString() : null,
    location: emptyToNull(form.location),
    description: emptyToNull(form.description),
    theme_emoji: emptyToNull(form.reaction),
    cover_image_url: emptyToNull(form.coverImageUrl),
  };
}

export function mapHostNamesToHostInserts(
  eventId: string,
  hostNames: string[],
): EventHostInsertDbModel[] {
  return hostNames.map((hostName) => ({
    event_id: eventId,
    host_name: hostName.trim(),
  }));
}

type EventWithHostsDbModel = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  description: string | null;
  theme_emoji: string | null;
  cover_image_url: string | null;
  event_hosts: {
    host_name: string;
  }[];
};

export function mapEventWithHostsDbToView(
  db: EventWithHostsDbModel,
): import("../../features/events/models/event.model").EventViewModel {
  return {
    id: db.id,
    title: db.title,
    startsAt: new Date(db.starts_at),
    endsAt: db.ends_at ? new Date(db.ends_at) : undefined,
    location: db.location || undefined,
    description: db.description || undefined,
    themeEmoji: db.theme_emoji || undefined,
    coverImageUrl: db.cover_image_url || undefined,
    hostNames: db.event_hosts.map((h) => h.host_name),
  };
}
