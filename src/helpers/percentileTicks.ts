import dayjs from "dayjs";

export const monthKey = (date: string) => {
  return dayjs(date).startOf("month").format("YYYY-MM-01");
};

export const monthLabel = (month: string) => {
  return dayjs(month).format("MMMM YYYY");
};

export const pctChange = (a: number, b: number) => {
  if (b === 0) return null;
  return ((a - b) / b) * 100;
};
