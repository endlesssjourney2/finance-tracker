import s from "./Goals.module.css";
import useGoals from "../../hooks/useGoals";
import Header from "../../components/Header/Header";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { useMemo } from "react";
import SkeletonGoals from "../../components/Skeleton/SkeletonGoals/SkeletonGoals";
import Confetti from "react-confetti";
import useExpensesWithGoals from "../../hooks/useExpensesWithGoals";
import AddGoalForm from "../../components/Form/AddGoalForm/AddGoalForm";
import GoalsList from "../../components/GoalsList/GoalsList";
import GoalsInfo from "./components/GoalsInfo/GoalsInfo";

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
      <div className={s.goalsPage}>
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
          <GoalsInfo totalGoals={totalGoals} completedGoals={completedGoals} />
        )}
        <GoalsList
          goals={goals}
          spentByCategory={spentByCategory}
          deleteGoal={deleteGoal}
          completeGoal={completeGoal}
          animation={animation}
        />
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
