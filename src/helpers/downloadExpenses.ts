import type { Expense } from "../types/Expense";

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const toCsv = (expenses: Expense[]) => {
  const headers: (keyof Expense)[] = [
    "id",
    "date",
    "amount",
    "category",
    "description",
    "user_id",
  ];

  const safeCsv = (value: unknown) => {
    const str = String(value ?? "");
    const needsQuotes = /[",\n\r]/.test(str);
    const escaped = str.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };

  const csv = [
    headers.join(","),
    ...expenses.map((expense) => {
      return headers.map((e) => safeCsv(expense[e])).join(",");
    }),
  ];
  return csv.join("\n");
};
