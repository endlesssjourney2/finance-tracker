import type { FC } from "react";
import s from "./ExpensesList.module.css";
import { monthLabel } from "../../helpers/monthLabel";

type ExpensesListProps = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string | null;
  hasGoal?: boolean;
  onClick?: () => void;
};

const ExpensesList: FC<ExpensesListProps> = ({
  id,
  amount,
  category,
  date,
  description,
  onClick,
  hasGoal,
}) => {
  return (
    <>
      <li key={id} className={s.expenseItem} onClick={onClick}>
        <div className={s.item}>
          {hasGoal && <span className={s.goal}>Your goal</span>}
          <h2 className={s.category}>{category}</h2>
          <p className={s.description}>
            {description ? description : "No description"}
          </p>
          <span className={s.amount}>Amount: {amount} $</span>
        </div>
        <div className={s.itemDate}>
          <h3 className={s.date}>{monthLabel(date, "MMM D, YYYY")}</h3>
        </div>
      </li>
    </>
  );
};

export default ExpensesList;
