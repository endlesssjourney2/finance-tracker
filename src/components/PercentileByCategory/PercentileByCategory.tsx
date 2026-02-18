import type { User } from "@supabase/supabase-js";
import type { Expense } from "../../types/Expense";
import { type FC } from "react";
import PercentileCompare from "../PercentileCompare/PercentileCompare";

type PercentileByCategoryProps = {
  expenses: Expense[];
  loading: boolean;
  user: User | null;
};

const PercentileByCategory: FC<PercentileByCategoryProps> = ({
  expenses,
  loading,
  user,
}) => {
  return (
    <PercentileCompare
      expenses={expenses}
      loading={loading}
      user={user}
      getKey={(e) => e.category}
      formatKey={(k) => k}
      labelA="Category A"
      labelB="Category B"
    />
  );
};

export default PercentileByCategory;
