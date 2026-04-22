import type { FC } from "react";
import s from "./Imports.module.css";

type ImportsProps = {
  importExpensesCsv: (file: File) => Promise<void>;
  importExpensesJSON: (file: File) => Promise<void>;
};

const Imports: FC<ImportsProps> = ({
  importExpensesCsv,
  importExpensesJSON,
}) => {
  return (
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
  );
};

export default Imports;
