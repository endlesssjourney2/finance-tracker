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

  return { expenses, loading, setExpenses };
};
