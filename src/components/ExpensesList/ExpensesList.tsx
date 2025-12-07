import type { FC } from "react";
import s from "./ExpensesList.module.css";

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
        <h3 className={s.amount}>
          <span className={s.desc}>Amount:</span> {amount}$
        </h3>
        <p className={s.category}>
          <span className={s.desc}>Category:</span> {category}
        </p>
        <h3 className={s.date}>
          <span className={s.desc}>Date:</span>
          {new Date(date).toLocaleDateString()}
        </h3>
        <p className={s.description}>
          <span className={s.desc}>Desc:</span> {description}
        </p>
      </li>
    </>
  );
};

export default ExpensesList;
