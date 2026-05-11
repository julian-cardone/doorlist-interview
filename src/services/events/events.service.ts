import {
  mapEventFormToEventInsert,
  mapHostNamesToHostInserts,
  mapEventWithHostsDbToView,
} from "./events.mappers";
import type {
  EventFormModel,
  EventViewModel,
} from "../../features/events/models/event.model";
import { supabase } from "../../lib/supabase";

export async function createEvent(form: EventFormModel) {
  // create event
  const eventInsert = mapEventFormToEventInsert(form);

  const { data: event, error: eventError } = await supabase
    .from("events")
    .insert(eventInsert)
    .select()
    .single();

  if (eventError) {
    throw eventError;
  }

  // create hosts
  const hostInserts = mapHostNamesToHostInserts(event.id, form.hostNames);

  const { error: hostError } = await supabase
    .from("event_hosts")
    .insert(hostInserts);

  if (hostError) {
    throw hostError;
  }

  return event;
}

export async function getEventById(id: string): Promise<EventViewModel> {
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      id,
      title,
      starts_at,
      ends_at,
      location,
      description,
      theme_emoji,
      cover_image_url,
      event_hosts (
        host_name
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return mapEventWithHostsDbToView(data);
}
