import type { ChartType } from "../../types/ChartType";
import { Link } from "react-router-dom";
import ExpensesPieChart from "../ExpensesPieChart/ExpensesPieChart";
import s from "./DashboardChartContent.module.css";
import ExpensesLineChart from "../ExpensesLineChart/ExpensesLineChart";
import ExpensesBarChart from "../ExpensesBarChart/ExpensesBarChart";

type DashboardChartContentProps = {
  user: unknown | null;
  selectedChart: ChartType;
  pieLabels: string[];
  pieValues: number[];
  monthLabels: string[];
  monthValues: number[];
  sixMonthsLabels: string[];
  sixMonthsValues: number[];
};

export const DashboardChartContent = ({
  user,
  selectedChart,
  pieLabels,
  pieValues,
  monthLabels,
  monthValues,
  sixMonthsLabels,
  sixMonthsValues,
}: DashboardChartContentProps) => {
  if (!user) {
    return (
      <div className={s.notLoggedIn}>
        <h2 className={s.notLoggedInText}>
          <Link className={s.link} to={"/login"}>
            Log in
          </Link>{" "}
          to view your dashboard
        </h2>
      </div>
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

    case "byLast6Months":
      return (
        <div className={s.chartContainer}>
          <h2 className={s.chartTitle}>Expenses (last 6 months)</h2>
          <ExpensesBarChart months={sixMonthsLabels} values={sixMonthsValues} />
        </div>
      );

    default:
      return null;
  }
};
