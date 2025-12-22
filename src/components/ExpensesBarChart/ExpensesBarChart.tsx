import { useMemo, type FC } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { monthTickCallback } from "../../helpers/chartTicks";
import { Bar } from "react-chartjs-2";
import { COLORS } from "../../constants/Colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

type ExpensesBarChartProps = {
  months: string[];
  values: number[];
};

const ExpensesBarChart: FC<ExpensesBarChartProps> = ({ months, values }) => {
  const data = useMemo(
    () => ({
      labels: months,
      datasets: [
        {
          label: "Expenses (last 6 months)",
          data: values,
          backgroundColor: COLORS,
          borderColor: COLORS,
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    }),
    [months, values]
  );

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: monthTickCallback("en-US"),
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div style={{ minWidth: "600px", maxWidth: "1200px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpensesBarChart;
