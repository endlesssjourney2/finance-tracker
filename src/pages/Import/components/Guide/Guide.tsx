import { Divider } from "@mui/material";
import s from "./Guide.module.css";

const Guide = () => {
  return (
    <div className={s.guide}>
      <div className={s.titleCont}>
        <h2 className={s.guideTitle}>How does it work?</h2>
      </div>
      <div className={s.guideCont}>
        <div className={s.card}>
          <h2 className={s.cardTitle}>JSON</h2>
          <Divider sx={{ background: "#000000", width: "100%" }} />
          <p className={s.text}>
            To import expenses using JSON, your file must include all database
            fields except <b>id</b> and <b>user_id</b>. These fields are
            generated automatically.
          </p>
          <p className={s.text}>Example of a valid JSON structure:</p>

          <pre className={s.code}>
            {`{
  "expenses": [
    {
      "amount": 100,
      "category": "Food",
      "description": "lunch",
      "date": "2026-03-31"
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
100, Food, lunch, 2026-03-31`}
          </pre>
          <p className={s.warning}>
            The first row <b>must</b> contain column names. Do not include{" "}
            <b>id</b> or <b>user_id</b> fields. They will be added
            automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
