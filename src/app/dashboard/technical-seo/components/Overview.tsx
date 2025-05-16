import { RxQuestionMarkCircled } from "react-icons/rx";
// import { ReusableProgressiveCircle } from "./(technicalseo)/ReusableProgressiveCircle"
import SubHead from "./(technicalseo)/SubHead";
import PieChart from "./(technicalseo)/PieChart";
import { FaCircle } from "react-icons/fa6";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { GoDotFill } from "react-icons/go";
import PlainButton from "@/app/component/PlainButton";
import FilledButton from "@/app/component/FilledButton";
import { FiDownloadCloud } from "react-icons/fi";
import TableItems from "./(technicalseo)/TableItems";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { calculatePercentage } from "@/app/utils/PercentageCalculate";
import ActivityGuage from "./(technicalseo)/ActivityGuage";
import HTTPStatusCode from "./HTTPStatusCode";
// import { TechnicalSeoType } from "@/types/TechnicalSeoType";
import SiteHealthScore from "../../components/SiteHealthScore";
import { DoughnutSample } from "../../components/DoiughnutSample";
import {
  CrawledPages,
  CrawledPagesComplete,
} from "../../components/SeoprogressCircle";
import {
  CrawledDetail,
  CrawlingDataOverview,
  OverviewDataType,
} from "@/types/technicalseo/technicalSeoTypes";
import ReusableHTTPStatusCode from "./(technicalseo)/ReusableHTTPStatusCode";
import { useTechnicalSeoFetchData } from "@/app/services/technicalSeo/TechnicalSeoFetch";
import { ReusableCrawlStatus } from "./(technicalseo)/ReusableCrawlStatus";
import Loader from "@/app/component/Loader";
import { CSVLink, CSVDownload } from "react-csv";
import { forwardRef } from "react";
import { Doughnut } from "react-chartjs-2";
import DoughnutCenterLabel from "./(technicalseo)/DoughnutCenterLabel";
import ShowDescription from "@/app/component/ShowDescription";
// import { TechnicalSeoType } from "@/types/TechnicalSeoType";
// import { useEffect } from "react";
// import { removeTrailingSlash } from "@/app/utils/RemoveSlash";
// import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
// import { setLoading } from "@/redux/features/loaderSlice";
// import { setTechnicalSeo, fetchTechnicalSEOFailure } from "@/redux/features/technicalSeoSlice";
// import { useDispatch } from "react-redux";
// import { FetchTechnicalSeo } from "./FetchTechnicalSeo";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface ItemProps {
  title: string;
  data: ChartData;
  goodPages: number;
  needsImprovementPages: number;
  poorPages: number;
  info: string;
}

export const Title = ({
  title,
  info,
  className,
}: {
  title: string;
  info: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col w-full  h-fit">
      <h1
        className={`text-[#101828] gap-3 flex items-center font-semibold text-xl ${className}`}
      >
        {title}
        <button title={info}>
          {" "}
          <RxQuestionMarkCircled className="text-gray-400" />
        </button>
      </h1>
      <hr className="mt-2 w-full" />
    </div>
  );
};
export const TitleWithoutUnderline = ({
  title,
  info,
}: {
  title: string;
  info: string;
}) => {
  return (
    <div className="flex flex-col w-full">
      <h1
        className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}
      >
        {title}
        <button title={info}>
          {" "}
          <RxQuestionMarkCircled className="text-gray-400" />
        </button>
      </h1>
    </div>
  );
};
export const ButtonWithTitle = ({ info }: { info: string }) => {
  return (
    <div className="flex flex-col w-full">
      <h1
        className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}
      >
        <button title={info}>
          {" "}
          <RxQuestionMarkCircled />
        </button>
      </h1>
    </div>
  );
};
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

