import type { EventFormModel } from "../../models/event.model";

export type EventCreateFormProps = {
  onSubmit: (data: EventFormModel) => void;
  isSubmitting?: boolean;
  coverImageUrl?: string;
};
