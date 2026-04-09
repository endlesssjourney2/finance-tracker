import { type FC } from "react";
import s from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import ExpensesSkeleton from "../../components/Skeleton/SkeletonHome/SkeletonHome";
import LinkButton from "../../components/LinkButton/LinkButton";
import ExpensesListHome from "../../components/ExpensesListHome/ExpensesListHome";
import Header from "../../components/Header/Header";
import useExpensesWithGoals from "../../hooks/useExpensesWithGoals";
import AddHomeForm from "../../components/Form/AddExpenseForm/AddExpenseForm";

const Home: FC = () => {
  const { loading, expensesWithGoals, deleteExpense, totalAmount, addExpense } =
    useExpensesWithGoals();
  const navigate = useNavigate();

  const handleNavigateView = () => {
    navigate("/view");
  };

  return (
    <div className={s.home}>
      <Header title="Add your finance" />
      <div className={s.content}>
        <AddHomeForm onAddExpense={addExpense} />
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
