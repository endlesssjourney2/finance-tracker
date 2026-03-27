import { useEffect, useMemo, useState, type FC } from "react";
import s from "./View.module.css";
import { Link, useNavigate } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import ExpensesList from "../../components/ExpensesList/ExpensesList";
import type { Expense, ExpenseAndGoal } from "../../types/Expense";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import LinkButton from "../../components/LinkButton/LinkButton";
import SkeletonView from "../../components/Skeleton/SkeletonView/SkeletonView";
import Header from "../../components/Header/Header";
import ModalContent from "../../components/ModalContent/ModalContent";
import { useDebounce } from "../../hooks/useDebounce";
import SearchView from "../../components/SearchView/SearchView";
import useExpensesWithGoals from "../../hooks/useExpensesWithGoals";

const View: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseAndGoal | null>(
    null,
  );

  //  Composable hook — combines useExpenses and useGoals.
  // Using instead of useExpenses wherever need hasGoal or totalAmount.
  const {
    authLoading,
    loading: expensesLoading,
    expensesWithGoals,
    deleteExpense,
    updateExpense,
    totalAmount,
    user,
  } = useExpensesWithGoals();

  useEffect(() => {
    if (!selectedExpense) return;
    const updated = expensesWithGoals.find((e) => e.id === selectedExpense.id);
    if (updated) setSelectedExpense(updated);
  }, [expensesWithGoals]);

  const [searchItem, setSearchItem] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const debouncedValue = useDebounce(searchItem, 300);

  const navigate = useNavigate();

  const loading = authLoading || expensesLoading;

  const monthsFromExpenses = Array.from(
    new Set(
      expensesWithGoals.map((expense) => {
        return expense.date.slice(0, 7);
      }),
    ),
  ).sort();

  const filteredExpenses = useMemo(() => {
    return expensesWithGoals.filter((expense) => {
      const expenseByName =
        expense.category.toLowerCase().includes(debouncedValue.toLowerCase()) ||
        (expense.description !== null &&
          expense.description
            .toLowerCase()
            .includes(debouncedValue.toLowerCase()));

      const expenseByMonths =
        selectedMonth === "" || expense.date.slice(0, 7) === selectedMonth;

      return expenseByName && expenseByMonths;
    });
  }, [expensesWithGoals, debouncedValue, selectedMonth]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedExpense(null);
  };
  const handleOpenModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalOpen(true);
  };

  const deleteAndCloseModal = async (id: string) => {
    await deleteExpense(id);
    handleCloseModal();
  };

  const handleNavigateDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className={s.viewPage}>
        <Header title="Your Finances" />
        <div className={s.content}>
          <SkeletonView />
        </div>
        <LoadingProgress loading={loading} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={s.viewPage}>
        <div className={s.notLoggedIn}>
          <h2 className={s.notLoggedInText}>
            <Link className={s.link} to={"/login"}>
              Log in
            </Link>{" "}
            to view your Finances
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={s.viewPage}>
      <Header title="Your Finances" />
      <div className={s.content}>
        <div className={s.totalAmount}>
          <h2 className={s.totalTitle}>Total: {totalAmount} $</h2>
        </div>
        <SearchView
          value={searchItem}
          onChangeValue={setSearchItem}
          months={monthsFromExpenses}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        {filteredExpenses.length === 0 && (
          <div className={s.noResults}>
            <h2 className={s.noResultsText}>No expenses found.</h2>
          </div>
        )}

        <ul className={s.expensesList}>
          {filteredExpenses.map((expense) => (
            <ExpensesList
              key={expense.id}
              onClick={() => handleOpenModal(expense)}
              id={expense.id}
              amount={expense.amount}
              category={expense.category}
              date={expense.date}
              description={expense.description}
              hasGoal={expense.hasGoal}
            />
          ))}
        </ul>
      </div>
      <ModalComponent
        open={modalOpen}
        onClose={handleCloseModal}
        content={
          selectedExpense && (
            <ModalContent
              selectedExpense={selectedExpense}
              onDelete={deleteAndCloseModal}
              onUpdate={updateExpense}
            />
          )
        }
      />
      <footer className={s.footer}>
        <LinkButton text="Dashboard" onClick={handleNavigateDashboard} />
      </footer>
    </div>
  );
};

export default View;
