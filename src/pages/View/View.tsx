import { useEffect, useState, type FC } from "react";
import s from "./View.module.css";

import type { User } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useExpenses } from "../../hooks/useExpenses";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";

const View: FC = () => {
  const [user, setUser] = useState<User | null>(null);

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
                <li key={expense.id} className={s.expenseItem}>
                  <h3 className={s.amount}>
                    <span className={s.desc}>Amount:</span> {expense.amount}$
                  </h3>
                  <p className={s.category}>
                    <span className={s.desc}>Category:</span> {expense.category}
                  </p>
                  <h3 className={s.date}>
                    <span className={s.desc}>Date:</span>{" "}
                    {new Date(expense.date).toLocaleDateString()}
                  </h3>
                  <p className={s.description}>
                    <span className={s.desc}>Desc:</span> {expense.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <LoadingProgress loading={loading} />
    </div>
  );
};

export default View;
