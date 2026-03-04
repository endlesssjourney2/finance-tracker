import s from "./ModalContent.module.css";
import { useState, type FC } from "react";
import type { Expense } from "../../types/Expense";
import { monthLabel } from "../../helpers/monthLabel";
import InputHome from "../InputHome/InputHome";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { datePickerSx } from "../../InputStyles";

type ModalContentProps = {
  selectedExpense: Expense;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (
    id: string,
    updated: Omit<Expense, "user_id" | "id">,
  ) => Promise<void>;
};

const ModalContent: FC<ModalContentProps> = ({
  selectedExpense,
  onDelete,
  onUpdate,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    amount: selectedExpense.amount,
    category: selectedExpense.category,
    date: selectedExpense.date,
    description: selectedExpense.description,
  });

  const handleSave = async () => {
    await onUpdate(selectedExpense.id, editForm);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditForm({
      amount: selectedExpense.amount,
      category: selectedExpense.category,
      date: selectedExpense.date,
      description: selectedExpense.description,
    });
  };

  if (isEdit) {
    return (
      <div className={s.modalContentEdit}>
        <h2 className={s.modalHeader}>Edit form</h2>
        <div className={s.inputs}>
          <InputHome
            required
            value={String(editForm.amount)}
            label="Amount"
            onChange={(value) =>
              setEditForm({ ...editForm, amount: Number(value) })
            }
          />
          <InputHome
            required
            value={editForm.category}
            label="Category"
            onChange={(value) =>
              setEditForm({
                ...editForm,
                category: value,
              })
            }
          />
          <InputHome
            value={editForm.description}
            label="Description"
            onChange={(value) => {
              setEditForm({
                ...editForm,
                description: value,
              });
            }}
          />
          <DatePicker
            label="Date"
            value={dayjs(editForm.date)}
            onChange={(val) => {
              if (val)
                setEditForm({
                  ...editForm,
                  date: val?.toISOString(),
                });
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                ...datePickerSx,
              },
            }}
          />
        </div>
        <div className={s.buttons}>
          <button
            className={`${s.button} ${s.save}`}
            onClick={handleSave}
            // just for now, may be thats not bad
            disabled={!editForm.amount || !editForm.category || !editForm.date}
          >
            Save
          </button>
          <button className={`${s.button} ${s.cancel}`} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

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
      <div className={s.buttons}>
        <button
          className={`${s.button} ${s.cancel}`}
          onClick={() => onDelete(selectedExpense.id)}
        >
          Delete
        </button>
        <button
          className={`${s.button} ${s.edit}`}
          onClick={() => setIsEdit(true)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
