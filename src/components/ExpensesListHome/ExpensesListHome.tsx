import dayjs from "dayjs";
import type { Expense } from "../../types/Expense";
import s from "./ExpensesListHome.module.css";
import { Button } from "@mui/material";
import type { FC } from "react";

type ExpensesListHomeProps = {
  expenses: Expense[];
  deleteExpense: (id: string) => void;
};

const ExpensesListHome: FC<ExpensesListHomeProps> = ({
  expenses,
  deleteExpense,
}) => {
  return (
    <ul className={s.expensesList}>
      {expenses.map((expense) => (
        <li key={expense.id} className={s.expenseItem}>
          <h3 className={s.expenseAmount}>Amount: {expense.amount} $</h3>
          <h4 className={s.expenseCategory}>Category: {expense.category}</h4>
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
  );
};

export default ExpensesListHome;
