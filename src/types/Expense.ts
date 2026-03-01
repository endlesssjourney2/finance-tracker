export type Expense = {
  id: string;
  amount: number;
  user_id: string;
  category: string;
  description: string;
  date: string;
};

export type ExpenseLike = Pick<Expense, "amount" | "date">;
