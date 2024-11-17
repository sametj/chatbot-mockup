import { DataType } from "@/interfaces";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register components
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Chart = ({ data }: { data: DataType }) => {
  // Extract labels from the first key in the data (assuming the first key is labels)
  const labelKey = Object.keys(data)[0];
  const labels = Object.values(data[labelKey]) as string[];

  // Prepare datasets dynamically from the remaining keys
  const datasets = Object.keys(data)
    .slice(1)
    .map((key) => {
      const values = Object.values(data[key]) as number[];
      return {
        label: key.replace(/_/g, " "), // Format key names for display
        data: values,
        // backgroundColor: `rgba(${(index * 100) % 255}, ${(index * 150) % 255}, ${(index * 200) % 255}, 1)`,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      };
    });

  // Chart.js data configuration
  const chartData = {
    labels,
    datasets,
  };

  // Chart options for appearance and formatting
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            if (typeof tickValue === "number") {
              if (tickValue < 0) {
                return `<span style="color:red">(${Math.abs(tickValue).toLocaleString()})</span>`;
              } else if (tickValue < 1900 || tickValue > 2100) {
                return `$${tickValue.toLocaleString()}`;
              }
            }
            return tickValue;
          }, // Format as currency and negative numbers in parentheses
        },
      },
    },
  };

  return (
    <details className="collapse collapse-arrow bg-base-100 p-8">
      <summary className="collapse-title text-xl font-bold">
        Show Visual
      </summary>
      <Bar key={Date.now.toString()} data={chartData} options={options} />
    </details>
  );
};

export default Chart;
