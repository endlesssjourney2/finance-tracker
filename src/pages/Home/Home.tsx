import { useEffect, useState, type FC } from "react";
import s from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import type { Expense } from "../../types/Expense";
import { Button, TextField } from "@mui/material";
import { datePickerSx, inputSx } from "../../InputStyles";
import type { Touched } from "../../types/Touched";
import type { User } from "@supabase/supabase-js";
import { useExpenses } from "../../hooks/useExpenses";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import ExpensesSkeleton from "../../components/SkeletonHome/SkeletonHome";
import LinkButton from "../../components/LinkButton/LinkButton";

const Home: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { loading, setExpenses, expenses } = useExpenses(user);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [touched, setTouched] = useState<Touched>({
    amount: false,
    category: false,
  });
  const navigate = useNavigate();

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      setUser(user);
    };
    void init();
  }, [navigate]);

  const addExpense = async () => {
    if (!user) {
      console.error("No user logged in.");
      return;
    }

    if (!amount || !category)
      return console.error("Amount and category are required.");

    let parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount)) {
      alert("Please enter a valid number for amount.");
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
          date: date || dayjs().date(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding expense:", error.message);
      return;
    }

    setExpenses((prev) => [data as Expense, ...prev]);
    setAmount("");
    setCategory("");
    setDescription("");
    setDate(null);
    setTouched({ amount: false, category: false });
  };

  const deleteExpense = async (id: string) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) {
      console.error("Error deleting expense:", error.message);
      return;
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleNavigateView = () => {
    navigate("/view");
  };

  return (
    <div className={s.home}>
      <header className={s.header}>
        <h2 className={s.headerTitle}>Add your finance</h2>
      </header>
      <div className={s.content}>
        <div className={s.addExpense}>
          <TextField
            error={touched.amount && amount === ""}
            helperText={touched.amount && amount === "" && "Amount is required"}
            fullWidth
            sx={inputSx}
            value={amount}
            label="Amount(USD)"
            onChange={(e) => setAmount(e.target.value)}
            onBlur={() => setTouched({ ...touched, amount: true })}
          />
          <TextField
            error={touched.category && category === ""}
            helperText={
              touched.category && category === "" && "Category is required"
            }
            fullWidth
            sx={inputSx}
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            onBlur={() => setTouched({ ...touched, category: true })}
          />
          <TextField
            fullWidth
            sx={inputSx}
            value={description}
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            slotProps={{
              textField: {
                fullWidth: true,
                ...datePickerSx,
              },
            }}
          />
          <Button variant="contained" onClick={addExpense}>
            Add expense
          </Button>
        </div>
        {loading ? (
          <ExpensesSkeleton />
        ) : (
          <div className={s.expenses}>
            <h2 className={s.totalAmount}>Total Amount: {totalAmount} $</h2>
            <ul className={s.expensesList}>
              {expenses.map((expense) => (
                <li key={expense.id} className={s.expenseItem}>
                  <h3 className={s.expenseAmount}>
                    Amount: {expense.amount} $
                  </h3>
                  <h4 className={s.expenseCategory}>
                    Category: {expense.category}
                  </h4>
                  {expense.description ? (
                    <p className={s.expenseDescription}>
                      Description: {expense.description}
                    </p>
                  ) : (
                    <p className={s.expenseDescription}>No description</p>
                  )}
                  <p className={s.expenseDate}>
                    {dayjs(expense.date).format("MMM D, YYYY")}
                  </p>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <footer className={s.footer}>
        <LinkButton text="View your finances" onClick={handleNavigateView} />
      </footer>
      <LoadingProgress loading={loading} />
    </div>
  );
};

export default Home;
