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
import { useMemo, type FC } from "react";
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
          label: "Total Expenses",
          data: values,
          backgroundColor: COLORS,
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
      title: {
        display: true,
        text: "Total Expenses Over Months",
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ minWidth: "600px", maxWidth: "800px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpensesBarChart;
