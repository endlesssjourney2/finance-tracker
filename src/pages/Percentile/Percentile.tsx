import { useEffect, useMemo, useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import s from "./Percentile.module.css";
import { monthKey, pctChange } from "../../helpers/percentileTicks";
import ResultPercentile from "../../components/ResultPercentile/ResultPercentile";
import type { Verdict } from "../../types/Verdict";
import MonthSelect from "../../components/MonthSelect/MonthSelect";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import Header from "../../components/Header/Header";
import { useAuth } from "../Auth/AuthContext";

const Percentile = () => {
  const { user, loading: authLoading } = useAuth();
  const { expenses, loading: expensesLoading } = useExpenses(user);

  const loading = authLoading || expensesLoading;

  const [monthA, setMonthA] = useState<string>("");
  const [monthB, setMonthB] = useState<string>("");

  const totalByMonths = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of expenses) {
      const key = monthKey(e.date);
      map.set(key, (map.get(key) ?? 0) + e.amount);
    }
    return map;
  }, [expenses]);

  const months = useMemo(() => {
    return Array.from(totalByMonths.keys()).sort((a, b) => (a < b ? 1 : -1));
  }, [totalByMonths]);

  useEffect(() => {
    if (months.length === 0) {
      if (monthA) setMonthA("");
      if (monthB) setMonthB("");
      return;
    }

    const hasA = monthA && months.includes(monthA);
    const hasB = monthB && months.includes(monthB);

    const nextA = hasA ? monthA : months[0];
    const nextB = hasB ? monthB : (months[1] ?? months[0]);

    const fixedB = nextB === nextA ? (months[1] ?? months[0]) : nextB;

    if (nextA !== monthA) setMonthA(nextA);
    if (fixedB !== monthB) setMonthB(fixedB);
  }, [months, monthA, monthB]);

  if (loading) {
    return (
      <div className={s.percentile}>
        <div className={s.content}>
          <LoadingProgress loading={loading} />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={s.percentile}>
        <Header title="Here you can see (set) the percentile for a given month." />
        <div className={s.content}>
          <h2 className={s.noExpenses}>Please log in to view your stats.</h2>
        </div>
      </div>
    );
  }

  if (months.length === 0) {
    return (
      <div className={s.percentile}>
        <Header title="Here you can see (set) the percentile for a given month." />
        <div className={s.content}>
          <h2 className={s.noExpenses}>No expenses yet.</h2>
        </div>
      </div>
    );
  }

  const spendA = totalByMonths.get(monthA) ?? 0;
  const spendB = totalByMonths.get(monthB) ?? 0;

  const diff = spendA - spendB;
  const pct = pctChange(spendA, spendB);

  const verdict: Verdict = diff > 0 ? "more" : diff < 0 ? "less" : "same";

  return (
    <div className={s.percentile}>
      <Header title="Here you can see (set) the percentile for a given month." />
      <div className={s.content}>
        <div className={s.inputs}>
          <MonthSelect
            label="Month A"
            value={monthA}
            disabledMonth={monthB}
            onChange={setMonthA}
            months={months}
          />

          <MonthSelect
            label="Month B"
            value={monthB}
            disabledMonth={monthA}
            onChange={setMonthB}
            months={months}
          />
        </div>
        <>
          <ResultPercentile
            monthA={monthA}
            monthB={monthB}
            diff={diff}
            pct={pct}
            verdict={verdict}
            spendA={spendA}
            spendB={spendB}
          />
        </>
      </div>
    </div>
  );
};

export default Percentile;
