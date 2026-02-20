import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { Expense } from "../types/Expense";
import type { User } from "@supabase/supabase-js";

export const useExpenses = (user: User | null) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchExpenses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error during loading:", error.message);
      } else {
        setExpenses(data as Expense[]);
      }
      setLoading(false);
    };
    void fetchExpenses();
  }, [user]);

  const deleteExpense = async (id: string) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) {
      console.error("Error deleting expense:", error.message);
      return;
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };
  return { expenses, loading, setExpenses, deleteExpense };
};
