import s from "./ModalContent.module.css";
import type { FC } from "react";
import type { Expense } from "../../types/Expense";
import { monthLabel } from "../../helpers/monthLabel";

type ModalContentProps = {
  selectedExpense: Expense;
  onDelete: (id: string) => Promise<void>;
};

const ModalContent: FC<ModalContentProps> = ({ selectedExpense, onDelete }) => {
  return (
    <div className={s.modalContent}>
      <h2 className={s.modalCategory}>{selectedExpense.category}</h2>
      <p className={s.modalAmount}>
        <span className={s.modalDesc}>Amount: </span>
        {selectedExpense.amount} $
      </p>
      <p className={s.modalDescription}>
        {selectedExpense.description
          ? selectedExpense.description
          : "No description"}
      </p>
      <p className={s.modalDate}>
        {monthLabel(selectedExpense.date, "MMMM D, YYYY")}
      </p>
      <button
        className={s.deleteButton}
        onClick={() => onDelete(selectedExpense.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ModalContent;
