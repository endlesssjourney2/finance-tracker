export type Expense = {
  id: string;
  amount: number;
  user_id: string;
  category: string;
  description: string | null;
  date: string;
};

export type ExpenseLike = Pick<Expense, "amount" | "date">;
