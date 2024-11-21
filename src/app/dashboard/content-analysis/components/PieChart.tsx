import React from "react";
import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ChartData, ChartOptions, Legend } from "chart.js";
import { Tooltip } from "chart.js";
ChartJS.register(Tooltip, Legend);

interface PieChartProps {
  dataSet: any[];
}
export default function PieChart({ dataSet }: PieChartProps) {
  const total = dataSet.reduce((sum, item) => sum + item.percentage, 0);
  const data: ChartData<"pie"> = {
    labels: dataSet.map(
      (sentiment) =>
        `${sentiment.label} - (${((sentiment.percentage / total) * 100).toFixed(
          2
        )}%)`
    ),
    datasets: [
      {
        label: "Positive",
        data: dataSet.map(
          (sentiment) =>
            Math.round((sentiment.percentage / total) * 100 * 100) / 100 // Rounds to 2 decimal places
        ),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        // hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "right", // Position the legend on right
        labels: {
          usePointStyle: true, // Uses pointStyle for legend labels
          pointStyle: "circle", // Sets the legend symbol to circular
        },
      },
    },
    layout: {
      padding: {
        bottom: 0,
        top: 0,
      },
    },
  };
  return (
    <section className=" h-full w-full">
      <Pie data={data} options={options} />
    </section>
  );
}
