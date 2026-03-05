import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { Expense } from "../types/Expense";
import type { User } from "@supabase/supabase-js";
import { downloadBlob, toCsv } from "../helpers/downloadExpenses";
import { abbreviatedDate } from "../helpers/abbreviatedDate";
import Papa from "papaparse";

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
    if (!user) return;
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) {
      console.error("Error deleting expense:", error.message);
      return;
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExpense = async (
    id: string,
    updated: Omit<Expense, "id" | "user_id">,
  ) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("expenses")
      .update(updated)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating expense", error.message);
      return;
    }
    setExpenses((prev) => {
      return prev.map((e) => (e.id === id ? (data as Expense) : e));
    });
  };

  const exportExpensesJSON = () => {
    if (!user) return;
    const payload = {
      exportedAt: abbreviatedDate(),
      expenses,
      userId: user.id,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    downloadBlob(blob, `expenses-${abbreviatedDate()}.json`);
  };

  const exportExpensesCsv = () => {
    if (!user) return;
    const csv = toCsv(expenses);
    const blob = new Blob([csv], { type: "text/csv" });
    downloadBlob(blob, `expenses-${abbreviatedDate()}.csv`);
  };

  const importExpensesCsv = async (file: File) => {
    if (!user) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const parsed = (results.data as Record<string, string>[]).map(
          (row) => ({
            user_id: user.id,
            amount: Number(row.amount),
            category: row.category,
            description: row.description || "",
            date: row.date,
          }),
        );
        const { data, error } = await supabase
          .from("expenses")
          .update(parsed)
          .select();

        if (error) {
          console.error("Error importing expenses", error.message);
          return;
        }

        setExpenses((prev) => [...(data as Expense[]), ...prev]);
      },
    });
  };

  const importExpensesJSON = async (file: File) => {
    if (!user) return;

    const text = await file.text();
    const json = JSON.parse(text);

    const parsed = (json.expenses as Expense[]).map((row) => ({
      user_id: user.id,
      amount: row.amount,
      category: row.category,
      description: row.description,
      date: row.date,
    }));

    const { data, error } = await supabase
      .from("expenses")
      .update(parsed)
      .select();

    if (error) {
      console.error("Error importing expenses", error.message);
      return;
    }
    setExpenses((prev) => [...(data as Expense[]), ...prev]);
  };

  return {
    expenses,
    loading,
    setExpenses,
    deleteExpense,
    exportExpensesJSON,
    exportExpensesCsv,
    updateExpense,
    importExpensesCsv,
    importExpensesJSON,
  };
};
