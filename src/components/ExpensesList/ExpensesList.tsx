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
  avg: number;
};

const ExpensesList: FC<ExpensesListProps> = ({
  id,
  amount,
  category,
  date,
  description,
  onClick,
  hasGoal,
  avg,
}) => {
  const isMoreThanAvg = amount > avg;

  return (
    <>
      <li key={id} className={s.expenseItem} onClick={onClick}>
        <div className={s.itemTop}>
          <div className={s.header}>
            <h2 className={s.category}>{category}</h2>
            {hasGoal && <span className={s.goal}>Your goal</span>}
          </div>
          <p className={s.description}>
            {description ? description : "No description"}
          </p>
        </div>
        <div className={s.itemBottom}>
          <div className={s.amount}>
            <span className={s.amountText}>Amount: </span>
            <span className={s.amountValue}>${amount}</span>
          </div>
          <span className={`${s.avg} ${isMoreThanAvg ? s.moreAvg : s.lessAvg}`}>
            {isMoreThanAvg ? "↑" : "↓"} average
          </span>
        </div>
        <div className={s.itemDate}>
          <h3 className={s.date}>{monthLabel(date, "MMM D, YYYY")}</h3>
        </div>
      </li>
    </>
  );
};

export default ExpensesList;
