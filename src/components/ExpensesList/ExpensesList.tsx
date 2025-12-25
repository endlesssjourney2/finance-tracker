import type { FC } from "react";
import s from "./ExpensesList.module.css";
import dayjs from "dayjs";

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
          <span className={s.desc}>Amount: </span>
          {amount} $
        </h3>
        <p className={s.category}>
          <span className={s.desc}>Category: </span>
          {category}
        </p>
        <p className={s.description}>
          <span className={s.desc}>Desc: </span>
          {description ? description : "No description"}
        </p>
        <h3 className={s.date}>{dayjs(date).format("MMM D, YYYY")}</h3>
      </li>
    </>
  );
};

export default ExpensesList;
