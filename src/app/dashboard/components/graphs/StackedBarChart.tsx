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
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  // maintainAspectRatio: false,
  align: "start",
  scales: {
    x: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false, // Remove grid lines for the x-axis
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false, // Remove grid lines for the y-axis
      },
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
    },
  },
  elements: {
    bar: {
      borderRadius: 10, // Set border radius for bars
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      align: "end" as const,
      labels: {
        usePointStyle: true,
      },
    },
  },
  barThickness: 30, // Set the width of each bar
};

export interface NewvsLostProps {
  label: string[];
  lostData: number[];
  newData: number[];
}

export function StackedBarChart({ label, lostData, newData }: NewvsLostProps) {
  const labels = [2, 3, 4];

  const data = {
    labels: label,
    datasets: [
      {
        label: "Lost",
        data: lostData,
        backgroundColor: "#F97066",
      },
      {
        label: "New",
        data: newData,
        backgroundColor: "#32D583",
      },
    ],
  };

  return (
    <span className="flex flex-col overflow-x-auto w-full h-full">
      <Bar options={options} data={data} />
      {/* <button className="bg-blue-50 text-sm text-blue-700 py-2 px-4 rounded-md self-end  mt-2  hover:outline outline-offset-2 outline-slate-300">
        View Report
      </button> */}
    </span>
  );
}
