import s from "./Goals.module.css";
import useGoals from "../../hooks/useGoals";
import Header from "../../components/Header/Header";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { useMemo } from "react";
import SkeletonGoals from "../../components/Skeleton/SkeletonGoals/SkeletonGoals";
import Confetti from "react-confetti";
import useExpensesWithGoals from "../../hooks/useExpensesWithGoals";
import AddGoalForm from "../../components/Form/AddGoalForm/AddGoalForm";

const Goals = () => {
  const { authLoading, spentByCategory } = useExpensesWithGoals();

  const {
    goals,
    loading: goalsLoading,
    addGoal,
    deleteGoal,
    completeGoal,
    animation,
    setAnimation,
  } = useGoals();

  const totalGoals = goals.length;

  const completedGoals = useMemo(() => {
    return goals.filter(
      (goal) => (spentByCategory[goal.category] ?? 0) >= goal.goal,
    ).length;
  }, [goals, spentByCategory]);

  const loading = authLoading || goalsLoading;

  if (loading) {
    return (
      <div className={s.goals}>
        <Header title="Goals page" />
        <div className={s.content}>
          <SkeletonGoals />
        </div>
        <LoadingProgress loading={loading} />
      </div>
    );
  }
  return (
    <div className={s.goalsPage}>
      <Header title="Goals page" />
      <div className={s.content}>
        <AddGoalForm onAddGoal={addGoal} />
        {goals.length > 0 && (
          <div className={s.goalsInfo}>
            <h2 className={`${s.infoTitle} ${s.totalTitle}`}>
              Your goals: {totalGoals}
            </h2>
            <span className={`${s.infoTitle} ${s.completedGoals}`}>
              Completed: {completedGoals}
            </span>
          </div>
        )}

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
                    <span className={s.goalPercent}>
                      {Math.round(progress)}%
                    </span>

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
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {animation && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          onConfettiComplete={() => setAnimation(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
};

export default Goals;
