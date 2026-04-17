import type { FC } from "react";
import s from "./GoalsInfo.module.css";

type GoalsInfoProps = {
  totalGoals: number;
  completedGoals: number;
};

const GoalsInfo: FC<GoalsInfoProps> = ({ totalGoals, completedGoals }) => {
  return (
    <div className={s.goalsInfo}>
      <h2 className={`${s.infoTitle} ${s.totalTitle}`}>
        Your goals: {totalGoals}
      </h2>
      <span className={`${s.infoTitle} ${s.completedGoals}`}>
        Completed: {completedGoals}
      </span>
    </div>
  );
};

export default GoalsInfo;
