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
    // cutout: 80,
  };
  const statusCodeDescriptions = {
    "4xx": "Client Error",
    "5xx": "Server Error",
    is_broken: "Broken Links",
    is_redirect: "Redirects",
  };

  const statusData = item;

  // const labelsWithCounts = Object.entries(statusData).map(([key, value]) => {

  //   const description = `${
  //     statusCodeDescriptions[key as StatusCodeKey]
  //   } - ${key}`;

  //   return `${description}(${value})`;
  //   // return <span className="text-xs">`${description}(${value})` </span>;
  // });
  const labelsWithCounts = Object.entries(statusData).map(([key, value]) => {
  const description = `${statusCodeDescriptions[key as StatusCodeKey]} - ${key}`;
  
  // Split at "-" and take the second part (trim whitespace)
  const secondPart = description.split("-")[1].trim();
  
  // Append count in parentheses
  return `${secondPart} (${value})`;
});

  const allValuesZero = Object.values(statusData).every((value) => value === 0);
  // const allValuesZero = Object.values([23,3,4,5,4]).every((value) => value === 0);

  const data = {
    labels: labelsWithCounts,
    datasets: [
      {
        data: allValuesZero ? [1] : Object.values(statusData),
        // data: [23,4,54,3,2],
        backgroundColor: allValuesZero ? ["#EED"]: [
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
