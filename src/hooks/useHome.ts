import type { User } from "@supabase/supabase-js";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { Touched } from "../types/Touched";
import { supabase } from "../supabaseClient";
import type { Expense } from "../types/Expense";

export const useHome = (
  user: User | null,
  setExpenses: Dispatch<SetStateAction<Expense[]>>,
) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [touched, setTouched] = useState<Touched>({
    amount: false,
    category: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const addExpense = async () => {
    if (!user) {
      setErrorMessage("No user logged in.");
      return;
    }

    if (!amount || !category || !date)
      return setErrorMessage("Amount, category, and date are required.");

    let parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount)) {
      setErrorMessage("Please enter a valid number for amount.");
      return;
    }

    const { data, error } = await supabase
      .from("expenses")
      .insert([
        {
          user_id: user.id,
          amount: parsedAmount,
          category,
          description: description || null,
          date: date.toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding expense:", error.message);
      setErrorMessage("Failed to add expense. Please try again.");
      return;
    }

    setExpenses((prev) => [data as Expense, ...prev]);
    setAmount("");
    setCategory("");
    setDescription("");
    setDate(dayjs());
    setTouched({ amount: false, category: false });
  };

  const deleteExpense = async (id: string) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) {
      setErrorMessage("Failed to delete expense. Please try again.");
      console.error("Error deleting expense:", error.message);
      return;
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return {
    amount,
    setAmount,
    category,
    setCategory,
    description,
    setDescription,
    date,
    setDate,
    touched,
    setTouched,
    errorMessage,
    setErrorMessage,
    addExpense,
    deleteExpense,
  };
};
