import { supabase } from "../supabaseClient";
import type { Expense } from "../types/Expense";

export const getExpenses = async (userId: string) => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error during loading:", error.message);
    return [null, error];
  } else {
    return [data, null];
  }
};

export const addExpenseApi = async (
  user_id: string,
  category: string,
  amount: number,
  description: string | null,
  date: string,
) => {
  const { data, error } = await supabase
    .from("expenses")
    .insert([
      {
        user_id: user_id,
        amount: amount,
        category: category,
        description: description,
        date: date,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error during adding expense:", error.message);
    return [null, error];
  }
  return [data, null];
};

export const deleteExpenseApi = async (id: string) => {
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    console.error("Error deleting expense:", error.message);
    return error;
  }
  return null;
};

export const updateExpenseApi = async (
  id: string,
  updated: Omit<Expense, "id" | "user_id">,
) => {
  const { data, error } = await supabase
    .from("expenses")
    .update(updated)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating expense", error.message);
    return [null, error];
  }
  return [data, null];
};

export const importExpensesApi = async (
  parsed: {
    user_id: string;
    category: string;
    amount: number;
    description: string;
    date: string;
  }[],
) => {
  const { data, error } = await supabase
    .from("expenses")
    .insert(parsed)
    .select();
  if (error) {
    console.error("Error during importing expenses:", error.message);
    return [null, error];
  }
  return [data, null];
};
