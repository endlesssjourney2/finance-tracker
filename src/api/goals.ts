import { supabase } from "../supabaseClient";

export const getGoals = async (user_id: string) => {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching goals:", error.message);
    return [null, error];
  }
  return [data, null];
};

export const addGoalApi = async (
  user_id: string,
  goal: number,
  name: string,
  category: string,
) => {
  const { data, error } = await supabase
    .from("goals")
    .insert([
      {
        user_id: user_id,
        goal: goal,
        name: name,
        category: category,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error during adding goal:", error.message);
    return [null, error];
  }
  return [data, null];
};

export const deleteGoalApi = async (id: string) => {
  const { error } = await supabase.from("goals").delete().eq("id", id);
  if (error) {
    console.error("Error deleting goal:", error.message);
    return error;
  }
  return null;
};
