import Header from "../../components/Header/Header";
import { useExpenses } from "../../hooks/useExpenses";
import s from "./Import.module.css";
import Guide from "./components/Guide";

const Import = () => {
  const { importExpensesCsv, importExpensesJSON } = useExpenses();

  return (
    <div className={s.importPage}>
      <Header title="Here you can import finances in csv or json format." />
      <div className={s.content}>
        <div className={s.inputs}>
          <input
            type="file"
            accept=".csv"
            id="importCsv"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              const input = e.currentTarget;
              if (!file) return;
              try {
                await importExpensesCsv(file);
              } catch (e) {
                console.error(e);
              } finally {
                input.value = "";
              }
            }}
            style={{ display: "none" }}
          />
          <input
            type="file"
            accept=".json"
            id="importJSON"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              const input = e.currentTarget;
              if (!file) return;
              try {
                await importExpensesJSON(file);
              } catch (e) {
                console.error(e);
              } finally {
                input.value = "";
              }
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
            Please note that you can only import files in the same format as in
            guides below. If your file structure is different, the import will
            fail.
          </h3>
        </div>
        <Guide />
      </div>
    </div>
  );
};

export default Import;
