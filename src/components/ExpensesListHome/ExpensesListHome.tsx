import type { Expense } from "../../types/Expense";
import s from "./ExpensesListHome.module.css";
import { Button } from "@mui/material";
import type { FC } from "react";
import { monthLabel } from "../../helpers/monthLabel";

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
          <div className={s.itemTop}>
            <span className={s.expenseCategory}>
              Category: {expense.category}
            </span>
            <span className={s.expenseAmount}>Amount: {expense.amount} $</span>
          </div>
          <div className={s.itemMiddle}>
            <p className={s.expenseDescription}>
              {expense.description ? expense.description : "No description"}
            </p>
          </div>
          <div className={s.itemBottom}>
            <p className={s.expenseDate}>
              {monthLabel(expense.date, "MMMM D, YYYY")}
            </p>
            <Button
              color="error"
              variant="outlined"
              onClick={() => deleteExpense(expense.id)}
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesListHome;
