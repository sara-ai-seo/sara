import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  labels: string[];
  data: number[] | string[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  backgroundColor?: string;
}

const BarChartSingle: React.FC<Props> = ({
  labels,
  data,
  title = "Chart.js Bar Chart",
  xAxisLabel = "Crawl date",
  yAxisLabel = "Number of pages",
  backgroundColor,
}) => {
  const options = {
    responsive: true,
    barThickness: 30,
    scales: {
      x: {
        barPercentage: 0.01,
        categoryPercentage: 1.0,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        text: title,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data,
        backgroundColor,
        borderRadius: 10,
        barPercentage: 1.0,
        width: 100,
      },
    ],
  };

  return (
    <div className="h-full w-full">
      <Bar options={options} data={chartData} width={"150%"} height={"60%"} />
    </div>
  );
};

export default BarChartSingle;

interface Dataset {
  label: string;
  data: number[] | string[];
  backgroundColor?: string;
}

interface Props {
  labels: string[];
  datasets: Dataset[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export const BarChartDouble: React.FC<Props> = ({
  labels,
  datasets,
  title = "Chart.js Bar Chart",
  xAxisLabel = "Crawl date",
  yAxisLabel = "Number of pages",
}) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        display: true, // Show legend since we have multiple datasets
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const chartData = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      borderRadius: 10,
      barPercentage: 0.8, // Adjust bar width
      categoryPercentage: 0.9, // Adjust space between categories
    })),
  };

  return (
    <div className="h-full w-full">
      <Bar options={options} data={chartData} width={"150%"} height={"60%"} />
    </div>
  );
};
