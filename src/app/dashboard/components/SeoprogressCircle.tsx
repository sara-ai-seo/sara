import { RootState } from "@/app/store";
import { FC } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { Title } from "../technical-seo/components/Overview";
import { BiUpArrowAlt } from "react-icons/bi";
import {
  CrawledDetail,
  CrawlingData,
  CrawlingDataCrawlability,
  CrawlingDataOverview,
  OverviewDataType,
} from "@/types/technicalseo/technicalSeoTypes";
import { Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

const SEOProgressiveCircle: FC = () => {
  // const metrics = useSelector((state: RootState) => state.performance.metrics);
  const metrics = useSelector((state: RootState) => state.technicalSeo);
  const healthScore: Partial<OverviewDataType>[] = metrics?.crawlings?.flatMap(
    (crawling: any) =>
      crawling.crawlingData
        .filter((data: any) => data.tab === "overview")
        .map((overviewData: CrawlingDataOverview) => ({
          siteHealth: overviewData.data.site_health,
        }))
  );
  // const scores = metrics?.history?.scores[0]?.performance || null;

  // const averageSeo = scores && scores * 100;
  const averageSeo = healthScore && healthScore[0]?.siteHealth;

  return (
    <div className="z-0">
      {/* {JSON.stringify(healthScore[0].siteHealth)} */}
      <CircularProgressbarWithChildren
        value={averageSeo ?? 0}
        className=""
        styles={{
          path: {
            stroke:
              averageSeo && averageSeo < 40
                ? "#D92D20"
                : averageSeo && averageSeo > 40 && averageSeo < 70
                ? "#FDB022"
                : "#039855",
          },
        }}
      >
        <div className="flex flex-col">
          <p className="text-gray-600 text-center text-sm"> Health score</p>
          <p className="text-gray-900 text-center text-3xl lg:text-5xl">
            {" "}
            {averageSeo?.toFixed(0)}%{" "}
          </p>
          <p className="text-[#027A48] inline-flex items-center justify-center lg:mt-4 mt-2 gap-0.5 text-sm">
            <BiUpArrowAlt className="text-lg" />
            12
          </p>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default SEOProgressiveCircle;

export const CrawledPages: FC = () => {
  // const crawled = useSelector((state: RootState) => state.technicalSeo.metrics);
  const crawled = useSelector((state: RootState) => state.technicalSeo);

  const overviewResult: OverviewDataType[] = crawled.crawlings.flatMap(
    (crawling: any) =>
      crawling.crawlingData
        .filter((data: any) => data.tab === "overview")
        .map((overviewData: CrawlingDataOverview) => ({
          pagesCrawled: overviewData.data.crawl_status.pages_crawled,
          pagesInQueue: overviewData.data.crawl_status.pages_in_queue,
          maxCrawlPages: overviewData.data.crawl_status.max_crawl_pages,
        }))
  );

  // const scores = crawled?.crawled || null;
  const scores = overviewResult[0]?.pagesCrawled || 0;

  // const averageSeo = scores && scores.crawled;
  const averageSeo = scores && scores;
  // const total = crawled?.crawled?.total ?? 0;
  const total = overviewResult[0]?.maxCrawlPages ?? 0;

  return (
    <div className="rounded-full w-full h-fit flex items-center justify-center ">
      <div className="z-0">
        {/* <CircularProgressbarWithChildren value={averageSeo ?? 0} className='' styles={{
          path: { stroke: averageSeo && averageSeo < 40 ? "#D92D20" : averageSeo && averageSeo > 40 && averageSeo < 70 ? "#FDB022" : "#039855" }
        }} >
          <div className="flex flex-col">
            <p className='text-gray-600 text-center text-sm'>Total links found </p>
            <p className='text-gray-900 text-center text-5xl'> {total} </p>
          </div>
        </CircularProgressbarWithChildren> */}
        <CircularProgressbarWithChildren
          value={averageSeo ?? 0}
          className="lg:size-full size-[200px]"
          styles={{
            trail: {
              stroke: "#D1FADF",
            },
            path: {
              stroke: "#12B76A",
            },
          }}
        >
          <div className="flex flex-col">
            <p className="text-gray-600 text-center text-sm">
              Total links found{" "}
            </p>
            <p className="text-gray-900 text-center text-5xl"> {total} </p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

interface CrawledPagesCompleteProps {
  linkFound: {
    url: string;
    reason: string;
  }[];
  CrawlDetaildata: CrawledDetail;
}
export const CrawledPagesComplete: FC<CrawledPagesCompleteProps> = ({
  CrawlDetaildata,
  linkFound,
}) => {
  // function isCrawlabilityData(
  //   data: CrawlingData
  // ): data is CrawlingDataCrawlability {
  //   return data.tab === "crawlabilityAndIndexibility";
  // }
  const crawled = useSelector((state: RootState) => state.technicalSeo);
  // const overviewResult: OverviewDataType[] = crawled.crawlings.flatMap(
  //   (crawling: any) =>
  //     crawling.crawlingData
  //       .filter((data: any) => data.tab === "overview")
  //       .map((overviewData: CrawlingDataOverview) => ({
  //         pagesCrawled: overviewData.data.crawl_status.pages_crawled,
  //       }))
  // );

  // const crawlbilityAndIndexibiltyResult: CrawlingDataCrawlability[] =
  //   crawled.crawlings.flatMap((crawling) =>
  //     // Filter the crawlingData array for entries that belong to the 'crawlabilityAndIndexibility' tab
  //     crawling.crawlingData.filter(
  //       (data) => data.tab === "crawlabilityAndIndexibility"
  //     )
  //   );

  // const crawlbilityAndIndexibiltyResult: CrawlingDataCrawlability[] =
  //   crawled.crawlings.flatMap((crawling) =>
  //     crawling.crawlingData.filter(isCrawlabilityData)
  //   );

  // Calculate uncrawled pages and percentage
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
      const line2 = `${CrawlDetaildata.pages_crawled}`;
      ctx.fillText(line2, centerX, centerY + 10); // Adjust vertical position

      ctx.restore();
    },
  };

  return (
    <div className="grid p-2 md:p-4 col-span-1 h-full justify-items-start rounded-md w-full border ">
      <Title title={"Crawl status"} info="The status of the crawl result" />
      <div className="p-2 flex xl:flex-row flex-col w-full h-full  gap-3 xl:-mt-10">
        <div className=" rounded-full flex items-center justify-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
            <Doughnut
              data={data}
              options={options}
              plugins={[centerTextPlugin]}
            />
            {/* <CircularProgressbarWithChildren
              value={linkFound?.length ?? 0}
              className="w-full h-full aspect-w-1 aspect-h-1"
              styles={{
                trail: {
                  stroke: "#D1FADF",
                },
                path: {
                  stroke: "#12B76A",
                },
              }}
            >
              <div className="flex flex-col">
                <p className="text-gray-600 text-center text-sm">
                  Total links found{" "}
                </p>
                <p className="text-gray-900 text-center text-5xl">
                  {/* {crawled?.crawled?.total} */}
            {/* {linkFound?.length}
                </p>
              </div>
            </CircularProgressbarWithChildren>  */}
          </div>
        </div>

        <div className="flex h-full flex-col justify-end">
          <p className=" flex items-center text-xs text-[#475467]">
            {" "}
            <span className="text-green-300">
              <GoDotFill />
            </span>
            {/* {`Crawled(${crawled?.crawled.crawled})`} */}
            {`Crawled(${CrawlDetaildata?.pages_crawled ?? 0})`}
          </p>
          <p className=" flex items-center text-xs text-[#475467]">
            <span className="text-green-100">
              <GoDotFill />
            </span>{" "}
            {`Uncrawled(${CrawlDetaildata?.pages_in_queue ?? 0})`}
          </p>
        </div>
      </div>
    </div>
  );
};