// export default forwardRef<HTMLDivElement>(Overview);
interface OverviewProps {
  onViewAllIssues: () => void;
}
export default function Overview({ onViewAllIssues }: OverviewProps) {
  const { data, isLoading } = useTechnicalSeoFetchData();
  // console.log("react query overview", data);
  const activeProperty = useSelector(
    (state: RootState) => state.property.activeProperty
  );

  const overviewResult: OverviewDataType[] =
  data?.crawlings?.flatMap((crawling: any) => {
    if (!crawling?.crawlingData) return [];

    return crawling.crawlingData
      .filter((data: any) => data?.tab === "overview" && data?.data)
      .map((overviewData: CrawlingDataOverview) => {
        const crawlStatus = overviewData?.data?.crawl_status ?? {};
        const siteIssues = overviewData?.data?.site_issues ?? {};
        const dataBlock = overviewData?.data ?? {};

        return {
          crawlId: overviewData.id,
          coreWebVital: dataBlock.core_web_vitals ?? null,
          cost: dataBlock.cost ?? null,
          siteHealth: dataBlock.site_health ?? null,
          Issues: dataBlock.issues ?? [],
          status_code: dataBlock.status_code ?? null,
          errorsCount: Array.isArray(siteIssues.errors) ? siteIssues.errors.length : 0,
          warningsCount: Array.isArray(siteIssues.warnings) ? siteIssues.warnings.length : 0,
          tasksCount: dataBlock.tasks_count ?? 0,
          pagesCrawled: crawlStatus.pages_crawled ?? 0,
          pagesInQueue: crawlStatus.pages_in_queue ?? 0,
          maxCrawlPages: crawlStatus.max_crawl_pages ?? 0,
          crawlProgress: dataBlock.crawl_progress ?? 0,
          timeToInteractive: dataBlock.time_to_interactive ?? null,
          cumulativeLayoutShift: dataBlock.cumulative_layout_shift ?? null,
          largestContentfulPaint: dataBlock.largest_contentful_paint ?? null,
          createdAt: overviewData.createdAt ?? null,
          updatedAt: overviewData.updatedAt ?? null,
        };
      });
  }) ?? [];

  console.log("OVERVIEW", overviewResult)

  // Safely access the first element in overviewResult
  const issues = overviewResult.length > 0 ? overviewResult[0]?.Issues : []; //null
  const site_health =
    overviewResult.length > 0 ? overviewResult[0]?.siteHealth : null;
  const LcpAnalysis =
    overviewResult.length > 0
      ? overviewResult[0]?.coreWebVital?.largest_contentful_paint
      : null;
  const CLSAnalysis =
    overviewResult.length > 0
      ? overviewResult[0]?.coreWebVital?.cumulative_layout_shift
      : null;

  const FirstInputDelay =
    overviewResult.length > 0
      ? overviewResult[0]?.coreWebVital?.first_input_delay
      : null;

  const CrawledDetails: CrawledDetail = {
    pages_crawled:
      overviewResult.length > 0 ? overviewResult[0]?.pagesCrawled : null!,
    pages_in_queue:
      overviewResult.length > 0 ? overviewResult[0]?.pagesInQueue : null!,
    max_crawl_pages:
      overviewResult.length > 0 ? overviewResult[0]?.maxCrawlPages : null!,
  };

  // console.log(overviewResult[0]);
  const LcpLabel = [
    String(LcpAnalysis?.poor),

    String(LcpAnalysis?.needs_improvement),
    String(LcpAnalysis?.good),
  ];
  const LCPdata: ItemProps["data"] = overviewResult
    ? {
        // labels: Object.keys(technicalSeoData.metrics?.lcp ?? {}),
        labels: LcpLabel,
        datasets: [
          {
            label: "Total",
            // data: Object.values(technicalSeoData.metrics?.lcp ?? {}),
            data: LcpLabel.map((lcp) => Number(lcp) || 0),
            backgroundColor: ["#F04438", "#FDB022", "#12B76A"],
            borderColor: ["#F04438", "#FDB022", "#12B76A"],
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const CLSLabel = [
    String(CLSAnalysis?.poor),

    String(CLSAnalysis?.needs_improvement),
    String(CLSAnalysis?.good),
  ];
  const CLSdata: ItemProps["data"] = CLSAnalysis
    ? {
        // labels: Object.keys(technicalSeoData.metrics?.cls ?? {}),
        labels: CLSLabel,
        datasets: [
          {
            label: "Total",
            // data: Object.values(technicalSeoData.metrics?.cls ?? {}),
            data: CLSLabel.map((cml) => Number(cml) || 0),
            backgroundColor: ["#F04438", "#FDB022", "#12B76A"],
            borderColor: ["#F04438", "#FDB022", "#12B76A"],
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const FirstInputDelayLabel = [
    String(FirstInputDelay?.poor),

    String(FirstInputDelay?.needs_improvement),
    String(FirstInputDelay?.good),
  ];
  const TBTdata: ItemProps["data"] = FirstInputDelayLabel
    ? {
        labels: FirstInputDelayLabel,
        datasets: [
          {
            label: "Total",
            data: FirstInputDelayLabel.map((cml) => Number(cml) || 0),
            backgroundColor: ["#F04438", "#FDB022", "#12B76A"],
            borderColor: ["#F04438", "#FDB022", "#12B76A"],
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const EachItem = ({
    title,
    info,
    data,
    poorPages,
    needsImprovementPages,
    goodPages,
  }: ItemProps) => {
    return (
      <section className="grid gap-3 md:gap-6 justify-center h-full">
        <h1
          className={`text-[#101828] flex text-sm font-semibold items-center gap-2`}
        >
          {title}
          <button title={info}>
            <RxQuestionMarkCircled className="text-gray-400" />
          </button>
        </h1>
        <div className="flex w-40">
          <PieChart data={data} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-red-500 text-xs" />
            <p className="text-sm font-normal"> {`Poor(${poorPages}) `} </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-yellow-500 text-xs" />
            <p className="text-sm font-normal">
              {" "}
              {`Needs Improvements(${needsImprovementPages}) `}{" "}
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-green-500 text-xs" />
            <p className="text-sm font-normal"> {`Good(${goodPages}) `} </p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      {isLoading ? (
        <div className=" w-full h-10 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <main className="pb-14 mt-10 grid w-full gap-8 z-0 ">
          <section
            className={`grid grid-cols-1 md:grid-cols-4 md:gap-4 md:space-y-0 space-y-4 w-full`}
          >
            <SiteHealthScore site_health={site_health!} />

            <section className="w-full h-full col-span-3 md:h-[464px] border rounded-md p-6">
              <SubHead
                title="Core web vitals"
                info="Key measurements that show your site’s speed, responsiveness, and visual stability."
              />
              <div className="grid w-full h-full items-center justify-between grid-col-1 lg:grid-cols-3 min-[540px]:grid-cols-2 py-6 overflow-y-auto">
                {/* <EachItem title="Largest Contentful Paint (LCP)" data={LCPdata} poorPages={technicalSeoData.metrics.lcp.poor} needsImprovementPages={technicalSeoData.lcp.needsImprovement} goodPages={technicalSeoData.lcp.good} info={"Largest Contentful Paint (LCP) is a user-centric performance metric that measures the perceived loading speed of a web page. It specifically focuses on the time it takes for the largest content element, such as an image or a block of text, to render on the user's screen"} /> */}
                <EachItem
                  title="Largest Contentful Paint (LCP)"
                  data={LCPdata}
                  poorPages={LcpAnalysis?.poor || 0}
                  needsImprovementPages={LcpAnalysis?.needs_improvement || 0}
                  goodPages={LcpAnalysis?.good || 0}
                  info={
                    "How long it takes for the largest piece of content on your page to load"
                  }
                />
                <EachItem
                  title="First  Input Delay (FID)"
                  data={TBTdata}
                  poorPages={FirstInputDelay?.poor || 0}
                  needsImprovementPages={
                    FirstInputDelay?.needs_improvement || 0
                  }
                  goodPages={FirstInputDelay?.good || 0}
                  info={
                    "The time it takes for your site to start responding when a user first clicks or taps."
                  }
                />
                <EachItem
                  title="Cumulative Layout Shift (CLS)"
                  data={CLSdata}
                  poorPages={CLSAnalysis?.poor || 0}
                  needsImprovementPages={CLSAnalysis?.needs_improvement || 0}
                  goodPages={CLSAnalysis?.good || 0}
                  info={
                    "Measures if elements on your page move around unexpectedly while loading."
                  }
                />
              </div>
            </section>
          </section>
          <section className="grid  gap-4 justify-items-stretch h-full w-full grid-cols-1 md:grid-cols-3  min-[540px]:grid-cols-2">
            <div className=" p-2 md:p-4 col-span-1 h-[308px] justify-items-start rounded-md w-full border">
              <Title
                title={"Crawl status"}
                info="The status of the crawl result, showing crawled and uncrawled"
                className="font-bold"
              />
              <div className="p-2 flex lg:flex-row flex-col w-full justify-between h-full">
                <div className="object-contain  h-56 w-56">
                  {/* <ReusableCrawlStatus
                    TotalLinkFound={overviewResult[0]?.maxCrawlPages}
                  /> */}

                  <DoughnutCenterLabel CrawlDetaildata={CrawledDetails} />
                </div>

                <div className="flex flex-col w-full mt-auto -translate-y-6">
                  <p className=" flex items-center text-xs text-[#475467]">
                    <span className="text-green-300">
                      <GoDotFill />{" "}
                    </span>
                    Crawled
                    <strong className="ml-0.5">
                      ({overviewResult[0]?.pagesCrawled ?? 0})
                    </strong>
                  </p>
                  <p className=" flex items-center text-xs text-[#475467]">
                    <span className="text-green-100">
                      <GoDotFill />
                    </span>
                    Uncrawled
                    <strong className="ml-0.5">
                      ({overviewResult[0]?.pagesInQueue ?? 0})
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            {/* <ReusableProgressiveCircle val={0} title={""} pageTitle={""} /> */}
            <div className="grid p-2 md:p-4 col-span-1 h-[308px] justify-items-start  rounded-md w-full border ">
              <Title
                title="HTTP status codes"
                info="Codes that tell you if a page loaded correctly (like 200 for success, 404 for not found)"
              />
              <div className="p-4 flex lg:flex-row flex-col gap-2 h-48 w-full">
                <ReusableHTTPStatusCode item={overviewResult[0]?.status_code} />
              </div>
            </div>
            <div className="grid p-2 md:p-4 col-span-1 h-[308px] justify-items-start rounded-md w-full border ">
              <Title
                title="Site issues"
                info="Any problems or errors detected on your website."
              />
              <div className="p-4 lg:flex-row flex-col gap-2 h-48  w-full ">
                <ActivityGuage
                  errorCount={overviewResult[0]?.errorsCount}
                  warningCount={overviewResult[0]?.warningsCount}
                />
                <div className="flex flex-col items-end justify-end w-full">
                  <p className=" text-xs flex items-center text-[#475467]">
                    {" "}
                    <span className="text-[#F04438]">
                      <GoDotFill />{" "}
                    </span>{" "}
                    {/* {`Errors(${technicalSeoData.metrics?.siteIssue?.error || 0} )`}{" "} */}
                    {`Errors(${overviewResult[0]?.errorsCount || 0} )`}{" "}
                  </p>
                  <p className=" text-xs flex items-center text-[#475467]">
                    {" "}
                    <span className="text-[#FDB022]">
                      <GoDotFill />{" "}
                    </span>{" "}
                    {/* {`Warnings(${
             technicalSeoData.metrics?.siteIssue?.warning || 0
           })`}{" "} */}
                    {`Warnings(${overviewResult[0]?.warningsCount || 0})`}{" "}
                  </p>
                  <p className=" text-xs flex items-center text-[#475467]">
                    {" "}
                    <span className="text-[#175CD3]">
                      <GoDotFill />{" "}
                    </span>{" "}
                    {/* {`Notices(${
             technicalSeoData.metrics?.siteIssue?.notices || 0
           })`}{" "} */}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="grid border rounded-md lg:max-w-[75%] w-auto">
            <div className=" flex items-center justify-between">
              <div className="flex min-[500px]:flex-row flex-col w-full gap-2 p-2 md:p-4 min-[500px]:items-center justify-between">
                <h1
                  className={`text-[#101828] gap-3 flex items-center font-semibold sm:text-lg`}
                >
                  Top issues
                  <ShowDescription description="The most critical problems that need to be fixed first." />
                </h1>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex">
                    <PlainButton
                      className="min-[500px]:text-sm text-xs"
                      title="View all issues"
                      handleClick={() => onViewAllIssues()}
                    />
                  </div>
                  <div className="flex ">
                    <CSVLink data={issues} filename={"techniseo issues"}>
                      <FilledButton
                        className="min-[500px]:text-sm text-xs"
                        icon={<FiDownloadCloud />}
                        title="Export issues"
                      />
                    </CSVLink>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="overflow-x-auto ">
              <table className="table-auto w-full border-collapse">
                <thead className="p-4">
                  <tr className="bg-[#EAECF0] p-4 font-medium text-start">
                    <th className="border w-[390px] text-xs text-[#475467] text-start border-[#c0c2c5] p-2">
                      {/* Issues */}
                      Title
                    </th>
                    <th className="border w-[390px] text-xs text-[#475467] text-start border-[#c0c2c5] p-2">
                      {/* Issues */}
                      Description
                    </th>
                    <th className="border text-xs flex-1 text-[#475467] text-start border-[#c0c2c5] p-2">
                      {/* Affected Pages */}
                      Id
                    </th>
                    <th className="border text-xs flex-1 text-[#475467] text-start border-[#c0c2c5] p-2 whitespace-nowrap">
                      {/* Fixed */}
                      score Display Mode
                    </th>
                    <th className="border text-xs flex-1 text-[#475467] text-start border-[#c0c2c5] p-2">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issues &&
                    issues.slice(0,5).map((issue) => {
                      return (
                        <tr className=" p-2 font-medium" key={issue.title}>
                          <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5] ">
                            <TableItems
                              title={issue.title}
                              // src={
                              //   issue.issue_category == "Error"
                              //     ? "/dashboard/error.svg"
                              //     : issue.issue_category == "Warning"
                              //     ? "/dashboard/warning.png"
                              //     : issue.issue_category == "Notice"
                              //     ? "/dashboard/notices.svg"
                              //     : "/dashboard/warning.svg"
                              // }
                              description={issue.description}
                              // fix={issue.fix}
                            />
                          </td>
                          <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">
                            {issue.description}{" "}
                          </td>
                          <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">
                            {issue.id}{" "}
                          </td>

                          <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">
                            {issue.scoreDisplayMode}{" "}
                          </td>
                          <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">
                            {issue.score}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
