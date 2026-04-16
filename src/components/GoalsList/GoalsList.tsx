import { type FC } from "react";
import type { Goal } from "../../types/Goal";
import s from "./GoalsList.module.css";
import CopyButton from "../CopyButton/CopyButton";

type GoalsListProps = {
  goals: Goal[];
  spentByCategory: Record<string, number>;
  deleteGoal: (id: string) => void;
  completeGoal: (id: string) => void;
  animation: boolean;
};

const GoalsList: FC<GoalsListProps> = ({
  goals,
  spentByCategory,
  deleteGoal,
  completeGoal,
  animation,
}) => {
  return (
    <div className={s.list}>
      <ul className={s.goalsList}>
        {goals.map((goal) => {
          const spent = spentByCategory[goal.category] ?? 0;
          const progress = Math.min((spent / goal.goal) * 100, 100);

          return (
            <li key={goal.id} className={s.item}>
              <div className={s.itemTop}>
                <span className={s.goalName}>{goal.name}</span>
                <span className={s.goalAmount}>
                  {spent} $ / {goal.goal} $
                </span>
              </div>

              <progress className={s.progress} value={progress} max={100} />
              <div className={s.itemBottom}>
                <span className={s.goalCategory}>
                  Category:{" "}
                  <span className={s.categoryText}>{goal.category}</span>
                </span>
                <span className={s.goalPercent}>{Math.round(progress)}%</span>

                <div className={s.buttons}>
                  <button
                    className={`${s.btn} ${s.deleteBtn}`}
                    onClick={() => deleteGoal(goal.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`${s.btn} ${s.completeBtn}`}
                    onClick={() => completeGoal(goal.id)}
                    disabled={spent < goal.goal || animation}
                  >
                    Complete
                  </button>
                </div>
                <div className={s.copyButton}>
                  <CopyButton
                    text={goal.category}
                    textForButton="Copy category"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GoalsList;
