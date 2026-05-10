import {
  mapEventFormToEventInsert,
  mapHostNamesToHostInserts,
} from "./events.mappers";
import type { EventFormModel } from "../../features/events/models/event.model";
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
