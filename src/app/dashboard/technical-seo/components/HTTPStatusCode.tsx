import { RootState } from "@/app/store";
import {
  CrawlingData,
  CrawlingDataCrawlability,
} from "@/types/technicalseo/technicalSeoTypes";
import { TechnicalSeoType } from "@/types/TechnicalSeoType";
import { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

export default function HTTPStatusCode() {
  // Type guard to check if a CrawlingData is of type CrawlingDataCrawlability
  function isCrawlabilityData(
    data: CrawlingData
  ): data is CrawlingDataCrawlability {
    return data.tab === "crawlabilityAndIndexibility";
  }
  type StatusCodeKey = "4xx" | "5xx" | "is_broken" | "is_redirect";
  const techSeoData = useSelector((state: RootState) => state.technicalSeo);

  // Loop through the crawlings array
  const crawlbilityAndIndexibiltyResult: CrawlingDataCrawlability[] =
    techSeoData.crawlings.flatMap((crawling) =>
      crawling.crawlingData.filter(isCrawlabilityData)
    );

  // Check if statusCodeData is defined before using it
  if (!crawlbilityAndIndexibiltyResult[0]?.data.status_code) {
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

  const statusData = crawlbilityAndIndexibiltyResult[0].data.status_code;

  // Create the formatted labels by iterating over each key-value pair in the statusData object:
  const labelsWithCounts = Object.entries(statusData).map(([key, value]) => {
    // Use the description from the `statusCodeDescriptions` object, or fall back to the key itself if no description is available
    const description = `${
      statusCodeDescriptions[key as StatusCodeKey]
    } -${key} `;

    return `${description}(${value})`;
  });

  const data = {
    labels: labelsWithCounts,
    datasets: [
      {
        data: Object.values(
          crawlbilityAndIndexibiltyResult[0].data.status_code
        ),
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
