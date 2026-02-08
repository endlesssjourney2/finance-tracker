import dayjs from "dayjs";
import type { dateFormat } from "../types/dateFormat";

export const monthLabel = (month: string, format: dateFormat = "MMM YY") => {
  return dayjs(month).format(format);
};
