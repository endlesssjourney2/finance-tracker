import { useMemo } from "react";
import { useAuth } from "../pages/Auth/AuthContext";
import { useExpenses } from "./useExpenses";
import useGoals from "./useGoals";

const useExpensesWithGoals = () => {
  const { user, loading: authLoading } = useAuth();
  const { expenses, ...rest } = useExpenses(user);
  const { goals } = useGoals(user);

  const expensesWithGoals = useMemo(() => {
    return expenses.map((expense) => ({
      ...expense,
      hasGoal: goals.some(
        (goal) =>
          goal.user_id === expense.user_id &&
          goal.category === expense.category,
      ),
    }));
  }, [expenses, goals]);

  const totalAmount = useMemo(() => {
    return expensesWithGoals.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const spentByCategory = useMemo(() => {
    return expensesWithGoals.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount;
      return acc;
    }, {});
  }, [expensesWithGoals]);

  return {
    expensesWithGoals,
    spentByCategory,
    totalAmount,
    authLoading,
    user,
    ...rest,
  };
};

export default useExpensesWithGoals;
