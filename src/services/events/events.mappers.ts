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
