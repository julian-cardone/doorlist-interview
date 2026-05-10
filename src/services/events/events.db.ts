export type EventInsertDbModel = {
  title: string;
  starts_at: string;
  ends_at?: string | null;
  location?: string | null;
  description?: string | null;
  theme_emoji?: string | null;
  cover_image_url?: string | null;
};

export type EventDbModel = EventInsertDbModel & {
  id: string;
  created_at: string;
};

export type EventHostInsertDbModel = {
  event_id: string;
  host_name: string;
};

export type EventHostDbModel = EventHostInsertDbModel & {
  id: string;
  created_at: string;
};
