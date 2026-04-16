import { useState, type FC } from "react";
import CustomInput from "../../CustomInput/CustomInput";
import s from "./AddGoalForm.module.css";
import { Button } from "@mui/material";

type AddGoalFormProps = {
  onAddGoal: (formData: {
    amount: string;
    name: string;
    category: string;
  }) => Promise<boolean>;
};

const AddGoalForm: FC<AddGoalFormProps> = ({ onAddGoal }) => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const handleAddGoal = async () => {
    const result = await onAddGoal({ amount, name, category });
    if (result) {
      setAmount("");
      setName("");
      setCategory("");
    }
  };

  return (
    <div className={s.inputs}>
      <CustomInput
        value={amount}
        onChange={setAmount}
        label="Goal Amount"
        required
      />
      <CustomInput value={name} onChange={setName} label="Goal Name" required />
      <CustomInput
        value={category}
        onChange={setCategory}
        label="Category"
        required
      />
      <span className={s.helper}>
        When you add a new expense, make sure the category name exactly matches
        the goal category
      </span>
      <Button onClick={handleAddGoal} variant="contained">
        Add goal
      </Button>
    </div>
  );
};

export default AddGoalForm;
