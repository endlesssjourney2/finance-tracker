import type { FC } from "react";
import { monthLabel } from "../../helpers/percentileTicks";
import s from "./ResultPercentile.module.css";

type ResultPercentileProps = {
  monthA: string;
  spendA: number;
  monthB: string;
  spendB: number;
  diff: number;
  pct: number | null;
  verdict: "more" | "less" | "same";
};

const ResultPercentile: FC<ResultPercentileProps> = ({
  monthA,
  monthB,
  spendA,
  spendB,
  diff,
  pct,
  verdict,
}) => {
  return (
    <div className={s.resultCard}>
      <div className={s.months}>
        <div className={s.monthItem}>
          <h2 className={s.monthName}>{monthLabel(monthA)}</h2>
          <span className={s.monthValue}>
            {spendA.toFixed(2)} <span className={s.unit}>$</span>
          </span>
        </div>
        <div className={s.monthItem}>
          <div className={s.monthName}>{monthLabel(monthB)}</div>
          <div className={s.monthValue}>
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
              className={`${s.metricValue} ${pct >= 0 ? s.positive : s.negative}`}
            >
              {pct?.toFixed(2)} %
            </span>
          </div>
        )}
      </div>
      {pct !== null && (
        <div className={s.verdict}>
          In <span className={s.bold}>{monthLabel(monthA)}</span> you spent{" "}
          <span className={`${s.bold} ${pct >= 0 ? s.positive : s.negative}`}>
            {verdict}
          </span>{" "}
          by <span className={s.bold}>{Math.abs(pct).toFixed(2)}%</span> than in{" "}
          <span className={s.bold}>{monthLabel(monthB)}</span>.
        </div>
      )}
    </div>
  );
};

export default ResultPercentile;
