import { type FC, useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  type ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { COLORS } from "../../constants/Colors";
import s from "./ChartsComponents.module.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type ExpensesPieChartProps = {
  labels: string[];
  values: number[];
};

const ExpensesPieChart: FC<ExpensesPieChartProps> = ({ labels, values }) => {
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Expenses",
          data: values,
          backgroundColor: COLORS,
          borderWidth: 1,
        },
      ],
    }),
    [labels, values],
  );

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed}`,
        },
      },
    },
  };

  return (
    <div className={s.chart}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpensesPieChart;
