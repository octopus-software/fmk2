export type EventApiItem = {
  id: number;
  date?: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    publish_start_at?: string;
    publish_end_at?: string;
    category?: string;
    event_date?: string;
    event_time?: string;
    event_start_at?: string;
    event_end_at?: string;
    event_start_time?: string;
    event_end_time?: string;
    place?: string;
    capacity?: string;
    price?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: Record<string, { source_url?: string }>;
      };
    }>;
  };
};
