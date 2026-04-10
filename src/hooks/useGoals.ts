import { useEffect, useState } from "react";
import type { Goal } from "../types/Goal";
import { supabase } from "../supabaseClient";
import { useAuth } from "../pages/Auth/AuthContext";
import { useAlert } from "../context/AlertContext";

const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const { user } = useAuth();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!user) return;

    const fetchGoals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        return console.error("Error loading goals", error.message);
      } else {
        setGoals(data as Goal[]);
      }
      setLoading(false);
    };
    void fetchGoals();
  }, [user]);

  const addGoal = async (formData: {
    amount: string;
    name: string;
    category: string;
  }) => {
    if (!user) return false;

    if (!formData.amount || !formData.category || !formData.name) {
      showAlert("All fields are required.", { severity: "error" });
      return false;
    }

    const parsedAmount = Number(formData.amount);

    if (Number.isNaN(parsedAmount)) {
      showAlert("Please enter a valid amount.", { severity: "error" });
      return false;
    }

    const { data, error } = await supabase
      .from("goals")
      .insert([
        {
          user_id: user.id,
          goal: parsedAmount,
          name: formData.name,
          category: formData.category,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding goal:", error.message);
      showAlert("Error adding goal: " + error.message, { severity: "error" });
      return false;
    }
    showAlert("Goal added successfully!", { severity: "success" });
    setGoals((prev) => [data as Goal, ...prev]);

    return true;
  };

  const deleteGoal = async (id: string) => {
    if (!user) return;

    const { error } = await supabase.from("goals").delete().eq("id", id);
    if (error) {
      console.error("Error deleting goal:", error.message);
      showAlert("Error deleting goal: " + error.message, { severity: "error" });
      return;
    }
    showAlert("Goal deleted successfully!", { severity: "success" });
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const completeGoal = async (id: string) => {
    if (!user) return;

    const { error } = await supabase.from("goals").delete().eq("id", id);
    if (error) {
      console.error("Error completing goal:", error.message);
      showAlert("Error completing goal: " + error.message, {
        severity: "error",
      });
      return;
    }
    showAlert("Goal completed! Congratulations!", { severity: "success" });
    setAnimation(true);
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return {
    goals,
    loading,
    addGoal,
    deleteGoal,
    animation,
    completeGoal,
    setAnimation,
  };
};

export default useGoals;
