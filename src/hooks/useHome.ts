import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { Touched } from "../types/Touched";
import { supabase } from "../supabaseClient";
import type { Expense } from "../types/Expense";
import { useAuth } from "../pages/Auth/AuthContext";
import { useAlert } from "../context/AlertContext";

export const useHome = (setExpenses: Dispatch<SetStateAction<Expense[]>>) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [touched, setTouched] = useState<Touched>({
    amount: false,
    category: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();
  const { showAlert } = useAlert();

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
      showAlert("Failed to add expense. Please try again.", {
        severity: "error",
      });
      return;
    }

    showAlert("Expense added successfully", { severity: "success" });
    setExpenses((prev) => [data as Expense, ...prev]);
    setAmount("");
    setCategory("");
    setDescription("");
    setDate(dayjs());
    setTouched({ amount: false, category: false });
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
  };
};
