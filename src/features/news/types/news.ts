export type NewsApiItem = {
  id: number;
  date?: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    category?: string;
    start_at?: string;
    end_at?: string;
  };
};

export type FetchNewsResult = {
  items: NewsApiItem[];
  totalPages: number;
  totalItems: number;
};
