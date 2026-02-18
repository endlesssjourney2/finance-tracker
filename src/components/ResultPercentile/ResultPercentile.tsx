import type { FC } from "react";
import s from "./ResultPercentile.module.css";

type ResultPercentileProps = {
  valueA: string;
  spendA: number;
  valueB: string;
  spendB: number;
  diff: number;
  pct: number | null;
  verdict: "more" | "less" | "same";
};

const ResultPercentile: FC<ResultPercentileProps> = ({
  valueA,
  valueB,
  spendA,
  spendB,
  diff,
  pct,
  verdict,
}) => {
  return (
    <div className={s.resultCard}>
      <div className={s.values}>
        <div className={s.valueItem}>
          <h2 className={s.valueName}>{valueA}</h2>
          <span className={s.value}>
            {spendA.toFixed(2)} <span className={s.unit}>$</span>
          </span>
        </div>
        <div className={s.valueItem}>
          <div className={s.valueName}>{valueB}</div>
          <div className={s.value}>
            {spendB.toFixed(2)} <span className={s.unit}>$</span>
          </div>
        </div>
      </div>
      <div className={s.summary}>
        <div className={s.metric}>
          <span className={s.metricLabel}>Difference</span>
          <span className={s.metricValue}>{diff.toFixed(2)} $</span>
        </div>
        {pct !== null && (
          <div className={s.metric}>
            <span className={s.metricLabel}>Change</span>
            <span
              className={`${s.metricValue} ${verdict === "more" ? s.positive : s.negative}`}
            >
              {pct?.toFixed(2)} %
            </span>
          </div>
        )}
      </div>
      {pct !== null && (
        <div className={s.verdict}>
          In <span className={s.bold}>{valueA}</span> you spent{" "}
          <span
            className={`${s.bold} ${verdict === "more" ? s.positive : s.negative}`}
          >
            {verdict}
          </span>{" "}
          by <span className={s.bold}>{Math.abs(pct).toFixed(2)}%</span> than in{" "}
          <span className={s.bold}>{valueB}</span>.
        </div>
      )}
    </div>
  );
};

export default ResultPercentile;
