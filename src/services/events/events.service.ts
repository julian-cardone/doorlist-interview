import type { EventFormData } from "../../features/events/models/event";

export async function createEvent(data: EventFormData): Promise<void> {
  // TODO: replace with Supabase insert
  console.log("createEvent", data);
}
