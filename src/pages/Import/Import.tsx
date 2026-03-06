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
        <div className={s.inputs}>
          <input
            type="file"
            accept=".csv"
            id="importCsv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importExpensesCsv(file);
            }}
            style={{ display: "none" }}
          />
          <input
            type="file"
            accept=".json"
            id="importJSON"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importExpensesJSON(file);
            }}
            style={{ display: "none" }}
          />
          <label className={s.label} htmlFor="importJSON">
            JSON
          </label>
          <label className={s.label} htmlFor="importCsv">
            CSV
          </label>
        </div>
        <div className={s.description}>
          <h3 className={s.descHeading}>
            Please note that you can only import files in the same format in
            which you exported them.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Import;
