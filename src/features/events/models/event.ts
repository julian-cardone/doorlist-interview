import { z } from "zod";

export const EventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  //   startAt: z.string().min(1, "Start time is required"),
  startAt: z.string().optional(),
  endAt: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

export type EventFormData = z.infer<typeof EventFormSchema>;
