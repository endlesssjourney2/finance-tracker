import s from "./Goals.module.css";
import useGoals from "../../hooks/useGoals";
import { useAuth } from "../Auth/AuthContext";
import Header from "../../components/Header/Header";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";

const Goals = () => {
  const { user, loading: authLoading } = useAuth();

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

  const loading = authLoading || goalsLoading;

  if (loading) {
    return <LoadingProgress loading={loading} />;
  }

  return (
    <div className={s.goals}>
      <Header title="Goals page" />
      <div className={s.content}>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={addGoal}>Submit</button>
        <div>
          <ul>
            {goals.map((goal) => (
              <>
                <li key={goal.id}>
                  {goal.name}, {goal.goal}, {goal.category}
                </li>

                <button onClick={() => deleteGoal(goal.id)}>Delete</button>
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Goals;
