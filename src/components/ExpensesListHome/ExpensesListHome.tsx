import type { ExpenseAndGoal } from "../../types/Expense";
import s from "./ExpensesListHome.module.css";
import { Button } from "@mui/material";
import { type FC } from "react";
import { monthLabel } from "../../helpers/monthLabel";
import CustomPagination from "../CustomPagination/CustomPagination";
import usePaginate from "../../hooks/usePaginate";

type ExpensesListHomeProps = {
  expenses: ExpenseAndGoal[];
  deleteExpense: (id: string) => void;
};

const ExpensesListHome: FC<ExpensesListHomeProps> = ({
  expenses,
  deleteExpense,
}) => {
  const { paginatedItems, pageCount, page, setPage } = usePaginate({
    items: expenses,
    itemsPerPage: 8,
  });

  return (
    <>
      {pageCount > 1 && (
        <div className={s.pagination}>
          <CustomPagination page={page} count={pageCount} onChange={setPage} />
        </div>
      )}

      <ul className={s.expensesList}>
        {paginatedItems.map((expense) => (
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
