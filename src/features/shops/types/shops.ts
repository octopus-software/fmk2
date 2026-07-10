type WpMedia = {
  source_url?: string;
  media_details?: {
    sizes?: {
      full?: { source_url?: string };
      large?: { source_url?: string };
      medium?: { source_url?: string };
    };
  };
};

export type ShopApiItem = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    name?: string;
    category?: string;
    floor?: string;
    description?: string;
    open_hours?: string;
    tel?: string;
    website_url?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
  };
};

export type ShopItem = {
  id: number;
  name: string;
  category: string;
  floor: string;
  description: string;
  image: string;
  hours?: string;
  phone?: string;
  website?: string;
  fullDescription?: string;
};
