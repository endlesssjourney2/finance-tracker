import dayjs from "dayjs";

export const monthKey = (date: string) => {
  return dayjs(date).startOf("month").format("YYYY-MM-01");
};

export const pctChange = (a: number, b: number) => {
  if (b === 0) return null;
  return ((a - b) / b) * 100;
};
