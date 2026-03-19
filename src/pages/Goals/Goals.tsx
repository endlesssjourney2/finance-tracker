import s from "./Goals.module.css";
import useGoals from "../../hooks/useGoals";
import { useAuth } from "../Auth/AuthContext";
import Header from "../../components/Header/Header";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { useExpenses } from "../../hooks/useExpenses";
import CustomInput from "../../components/CustomInput/CustomInput";
import { Button } from "@mui/material";
import { useMemo } from "react";
import SkeletonGoals from "../../components/Skeleton/SkeletonGoals/SkeletonGoals";
import Confetti from "react-confetti";
const Goals = () => {
  const { user, loading: authLoading } = useAuth();
  const { expenses } = useExpenses(user);

  const {
    goals,
    loading: goalsLoading,
    addGoal,
    deleteGoal,
    amount,
    setAmount,
    category,
    setCategory,
    name,
    setName,
    completeGoal,
    animation,
    setAnimation,
  } = useGoals(user);

  const spentByCategory = useMemo(() => {
    return expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount;
      return acc;
    }, {});
  }, [expenses]);

  const totalGoals = useMemo(() => {
    return goals.length;
  }, [goals]);

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
        <div className={s.inputs}>
          <CustomInput
            value={amount}
            onChange={setAmount}
            label="Goal"
            required
          />
          <CustomInput
            value={name}
            onChange={setName}
            label="Goal Name"
            required
          />
          <CustomInput
            value={category}
            onChange={setCategory}
            label="Category"
            required
          />
          <span className={s.helper}>
            When you add a new expense, make sure the category name exactly
            matches the goal category
          </span>
          <Button onClick={addGoal} className={s.addBtn} variant="contained">
            Add goal
          </Button>
        </div>
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
                    <span className={s.goalCategory}>{goal.category}</span>
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
