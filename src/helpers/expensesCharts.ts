import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export type ExpenseMonth = {
  amount: number;
  date: string;
  category: string;
};

export type ExpenseTotal = {
  amount: number;
  date: string;
};

const getMonthKey = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 7);
};

export const buildCategoryPieForLastMonth = (expenses: ExpenseMonth[]) => {
  if (!expenses.length)
    return { pieLabels: [] as string[], pieValues: [] as number[] };

  const now = new Date();

  const valid = expenses.filter((e) => new Date(e.date) <= now);

  const source = valid.length ? valid : expenses;

  const latest = source.reduce((a, b) =>
    new Date(a.date) > new Date(b.date) ? a : b
  );

  const lastMonth = getMonthKey(latest.date);

  const categoryMap = new Map<string, number>();
  for (const e of expenses) {
    if (getMonthKey(e.date) !== lastMonth) continue;

    const category = capitalizeFirstLetter(e.category);

    categoryMap.set(category, (categoryMap.get(category) ?? 0) + e.amount);
  }

  return {
    pieLabels: Array.from(categoryMap.keys()),
    pieValues: Array.from(categoryMap.values()),
  };
};

export const buildMonthlyTotals = (expenses: ExpenseTotal[]) => {
  if (!expenses.length) {
    return { monthLabels: [] as string[], monthValues: [] as number[] };
  }

  const monthMap = new Map<string, number>();

  for (const e of expenses) {
    const key = getMonthKey(e.date);
    monthMap.set(key, (monthMap.get(key) ?? 0) + e.amount);
  }

  const monthLabels = Array.from(monthMap.keys()).sort();
  const monthValues = monthLabels.map((m) => monthMap.get(m) ?? 0);

  return { monthLabels, monthValues };
};
