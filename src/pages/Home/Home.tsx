import { useMemo, type FC } from "react";
import s from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar } from "@mui/material";
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

const Home: FC = () => {
  const { loading, expensesWithGoals, setExpenses, deleteExpense } =
    useExpensesWithGoals();
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

  const totalAmount = useMemo(() => {
    return expensesWithGoals.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expensesWithGoals]);

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
              if (errorMessage) setErrorMessage("");
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                ...datePickerSx,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={addExpense}
            disabled={errorMessage.length > 0}
          >
            Add expense
          </Button>
        </div>
        {loading ? (
          <ExpensesSkeleton />
        ) : (
          <div className={s.expenses}>
            <h2 className={s.totalAmount}>Total Amount: {totalAmount} $</h2>
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorMessage !== ""}
        autoHideDuration={3500}
        onClose={(_, reason) => {
          if (reason === "clickaway") return;
          setErrorMessage("");
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorMessage("")}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
