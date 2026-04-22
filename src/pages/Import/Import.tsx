import Header from "../../components/Header/Header";
import { useExpenses } from "../../hooks/useExpenses";
import s from "./Import.module.css";
import Guide from "./components/Guide/Guide";
import Imports from "./components/Imports/Imports";

const Import = () => {
  const { importExpensesCsv, importExpensesJSON } = useExpenses();

  return (
    <div className={s.importPage}>
      <Header title="Here you can import finances in csv or json format." />
      <div className={s.content}>
        <Imports
          importExpensesCsv={importExpensesCsv}
          importExpensesJSON={importExpensesJSON}
        />
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
