import { useEffect, useState } from "react";
import type { Goal } from "../types/Goal";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

const useGoals = (user: User | null) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

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

  const addGoal = async () => {
    if (!user) return;

    if (!amount || !category || !name) return;

    let parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount)) {
      return;
    }

    const { data, error } = await supabase
      .from("goals")
      .insert([
        {
          user_id: user.id,
          goal: parsedAmount,
          name,
          category,
        },
      ])
      .select()
      .single();

    if (error) {
      return console.error("Error adding goals");
    }

    setGoals((prev) => [data as Goal, ...prev]);
    setAmount("");
    setName("");
    setCategory("");
  };

  const deleteGoal = async (id: string) => {
    if (!user) return;

    const { error } = await supabase.from("goals").delete().eq("id", id);
    if (error) {
      console.error("Error deleting goal", error.message);
    }
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return {
    goals,
    loading,
    addGoal,
    deleteGoal,
    amount,
    setAmount,
    category,
    setCategory,
    name,
    setName,
  };
};

export default useGoals;
