import { useEffect, useState } from "react";
import type { Expense } from "../types/Expense";
import { downloadBlob, toCsv } from "../helpers/downloadExpenses";
import { abbreviatedDate } from "../helpers/abbreviatedDate";
import Papa from "papaparse";
import { useAlert } from "../context/AlertContext";
import { useAuth } from "../pages/Auth/AuthContext";
import type { Dayjs } from "dayjs";
import {
  addExpenseApi,
  deleteExpenseApi,
  getExpenses,
  importExpensesApi,
  updateExpenseApi,
} from "../api/expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchExpenses = async () => {
      setLoading(true);
      const [data, error] = await getExpenses(user.id);
      if (error) {
        showAlert("Failed to load expenses. Please try again.", {
          severity: "error",
        });
        setLoading(false);
        return;
      }
      setExpenses(data as Expense[]);
      setLoading(false);
    };
    void fetchExpenses();
  }, [user]);

  const addExpense = async (formData: {
    amount: string;
    category: string;
    description: string;
    date: Dayjs | null;
  }) => {
    if (!user) return false;

    if (!formData.amount || !formData.category || !formData.date) {
      showAlert("Amount, category, and date are required.", {
        severity: "error",
      });
      return false;
    }

    const parsedAmount = Number(formData.amount);

    if (Number.isNaN(parsedAmount)) {
      showAlert("Please enter a valid number for amount.", {
        severity: "error",
      });
      return false;
    }

    const [data, error] = await addExpenseApi(
      user.id,
      formData.category,
      parsedAmount,
      formData.description,
      formData.date.toISOString(),
    );
    if (error) {
      showAlert("Failed to add expense. Please try again.", {
        severity: "error",
      });
      return false;
    }

    showAlert("Expense added successfully", { severity: "success" });
    setExpenses((prev) => [data as Expense, ...prev]);
    return true;
  };

  const deleteExpense = async (id: string) => {
    if (!user) return;
    const error = await deleteExpenseApi(id);

    if (error) {
      console.error("Error deleting expense:", error.message);
      showAlert("Failed to delete expense. Please try again.", {
        severity: "error",
      });
      return;
    }
    showAlert("Expense deleted successfully", { severity: "success" });
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExpense = async (
    id: string,
    updated: Omit<Expense, "id" | "user_id">,
  ) => {
    if (!user) return;
    const [data, error] = await updateExpenseApi(id, updated);
    if (error) {
      console.error("Error updating expense", error.message);
      showAlert("Failed to update expense. Please try again.", {
        severity: "error",
      });
      return;
    }
    showAlert("Expense updated successfully", { severity: "success" });
    setExpenses((prev) => {
      return prev.map((e) => (e.id === id ? (data as Expense) : e));
    });
  };

  const exportExpensesJSON = () => {
    if (!user) return;
    try {
      const payload = {
        exportedAt: abbreviatedDate(),
        expenses,
        userId: user.id,
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      downloadBlob(blob, `expenses-${abbreviatedDate()}.json`);
      showAlert("Expenses exported successfully", { severity: "success" });
    } catch (error) {
      if (error) {
        showAlert("Failed to export expenses. Please try again.", {
          severity: "error",
        });
      }
    }
  };

  const exportExpensesCsv = () => {
    if (!user) return;

    try {
      const csv = toCsv(expenses);
      const blob = new Blob([csv], { type: "text/csv" });
      downloadBlob(blob, `expenses-${abbreviatedDate()}.csv`);
      showAlert("Expenses exported successfully", { severity: "success" });
    } catch (error) {
      if (error) {
        showAlert("Failed to export expenses. Please try again.", {
          severity: "error",
        });
      }
    }
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
        const [data, error] = await importExpensesApi(parsed);

        if (error) {
          showAlert("Failed to import expenses. Please try again.", {
            severity: "error",
          });
          return;
        }
        showAlert("Expenses imported successfully", { severity: "success" });
        setExpenses((prev) => [...(data as Expense[]), ...prev]);
      },
    });
  };

  const importExpensesJSON = async (file: File) => {
    if (!user) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const parsed = (json.expenses as Expense[]).map((row) => ({
        user_id: user.id,
        amount: row.amount,
        category: row.category,
        description: row.description,
        date: row.date,
      }));

      const [data, error] = await importExpensesApi(parsed);

      if (error) {
        showAlert("Failed to import expenses. Please try again.", {
          severity: "error",
        });
        return;
      }
      showAlert("Expenses imported successfully", { severity: "success" });
      setExpenses((prev) => [...(data as Expense[]), ...prev]);
    } catch (error) {
      console.error("Error parsing JSON file", error);
      showAlert(
        "Failed to parse JSON file. Please ensure it's in the correct format.",
        {
          severity: "error",
        },
      );
      return;
    }
  };

  return {
    expenses,
    loading,
    setExpenses,
    addExpense,
    deleteExpense,
    exportExpensesJSON,
    exportExpensesCsv,
    updateExpense,
    importExpensesCsv,
    importExpensesJSON,
  };
};
