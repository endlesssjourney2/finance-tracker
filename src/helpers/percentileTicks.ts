import dayjs from "dayjs";

export const monthKey = (date: string) => {
  return dayjs(date).startOf("month").format("YYYY-MM-01");
};

export const pctChange = (a: number, b: number) => {
  const base = Math.min(a, b);
  if (base === 0) return null;

  return (Math.abs(a - b) / base) * 100;
};
