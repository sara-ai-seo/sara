import React from "react";

interface DualProgressBarProps {
  leftPercentage: string;
}

const DualProgressBar: React.FC<DualProgressBarProps> = ({
  leftPercentage,
}) => {
  const progressStyle = {
    width: leftPercentage,
  };

  return (
    <section className="flex items-center h-4 bg-red-500 w-full rounded-tr-3xl rounded-br-3xl">
      <div
        style={progressStyle}
        className="h-full bg-green-500 rounded-tl-3xl rounded-bl-3xl"
      ></div>
    </section>
  );
};

export default DualProgressBar;

interface HorizontalBarProps {
  indexable: number;
  no_indexable: number;
}

export const HorizontalBar: React.FC<HorizontalBarProps> = ({
  indexable,
  no_indexable,
}) => {
  // Calculate total and percentages
  // const total = indexable + no_indexable;
  // const indexablePercentage = (indexable / total) * 100;
  // const noIndexablePercentage = (no_indexable / total) * 100;

  return (
    <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden flex">
      <div
        className="bg-red-500 h-full"
        style={{
          width: `${no_indexable}%`,
          minWidth: no_indexable > 0 ? "1%" : "0%", // Ensures minimal width
        }}
      />

      <div
        className="bg-green-500 h-full"
        style={{
          width: `${indexable}%`,
          minWidth: indexable > 0 ? "1%" : "0%", // Ensures minimal width
        }}
      />
    </div>
  );
};

interface QuadProgressBarProps {
  metric1Percentage: string;
  metric2Percentage: string;
  metric3Percentage: string;
  metric4Percentage: string;
}

export const QuadProgressBar: React.FC<QuadProgressBarProps> = ({
  metric1Percentage,
  metric2Percentage,
  metric3Percentage,
  metric4Percentage,
}) => {
  const metric1Style = { width: metric1Percentage };
  const metric2Style = { width: metric2Percentage };
  const metric3Style = { width: metric3Percentage };
  const metric4Style = { width: metric4Percentage };

  return (
    <section className="flex items-center h-4 border w-full rounded-3xl">
      <div
        style={metric1Style}
        className="h-full bg-[#12B76A] rounded-l-3xl"
      ></div>
      <div style={metric2Style} className="h-full bg-[#2E90FA]"></div>
      <div style={metric3Style} className="h-full bg-[#D1E9FF]"></div>
      <div
        style={metric4Style}
        className="h-full bg-[#FEDF89] rounded-r-3xl"
      ></div>
    </section>
  );
};

interface ProgressBarChartProps {
  dataArray: number[];
}
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  LegendItem,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const ProgressBarChart = ({ dataArray }: ProgressBarChartProps) => {
  // console.log(dataArray);
  const ranges = [
    [0, 15],
    [16, 30],
    [31, 45],
    [46, 55],
    [56, 65],
    [66, 75],
    [76, 85],
    [86, 95],
  ];
  const result: number[] = [];
  const total = dataArray?.reduce((acc, val) => acc + val, 0);

  ranges.forEach(([start, end]) => {
    // Filter numbers in the current range
    const numbersInRange = dataArray.filter(
      (num) => num >= start && num <= end
    );
    // Find the highest number in this range
    if (numbersInRange.length > 0) {
      const maxNumber = Math.max(...numbersInRange);
      result.push(maxNumber);
    }
  });

  const labels = result.map((value) => {
    if (value <= 15) return "0-15 sec";
    else if (value <= 30) return "15-30 sec";
    else if (value <= 45) return "30-45 secs";
    else return "45+ secs";
  });
  console.log(labels);
  const colors = result.map((value) => {
    if (value <= 15) return "#28a745";
    else if (value <= 30) return "#007bff";
    else if (value <= 45) return "#cce5ff";
    else return "#f1c40f";
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Response Time",
        data: result,
        backgroundColor: colors,
        borderRadius: {
          topLeft: 10,
          bottomLeft: 10,
          topRight: 10,
          bottomRight: 10,
        },
        barPercentage: 0.1,
        categoryPercentage: 1.0,
      },
    ],
  };

  // Configuration options for horizontal stacked bar
  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          generateLabels: (chart: ChartJS<"bar">): LegendItem[] => {
            return (
              chart.data.labels?.map((label, index) => ({
                text: `${label} (${dataArray[index]})`,
                fillStyle: colors[index % colors.length],
                strokeStyle: colors[index % colors.length],
              })) || []
            );
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full overflow-auto">
      <Bar data={data} options={options} />
    </div>
  );
};
