import { DatePicker } from "@mui/x-date-pickers";
import CustomInput from "../../CustomInput/CustomInput";
import { Button } from "@mui/material";
import { useState, type FC } from "react";
import type { Touched } from "../../../types/Touched";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { datePickerSx } from "../../../InputStyles";
import s from "./AddExpenseForm.module.css";

type AddExpenseFormProps = {
  onAddExpense: (formData: {
    amount: string;
    category: string;
    description: string;
    date: Dayjs | null;
  }) => Promise<boolean>;
};

const AddExpenseForm: FC<AddExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [touched, setTouched] = useState<Touched>({
    amount: false,
    category: false,
  });

  const handleAddExpense = async () => {
    const result = await onAddExpense({ amount, category, description, date });
    if (result) {
      setAmount("");
      setCategory("");
      setDescription("");
      setDate(dayjs());
      setTouched({ amount: false, category: false });
    }
  };

  return (
    <div className={s.addExpense}>
      <CustomInput
        error={touched.amount && amount === ""}
        helperText={touched.amount && amount === "" && "Amount is required"}
        value={amount}
        label="Amount"
        onChange={setAmount}
        onBlur={() => setTouched({ ...touched, amount: true })}
      />
      <CustomInput
        error={touched.category && category === ""}
        helperText={
          touched.category && category === "" && "Category is required"
        }
        value={category}
        label="Category"
        onChange={setCategory}
        onBlur={() => setTouched({ ...touched, category: true })}
      />
      <CustomInput
        value={description}
        label="Description"
        onChange={setDescription}
      />
      <DatePicker
        label="Date"
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            ...datePickerSx,
          },
        }}
      />
      <Button variant="contained" onClick={handleAddExpense}>
        Add expense
      </Button>
    </div>
  );
};

export default AddExpenseForm;
