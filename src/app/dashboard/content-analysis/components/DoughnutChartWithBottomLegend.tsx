import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartWithBottomLegendProps {
  items: any[];
}

export default function DoughnutChartWithBottomLegend({
  items,
}: DoughnutChartWithBottomLegendProps) {
  const total = items.reduce((sum, item) => sum + item.percentage, 0);
  const dataStructure: ChartData<"doughnut"> = {
    labels: items.map(
      (sentiment) =>
        `${sentiment.label} - (${((sentiment.percentage / total) * 100).toFixed(
          2
        )}%)`
    ),
    datasets: [
      {
        label: "Sentiments",
        data: items.map(
          (sentiment) =>
            Math.round((sentiment.percentage / total) * 100 * 100) / 100 // Rounds to 2 decimal places
        ),
        backgroundColor: [
          "#194185",
          "#FECDCA",
          "#84CAFF",
          "#12B76A",
          "#A6F4C5",
          "#1570EF",
        ],
      },
    ],
  };

  const sentimentOption: ChartOptions<"doughnut"> = {
    responsive: true,
    aspectRatio: 1,
    offset: 2,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="h-fit ">
      <Doughnut data={dataStructure} options={sentimentOption} />
    </div>
  );
}
