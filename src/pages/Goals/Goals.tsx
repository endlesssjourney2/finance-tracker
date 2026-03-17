import s from "./Goals.module.css";
import useGoals from "../../hooks/useGoals";
import { useAuth } from "../Auth/AuthContext";
import Header from "../../components/Header/Header";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { useExpenses } from "../../hooks/useExpenses";
import CustomInput from "../../components/CustomInput/CustomInput";
import { Button } from "@mui/material";
import { useMemo } from "react";
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
  } = useGoals(user);

  const spentByCategory = useMemo(() => {
    return expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount;
      return acc;
    }, {});
  }, [expenses]);

  const loading = authLoading || goalsLoading;

  if (loading) {
    return <LoadingProgress loading={loading} />;
  }

  return (
    <div className={s.goals}>
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
          <Button onClick={addGoal} className={s.addBtn} variant="contained">
            Add goal
          </Button>
        </div>
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
                        onClick={() => deleteGoal(goal.id)}
                        disabled={spent < goal.goal}
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
    </div>
  );
};

export default Goals;
