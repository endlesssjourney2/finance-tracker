import { useEffect, useState, type FC } from "react";
import s from "./View.module.css";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useExpenses } from "../../hooks/useExpenses";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import ExpensesList from "../../components/ExpensesList/ExpensesList";
import type { Expense } from "../../types/Expense";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import LinkButton from "../../components/LinkButton/LinkButton";
import dayjs from "dayjs";

const View: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const { loading, expenses } = useExpenses(user);

  const navigate = useNavigate();

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      setUser(user);
    };
    void init();
  }, [navigate]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedExpense(null);
  };
  const handleOpenModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalOpen(true);
  };

  const handleNavigateDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={s.viewPage}>
      {!user ? (
        <div className={s.notLoggedIn}>
          <h2 className={s.notLoggedInText}>
            <Link className={s.link} to={"/login"}>
              Log in
            </Link>{" "}
            to view your dashboard
          </h2>
        </div>
      ) : (
        <>
          <header className={s.header}>
            <h1 className={s.titleHeader}>Your Finances</h1>
          </header>
          <div className={s.content}>
            <div className={s.totalAmount}>
              <h2 className={s.totalTitle}>Total: {totalAmount} $</h2>
            </div>
            <ul className={s.expensesList}>
              {expenses.map((expense) => (
                <ExpensesList
                  key={expense.id}
                  onClick={() => handleOpenModal(expense)}
                  id={expense.id}
                  amount={expense.amount}
                  category={expense.category}
                  date={expense.date}
                  description={expense.description}
                />
              ))}
            </ul>
          </div>
        </>
      )}
      <LoadingProgress loading={loading} />
      <ModalComponent
        open={modalOpen}
        onClose={handleCloseModal}
        content={
          selectedExpense && (
            <div className={s.modalContent}>
              <h2 className={s.modalCategory}>{selectedExpense.category}</h2>
              <p className={s.modalAmount}>
                <span className={s.modalDesc}>Amount: </span>
                {selectedExpense.amount} $
              </p>
              <p className={s.modalDescription}>
                <span className={s.modalDesc}>Description: </span>
                {selectedExpense.description
                  ? selectedExpense.description
                  : "No description"}
              </p>
              <p className={s.modalDate}>
                {dayjs(selectedExpense.date).format("MMM D, YYYY")}
              </p>
            </div>
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
