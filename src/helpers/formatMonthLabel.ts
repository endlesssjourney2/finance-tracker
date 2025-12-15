export const formatMonthLabel = (yyyyMM: string, locale = "en-US") => {
  const [y, m] = yyyyMM.split("-").map(Number);
  (!y || !m) && yyyyMM;
  const d = new Date(y, m - 1, 1);
  const month = d.toLocaleString(locale, { month: "short" });
  const year = d.toLocaleString(locale, { year: "2-digit" });

  return `${month}, ${year}`;
};
