import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { useMemo, type FC } from "react";
import { Line } from "react-chartjs-2";
import { monthTickCallback } from "../../helpers/chartTicks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

type ExpensesLineChartProps = {
  months: string[];
  values: number[];
};

const ExpensesLineChart: FC<ExpensesLineChartProps> = ({ months, values }) => {
  const data = useMemo(
    () => ({
      labels: months,
      datasets: [
        {
          label: "Total Expenses",
          data: values,
          borderColor: "#ffffff",
          backgroundColor: "#000000",
          tension: 0.2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    }),
    [months, values]
  );

  const options: ChartOptions<"line"> = {
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
      <Line data={data} options={options} />
    </div>
  );
};

export default ExpensesLineChart;
