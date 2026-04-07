import type { ExpenseAndGoal } from "../../types/Expense";
import s from "./ExpensesListHome.module.css";
import { Button } from "@mui/material";
import { useMemo, useState, type FC } from "react";
import { monthLabel } from "../../helpers/monthLabel";
import CustomPagination from "../CustomPagination/CustomPagination";

type ExpensesListHomeProps = {
  expenses: ExpenseAndGoal[];
  deleteExpense: (id: string) => void;
};

const ITEMS_PER_PAGE = 8;

const ExpensesListHome: FC<ExpensesListHomeProps> = ({
  expenses,
  deleteExpense,
}) => {
  const [page, setPage] = useState(1);
  const paginatedExpenses = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return expenses.slice(start, end);
  }, [page, expenses]);

  const pageCount = Math.ceil(expenses.length / ITEMS_PER_PAGE);

  return (
    <>
      <CustomPagination page={page} count={pageCount} onChange={setPage} />
      <ul className={s.expensesList}>
        {paginatedExpenses.map((expense) => (
          <li key={expense.id} className={s.expenseItem}>
            <div className={s.itemTop}>
              <span className={s.expenseCategory}>
                Category: {expense.category}
              </span>
              <span className={s.expenseAmount}>Amount: ${expense.amount}</span>
            </div>
            <div className={s.itemMiddle}>
              <p className={s.expenseDescription}>
                {expense.description ? expense.description : "No description"}
              </p>
              {expense.hasGoal && <span className={s.goal}>Your goal</span>}
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
    </>
  );
};

export default ExpensesListHome;
