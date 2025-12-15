import type { ChartType } from "../../types/ChartType";
import { Link } from "react-router-dom";
import ExpensesPieChart from "../ExpensesPieChart/ExpensesPieChart";
import s from "./DashboardChartContent.module.css";
import ExpensesLineChart from "../ExpensesLineChart/ExpensesLineChart";

type DashboardChartContentProps = {
  user: unknown | null;
  selectedChart: ChartType;
  pieLabels: string[];
  pieValues: number[];
  monthLabels: string[];
  monthValues: number[];
};

export const DashboardChartContent = ({
  user,
  selectedChart,
  pieLabels,
  pieValues,
  monthLabels,
  monthValues,
}: DashboardChartContentProps) => {
  if (!user) {
    return (
      <p>
        Please log in to view your dashboard. <Link to={"/login"}>Log in</Link>
      </p>
    );
  }

  switch (selectedChart) {
    case "byCategory":
      return (
        <div className={s.chartContainer}>
          <h2 className={s.chartTitle}>Expenses by category (last month)</h2>
          <ExpensesPieChart labels={pieLabels} values={pieValues} />
        </div>
      );

    case "byMonths":
      return (
        <div className={s.chartContainer}>
          <h2 className={s.chartTitle}>Expenses by months (total)</h2>
          <ExpensesLineChart months={monthLabels} values={monthValues} />
        </div>
      );

    case "feature1":
      return <h2>Feature</h2>;

    default:
      return null;
  }
};
