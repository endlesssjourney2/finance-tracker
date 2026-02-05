import { useEffect, useMemo, useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import s from "./Percentile.module.css";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { inputSx } from "../../InputStyles";
import dayjs from "dayjs";
import type { ExpenseLike } from "../../types/Expense";
import {
  monthKey,
  monthLabel,
  pctChange,
  sumForMonth,
} from "../../helpers/percentileTicks";

const Percentile = () => {
  const [user, setUser] = useState<User | null>(null);

  const { expenses } = useExpenses(user);

  const [monthA, setMonthA] = useState<string>("");
  const [monthB, setMonthB] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      setUser(user);
    };
    void init();
  }, []);

  const months = useMemo(() => {
    const unique = new Set<string>();
    for (const e of expenses) unique.add(monthKey(e.date));
    return Array.from(unique).sort((a, b) => (a < b ? 1 : -1));
  }, [expenses]);

  useEffect(() => {
    if (months.length === 0) return;

    if (!monthA) setMonthA(months[0]);
    if (!monthB) setMonthB(months[1] ?? months[0]);
  }, [months, monthA, monthB]);

  const spendA = useMemo(() => {
    return monthA ? sumForMonth(expenses, monthA) : 0;
  }, [expenses, monthA]);

  const spendB = useMemo(() => {
    return monthB ? sumForMonth(expenses, monthB) : 0;
  }, [expenses, monthB]);

  const diff = useMemo(() => {
    return spendA - spendB;
  }, [spendA, spendB]);

  const pct = useMemo(() => {
    return pctChange(spendA, spendB);
  }, [spendA, spendB]);

  const verdict = useMemo(() => {
    if (!monthA || !monthB) return null;
    if (diff > 0) return "more";
    if (diff < 0) return "less";
    return "same";
  }, [diff, monthA, monthB]);

  return (
    <div className={s.percentile}>
      <header className={s.header}>
        <h2 className={s.headerTitle}>
          Here you can see (set) the percentile for a given month.
        </h2>
      </header>
      <div className={s.content}>
        <div className={s.inputs}>
          <FormControl fullWidth sx={inputSx}>
            <InputLabel>Month A</InputLabel>
            <Select
              label="Month A"
              value={monthA}
              onChange={(e) => setMonthA(e.target.value)}
            >
              {months.map((m) => (
                <MenuItem key={m} value={m} disabled={m === monthB}>
                  {monthLabel(m)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={inputSx}>
            <InputLabel>Month B</InputLabel>
            <Select
              label="Month B"
              value={monthB}
              onChange={(e) => setMonthB(e.target.value)}
            >
              {months.map((m) => (
                <MenuItem key={m} value={m} disabled={m === monthA}>
                  {monthLabel(m)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {months.length === 0 ? (
          <h2 className={s.noExpenses}>No expenses yet.</h2>
        ) : (
          <div className={s.result}>
            <h2
              className={s.monthLabel}
            >{`${monthLabel(monthA)} : ${spendA.toFixed(2)} $`}</h2>
            <h2
              className={s.monthLabel}
            >{`${monthLabel(monthB)} : ${spendB.toFixed(2)} $`}</h2>
            <h2 className={s.diff}>{`Difference: ${diff.toFixed(2)} $`}</h2>
            <h2 className={s.change}>{`Change: ${pct?.toFixed(2)} %`}</h2>
            {verdict && pct !== null && (
              <h2 className={s.verdict}>
                in {monthLabel(monthA)} you spent {verdict} by{" "}
                {Math.abs(pct).toFixed(2)} % than in {monthLabel(monthB)}
              </h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Percentile;
