import type { FC } from "react";
import s from "./ExpensesList.module.css";
import { monthLabel } from "../../helpers/monthLabel";

type ExpensesListProps = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string | null;
  onClick?: () => void;
};

const ExpensesList: FC<ExpensesListProps> = ({
  id,
  amount,
  category,
  date,
  description,
  onClick,
}) => {
  return (
    <>
      <li key={id} className={s.expenseItem} onClick={onClick}>
        <div className={s.item}>
          <h2 className={s.category}>{category}</h2>
          <p className={s.description}>
            {description ? description : "No description"}
          </p>
          <h3 className={s.amount}>
            <span className={s.desc}>Amount: </span>
            {amount} $
          </h3>
        </div>
        <div className={s.itemDate}>
          <h3 className={s.date}>{monthLabel(date, "MMM D, YYYY")}</h3>
        </div>
      </li>
    </>
  );
};

export default ExpensesList;
