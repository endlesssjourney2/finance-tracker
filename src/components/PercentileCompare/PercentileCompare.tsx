import s from "./PercentileCompare.module.css";
import type { User } from "@supabase/supabase-js";
import type { Expense } from "../../types/Expense";
import { useEffect, useMemo, useState, type FC } from "react";
import Header from "../Header/Header";
import LoadingProgress from "../LoadingProgress/LoadingProgress";
import type { Verdict } from "../../types/Verdict";
import { pctChange } from "../../helpers/percentileTicks";
import ControlSelect from "../ControlSelect/ControlSelect";
import ResultPercentile from "../ResultPercentile/ResultPercentile";

type PercentileCompareProps = {
  expenses: Expense[];
  user: User | null;
  loading: boolean;
  getKey: (e: Expense) => string;
  formatKey: (k: string) => string;
  labelA: string;
  labelB: string;
};

const PercentileCompare: FC<PercentileCompareProps> = ({
  expenses,
  user,
  loading,
  getKey,
  formatKey,
  labelA,
  labelB,
}) => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const totalByKey = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of expenses) {
      const key = getKey(e);
      map.set(key, (map.get(key) ?? 0) + e.amount);
    }
    return map;
  }, [expenses, getKey]);

  const keys = useMemo(() => {
    return Array.from(totalByKey.keys()).sort();
  }, [totalByKey]);

  useEffect(() => {
    if (keys.length === 0) {
      if (a) setA("");
      if (b) setB("");
      return;
    }

    const hasA = a && keys.includes(a);
    const hasB = b && keys.includes(b);

    const nextA = hasA ? a : keys[0];
    const nextB = hasB ? b : (keys[1] ?? keys[0]);
    const fixedB = nextB === nextA ? (keys[1] ?? keys[0]) : nextB;

    if (nextA !== a) setA(nextA);
    if (fixedB !== b) setB(fixedB);
  }, [keys, a, b]);

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
        <Header title="Set values to see percentile comparison" />
        <div className={s.content}>
          <h2 className={s.noExpenses}>Please log in to view your stats.</h2>
        </div>
      </div>
    );
  }

  if (keys.length === 0) {
    return (
      <div className={s.percentile}>
        <Header title="No data available" />
        <div className={s.content}>
          <h2 className={s.noExpenses}>
            Please add some expenses to see percentile comparison.
          </h2>
        </div>
      </div>
    );
  }

  const spendA = totalByKey.get(a) ?? 0;
  const spendB = totalByKey.get(b) ?? 0;

  const diff = spendA - spendB;
  const pct = pctChange(spendA, spendB);
  const verdict: Verdict = diff > 0 ? "more" : diff < 0 ? "less" : "same";

  return (
    <div className={s.content}>
      <div className={s.inputs}>
        <ControlSelect
          label={labelA}
          value={a}
          disabledValue={b}
          onChange={setA}
          values={keys}
          formatValue={formatKey}
        />

        <ControlSelect
          label={labelB}
          value={b}
          disabledValue={a}
          onChange={setB}
          values={keys}
          formatValue={formatKey}
        />
      </div>
      <ResultPercentile
        valueA={formatKey(a)}
        valueB={formatKey(b)}
        diff={diff}
        pct={pct}
        verdict={verdict}
        spendA={spendA}
        spendB={spendB}
      />
    </div>
  );
};

export default PercentileCompare;
