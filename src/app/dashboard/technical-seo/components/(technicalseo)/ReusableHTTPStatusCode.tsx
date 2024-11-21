import { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface StatusCode {
  "4xx": number;
  "5xx": number;
  is_broken: number;
  is_redirect: number;
}
interface OverviewHTTPStatusCodeProps {
  item: StatusCode;
}
export default function ReUsableHTTPStatusCode({
  item,
}: OverviewHTTPStatusCodeProps) {
  type StatusCodeKey = "4xx" | "5xx" | "is_broken" | "is_redirect";

  // Check if statusCodeData is defined before using it
  if (!item) {
    return <div>No data available</div>;
  }

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    cutout: 80,
  };
  const statusCodeDescriptions = {
    "4xx": "Client Error",
    "5xx": "Server Error",
    is_broken: "Broken Links",
    is_redirect: "Redirects",
  };

  const statusData = item;

  // Create the formatted labels by iterating over each key-value pair in the statusData object:
  const labelsWithCounts = Object.entries(statusData).map(([key, value]) => {
    // Use the description from the `statusCodeDescriptions` object, or fall back to the key itself if no description is available
    const description = `${
      statusCodeDescriptions[key as StatusCodeKey]
    } - ${key}`;

    return `${description}(${value})`;
  });

  const data = {
    labels: labelsWithCounts,
    datasets: [
      {
        data: Object.values(statusData),
        backgroundColor: [
          "#A6F4C5",
          "#12B76A",
          "#FDB022",
          "#F04438",
          "#FECDCA",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className=" w-full">
      <Doughnut data={data} options={options} />
    </div>
  );
}
