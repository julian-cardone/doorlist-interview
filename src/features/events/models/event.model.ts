import { z } from "zod";

export const EventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  hostNames: z.array(z.string().min(1)).min(1, "At least one host is required"),
  startAt: z.string().min(1, "Start time is required"),
  endAt: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  reaction: z.string().optional(),
});

export type EventFormModel = z.infer<typeof EventFormSchema>;
