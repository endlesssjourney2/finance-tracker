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

const View: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const { loading, expenses } = useExpenses(user);

  const navigate = useNavigate();

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

  return (
    <div className={s.viewPage}>
      {!user ? (
        <p className={s.loginPrompt}>
          Log in to see your finances{" "}
          <Link className={s.linkLogin} to={"/login"}>
            Login
          </Link>
        </p>
      ) : (
        <>
          <header className={s.header}>
            <h1 className={s.titleHeader}>Your Finances</h1>
          </header>
          <div className={s.content}>
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
                {selectedExpense.amount}$
              </p>
              <p className={s.modalDescription}>
                <span className={s.modalDesc}>Description: </span>
                {selectedExpense.description}
              </p>
              <p className={s.modalDate}>
                <span className={s.modalDesc}>Date: </span>
                {new Date(selectedExpense.date).toLocaleDateString()}
              </p>
            </div>
          )
        }
      />
    </div>
  );
};

export default View;
