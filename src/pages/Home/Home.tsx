import { useEffect, type FC } from "react";
import s from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { datePickerSx } from "../../InputStyles";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { DatePicker } from "@mui/x-date-pickers";
import ExpensesSkeleton from "../../components/Skeleton/SkeletonHome/SkeletonHome";
import LinkButton from "../../components/LinkButton/LinkButton";
import ExpensesListHome from "../../components/ExpensesListHome/ExpensesListHome";
import { useHome } from "../../hooks/useHome";
import Header from "../../components/Header/Header";
import CustomInput from "../../components/CustomInput/CustomInput";
import useExpensesWithGoals from "../../hooks/useExpensesWithGoals";
import { useAlert } from "../../context/AlertContext";

const Home: FC = () => {
  const {
    loading,
    expensesWithGoals,
    setExpenses,
    deleteExpense,
    totalAmount,
  } = useExpensesWithGoals();

  const {
    amount,
    setAmount,
    category,
    setCategory,
    description,
    setDescription,
    date,
    setDate,
    touched,
    setTouched,
    errorMessage,
    setErrorMessage,
    addExpense,
  } = useHome(setExpenses);

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!errorMessage) return;
    showAlert(errorMessage, { severity: "error" });
    setErrorMessage("");
  }, [errorMessage, setErrorMessage, showAlert]);

  const handleNavigateView = () => {
    navigate("/view");
  };

  return (
    <div className={s.home}>
      <Header title="Add your finance" />
      <div className={s.content}>
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
          <Button variant="contained" onClick={addExpense}>
            Add expense
          </Button>
        </div>
        {loading ? (
          <ExpensesSkeleton />
        ) : (
          <div className={s.expenses}>
            <h2 className={s.totalAmount}>Total Amount: ${totalAmount}</h2>
            <ExpensesListHome
              expenses={expensesWithGoals}
              deleteExpense={deleteExpense}
            />
          </div>
        )}
      </div>
      <footer className={s.footer}>
        <LinkButton text="View your finances" onClick={handleNavigateView} />
      </footer>
      <LoadingProgress loading={loading} />
    </div>
  );
};

export default Home;
