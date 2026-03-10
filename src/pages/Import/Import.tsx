import { Alert, Divider, Snackbar } from "@mui/material";
import Header from "../../components/Header/Header";
import { useExpenses } from "../../hooks/useExpenses";
import { useAuth } from "../Auth/AuthContext";
import s from "./Import.module.css";
import { useState } from "react";

const Import = () => {
  const { user } = useAuth();
  const { importExpensesCsv, importExpensesJSON } = useExpenses(user);
  const [message, setMessage] = useState("");

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
                setMessage("Import complete!");
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
                setMessage("Import complete!");
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
            Please note that you can only import files in the same format in
            which you exported them.
          </h3>
        </div>
        <div className={s.guide}>
          <div className={s.titleCont}>
            <h2 className={s.guideTitle}>How does it work?</h2>
          </div>
          <div className={s.guideCont}>
            <div className={s.card}>
              <h2 className={s.cardTitle}>JSON</h2>
              <Divider sx={{ background: "#000000", width: "100%" }} />
              <p className={s.text}>
                To import expenses using JSON, your file must include all
                database fields except <b>id</b> and <b>user_id</b>. These
                fields are generated automatically.
              </p>
              <p className={s.text}>Example of a valid JSON structure:</p>

              <pre className={s.code}>
                {`{
  "expenses": [
    {
      "amount": 100,
      "category": "Food(category)",
      "description": "lunch(description)",
      "date": "2026-03-01T12:00:00+00:00"
    }
  ]
}`}
              </pre>
              <p className={s.warning}>
                Do not include <b>id</b> or <b>user_id</b> fields. They will be
                added automatically.
              </p>
            </div>
            <div className={s.card}>
              <h2 className={s.cardTitle}>CSV</h2>
              <Divider sx={{ background: "#000000", width: "100%" }} />
              <p className={s.text}>
                The CSV file must contain the same fields as the database except
                <b> id</b> and <b>user_id</b>. These fields are generated
                automatically.
              </p>
              <p className={s.text}>Example of a valid CSV structure:</p>

              <pre className={s.code}>
                {`amount,category,description,date
100(amount),Food(category),lunch(description),2026-03-01T12:00:00+00:00`}
              </pre>
              <p className={s.warning}>
                The first row <b>must</b> contain column names. Do not include{" "}
                <b>id</b> or <b>user_id</b> fields. They will be added
                automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={message !== ""}
        autoHideDuration={2500}
        onClose={(_, reason) => {
          if (reason === "clickaway") return;
          setMessage("");
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Import;
