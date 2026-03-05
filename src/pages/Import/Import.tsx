import Header from "../../components/Header/Header";
import { useExpenses } from "../../hooks/useExpenses";
import { useAuth } from "../Auth/AuthContext";
import s from "./Import.module.css";
{
  /* feature page */
}
const Import = () => {
  const { user } = useAuth();
  const { importExpensesCsv, importExpensesJSON } = useExpenses(user);

  return (
    <div className={s.importPage}>
      <Header title="Here you can import finances in csv or json format." />
      <div className={s.content}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) importExpensesCsv;
          }}
        />
        <input
          type="file"
          accept=".json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) importExpensesJSON;
          }}
        />
      </div>
    </div>
  );
};

export default Import;
