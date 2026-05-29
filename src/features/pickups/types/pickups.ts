export type PickupApiItem = {
  id: number;
  date?: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    pickup_period?: string;
    subtitle?: string;
    publish_start_at?: string;
    publish_end_at?: string;
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

