import { RootState } from "@/app/store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Ticks,
} from "chart.js";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import TraficOverview from "./graphs/TraficOverview";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function TrafficOverviewGraph() {
  const trafficDetail = useSelector(
    (state: RootState) => state.performance.metrics?.history
  );
  // console.log("TrafficDetai",trafficDetail)

  const options = {
    // aspectRatio: 1,
    responsive: true,
    align: "end",
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true, // Use point style (circle) for legend labels
        },
      },
    },
  };

  const labels =
    trafficDetail?.traffic?.map((item) =>
      moment(item.createdAt).format("Do MMM,YY")
    ) ?? [];

  const data = {
    labels,
    datasets: [
      {
        label: "Organic",
        data: trafficDetail?.traffic.map((item) => item.organic),
        borderColor: "gray",
        backgroundColor: "gray",
        borderWidth: 1,
        tension: 0.4,
      },
      {
        label: "Referal",
        data: trafficDetail?.traffic?.map((item) => item.referrals),
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 1,
        tension: 0.4,
      },
      {
        label: "Search",
        data: trafficDetail?.traffic?.map((item) => item.search),
        borderColor: "blue",
        backgroundColor: "blue",
        borderWidth: 1,
        tension: 0.4,
      },
      {
        label: "Social",
        data: trafficDetail?.traffic?.map((item) => item.social),
        borderColor: "orange",
        backgroundColor: "orange",
        borderWidth: 1,
        tension: 0.4,
      },
      {
        label: "Paid",
        data: trafficDetail?.traffic?.map((item) => item.paid),
        borderColor: "green",
        backgroundColor: "green",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex flex-col h-full w-full ">
      <Line options={options} data={data} />
      {/* <button className="bg-blue-50 text-sm text-blue-700 py-2 px-4 rounded-md self-end  mt-10  hover:outline outline-offset-2 outline-slate-300">
        View Report
      </button> */}
    </div>
  );
}
