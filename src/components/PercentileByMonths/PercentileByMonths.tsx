import { type FC } from "react";
import { monthKey } from "../../helpers/percentileTicks";
import type { User } from "@supabase/supabase-js";
import type { Expense } from "../../types/Expense";
import PercentileCompare from "../PercentileCompare/PercentileCompare";
import { monthLabel } from "../../helpers/monthLabel";

type PercentileByMonthsProps = {
  expenses: Expense[];
  loading: boolean;
  user: User | null;
};

const PercentileByMonths: FC<PercentileByMonthsProps> = ({
  expenses,
  loading,
  user,
}) => {
  return (
    <PercentileCompare
      expenses={expenses}
      loading={loading}
      user={user}
      getKey={(e) => monthKey(e.date)}
      formatKey={(k) => monthLabel(k, "MMMM YYYY")}
      labelA="Month A"
      labelB="Month B"
    />
  );
};

export default PercentileByMonths;
