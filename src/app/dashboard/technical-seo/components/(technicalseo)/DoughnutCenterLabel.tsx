import { ChartData, ChartOptions } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as Chartjs,
  DoughnutController,
  ArcElement,
} from "chart.js/auto";
import { CrawledDetail } from "@/types/technicalseo/technicalSeoTypes";

Chartjs.register(DoughnutController, ArcElement);

interface DoughnutCenterLabelProps {
  //   dataset: string;
  CrawlDetaildata: CrawledDetail;
}
export default function DoughnutCenterLabel({
  CrawlDetaildata,
}: DoughnutCenterLabelProps) {
  const uncrawled =
    CrawlDetaildata.max_crawl_pages - CrawlDetaildata.pages_crawled;
  const crawledPercentage = (
    (CrawlDetaildata.pages_crawled / CrawlDetaildata.max_crawl_pages) *
    100
  ).toFixed(2);

  // Chart data
  const data: ChartData<"doughnut"> = {
    labels: ["Crawled", "Uncrawled"],
    datasets: [
      {
        data: [CrawlDetaildata.pages_crawled, uncrawled],
        backgroundColor: ["#4CAF50", "#D1FADF"], // Green and Red
        hoverBackgroundColor: ["#66BB6A", "#E57373"],
      },
    ],
  };

  // Chart options
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
        position: "top",
      },

      tooltip: {
        enabled: true,
      },
    },
    cutout: "70%",
  };

  // Custom plugin to display text in the center
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart: any) {
      const { width } = chart;
      const { ctx } = chart;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Line 1: Small font
      ctx.font = "12px Arial";
      ctx.fillStyle = "#000";
      const line1 = "Total Links Found";
      const centerX = width / 2;
      const centerY = chart.chartArea.height / 2 + chart.chartArea.top;
      ctx.fillText(line1, centerX, centerY - 10); // Adjust vertical position

      // Line 2: Bold font
      ctx.font = "bold 16px Arial";
      ctx.fillStyle = "#000";
      const line2 = `${CrawlDetaildata?.pages_crawled ?? 0}`;
      ctx.fillText(line2, centerX, centerY + 10); // Adjust vertical position

      ctx.restore();
    },
  };
  return (
    <div className="flex items-center justify-center ">
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}
