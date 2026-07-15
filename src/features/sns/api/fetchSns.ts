import axios from "axios";
import { SNS_API_URL } from "../constants/sns";
import type { SnsApiItem } from "../types/sns";

export const fetchSns = async (): Promise<SnsApiItem[]> => {
  const response = await axios.get(SNS_API_URL, {
    params: { per_page: 3, order: "desc" },
  });

  return Array.isArray(response.data) ? (response.data as SnsApiItem[]) : [];
};
