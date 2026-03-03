import Header from "../../components/Header/Header";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { useExpenses } from "../../hooks/useExpenses";
import { useAuth } from "../Auth/AuthContext";
import s from "./Export.module.css";

const Export = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    exportExpensesCsv,
    exportExpensesJSON,
    loading: expensesLoading,
  } = useExpenses(user);

  const loading = authLoading || expensesLoading;

  if (loading) {
    return (
      <div className={s.exportPage}>
        <LoadingProgress loading={loading} />
      </div>
    );
  }

  return (
    <div className={s.exportPage}>
      <Header title="Here you can export finances in safety csv and json formats." />
      <div className={s.content}>
        <div className={s.buttons}>
          <button className={s.button} onClick={exportExpensesJSON}>
            Expenses JSON
          </button>
          <button className={s.button} onClick={exportExpensesCsv}>
            Expenses CSV
          </button>
        </div>
        <img className={s.img} src="fav.PNG" alt="icon by kvasiss" />
      </div>
    </div>
  );
};

export default Export;
