import dayjs from "dayjs";
import type { ExpenseLike } from "../types/Expense";

export const monthKey = (date: string) => {
  return dayjs(date).startOf("month").format("YYYY-MM-01");
};

export const monthLabel = (month: string) => {
  return dayjs(month).format("MMMM YYYY");
};

export const sumForMonth = (expenses: ExpenseLike[], month: string) => {
  const start = dayjs(month).startOf("month");
  const end = start.add(1, "month");

  const startMs = start.valueOf();
  const endMs = end.valueOf();

  return expenses.reduce((sum, e) => {
    const dMs = dayjs(e.date).valueOf();
    if (dMs >= startMs && dMs < endMs) return sum + e.amount;
    return sum;
  }, 0);
};

export const pctChange = (a: number, b: number) => {
  if (b === 0) return null;
  return ((a - b) / b) * 100;
};
