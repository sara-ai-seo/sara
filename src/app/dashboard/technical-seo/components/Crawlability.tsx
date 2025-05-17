// import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { GoDotFill } from "react-icons/go";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Title } from "./Overview";
import { HorizontalBar } from "./(technicalseo)/DualProgressBar";
import BarChartSingle from "./(technicalseo)/BarChartSingle";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
// import { completeArray } from "../../components/graphs/StackedBarChart";
import { CrawledPagesComplete } from "../../components/SeoprogressCircle";
import moment from "moment";
import Loader from "@/app/component/Loader";
import {
  CrawlingData,
  CrawlingDataCrawlability,
} from "@/types/technicalseo/technicalSeoTypes";
import ReUsableHTTPStatusCode from "./(technicalseo)/ReusableHTTPStatusCode";
import { useTechnicalSeoFetchData } from "@/app/services/technicalSeo/TechnicalSeoFetch";
import ShowDescription from "@/app/component/ShowDescription";
import { NonIndexedPages } from "./(technicalseo)/NonIndexedPages";

export default function Crawlability() {
  const [Err, setErr] = useState({
    status: false,
    message: "",
  });


  function isCrawlabilityData(
    data: CrawlingData
  ): data is CrawlingDataCrawlability {
    return data.tab === "crawlabilityAndIndexibility";
  }

  const { data, isLoading } = useTechnicalSeoFetchData();


  const crawlbilityAndIndexibiltyResult: CrawlingDataCrawlability[] =
    data?.crawlings?.flatMap((crawling: any) =>
      crawling.crawlingData.filter(isCrawlabilityData)
    ) ?? [];


  const reasons = crawlbilityAndIndexibiltyResult[0]?.data?.reasons
  interface CrawlingsItem {
    crawler: {
      createdAt: string;
      pages?: number;
    };
  }

  interface CrawlingsData {
    crawlings: CrawlingsItem[];
  }
  const crawledPagesPerDate = useMemo(() => {
    return (data as CrawlingsData).crawlings.map((item: any) => ({
      date: item?.completedAt || "NA",
      pages: item?.crawlingData[1]?.data.crawled_detail?.pages_crawled || 0
    }));
  }, [data]);


  interface UrlItems {
    url: string;
    reason: string;
  }
  const craawl = crawlbilityAndIndexibiltyResult[0]?.data.items
  const reason = craawl.map((item) => item.reason);
  const url = craawl.map((item) => item);

  const groupedByReason = craawl.reduce((acc: Record<string, string[]>, item: UrlItems) => {
    const { url, reason } = item;
    acc[reason] = acc[reason] || [];
    acc[reason].push(url);
    return acc;
  }, {});



  const crawlLabels = crawledPagesPerDate.map(item => {
    return new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  });



  const crawled =
    crawlbilityAndIndexibiltyResult[0]?.data.crawled_detail.pages_crawled || 0;

  const indexable = crawlbilityAndIndexibiltyResult[0]?.data.indexable || 0;
  const non_indexable =
    crawlbilityAndIndexibiltyResult[0]?.data.non_indexible_count || 0;
  const total = crawlbilityAndIndexibiltyResult[0]?.data.total_page || 0;

  const sanitizedIndexable = Math.min(Math.max(0, indexable), total);
  const sanitizedNoIndexable = Math.min(
    Math.max(0, non_indexable),
    total - sanitizedIndexable
  );

  const indexablePercentage =
    total > 0 ? (sanitizedIndexable / total) * 100 : 0;
  const noIndexablePercentage =
    total > 0 ? (sanitizedNoIndexable / total) * 100 : 0;



  const statusCodeData = crawlbilityAndIndexibiltyResult[0]?.data.status_code;
  const CrawledDetail = crawlbilityAndIndexibiltyResult[0]?.data.crawled_detail;
  const TotalLinkFound = crawlbilityAndIndexibiltyResult[0]?.data.items;

  const nonIndexablePagesLabels = ["0", "20", "40", "60", "80", "100"];


  return isLoading ? (
    <div className=" w-full h-20 flex items-center justify-center mt-10">
      <Loader />
    </div>
  ) : (
    <main className="pb-14 mt-10 grid w-full gap-8">
      <section
        className={`grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 `}
      >
        <CrawledPagesComplete
          linkFound={TotalLinkFound}
          CrawlDetaildata={CrawledDetail}
        />

        <section className="w-full grid md:col-span-2 col-span-1 h-full  md:h-[348px] border rounded-md p-6">
          <div className="flex flex-col w-full">
            <h1
              className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}
            >
              Crawled pages
              <ShowDescription description="The number of pages that search engines have visited on your site." />
            </h1>
            <hr className="mt-2 w-full" />
          </div>
          <div className=" h-full w-full">
            <BarChartSingle
              labels={crawlLabels}
              data={crawledPagesPerDate.map(item => item.pages)}
              datasets={[
                {
                  label: "Crawled Pages",
                  data: crawledPagesPerDate.map(item => item.pages),
                  backgroundColor: "#53B1FD",
                },
              ]}
            />
          </div>
        </section>
      </section>
      <section
        className={`grid grid-cols-1 md:grid-cols-3 md:gap-4  md:space-y-0 space-y-4`}
      >
        <div className="grid p-2 md:p-4 col-span-1 h-full md:h-[348px] justify-items-start  rounded-md w-full border ">
          <Title
            title="Indexability"
            info={
              "Shows whether your pages can be added to search engine listings."
            }
          />
          <div className="grid w-full gap-4 justify-items-center  ">
            <p className="text-center font-semibold">
              Crawled pages: {crawled}{" "}
            </p>
            <div className="flex flex-col w-full gap-2">
              {/* <DualProgressBar
                leftPercentage={`${calculatePercentage(crawled, total)}px`}
              /> */}

              <HorizontalBar
                indexable={indexablePercentage}
                no_indexable={noIndexablePercentage}
              />

              {/* <DualProgressBar leftPercentage={`10px`} /> */}
              <div className="flex justify-between w-full items-center ">
                <p className="">{noIndexablePercentage.toFixed(2)}%</p>
                <p className="">{indexablePercentage.toFixed(2)}%</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-green-400">
                  <GoDotFill />{" "}
                </span>
                Indexable ({indexablePercentage})
              </p>
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-orange-400">
                  <GoDotFill />{" "}
                </span>{" "}
                Non indexable ({noIndexablePercentage})
              </p>
            </div>
          </div>
        </div>

        <section className="w-full grid col-span-2 h-full md:h-[348px] border rounded-md p-6">
          <Title
            title="Pages not indexed by search engines"
            info={
              "Pages that search engines haven’t added to their results."
            }
          />
          <div className=" h-full w-full ">
            <BarChartSingle
              labels={Object.keys(reasons || {})}
              data={Object.values(reasons || {})}
              datasets={[
                {
                  label: "Non-Indexable Pages",
                  data: nonIndexablePagesLabels,
                },
              ]}
              xAxisLabel="Blocked by"
            />
          </div>
        </section>
      </section>
      <section
        className={`grid grid-cols-1 md:grid-cols-3 md:gap-4 md:space-y-0 space-y-4`}
      >

        <div className="grid p-2 md:p-4 col-span-1 h-full md:h-[348px] justify-items-start  rounded-md w-full border ">
          <Title
            title="HTTP status codes"
            info={
              "Codes that explain how each page loaded (success, error, etc.)."
            }
          />
          <div className="grid w-full gap-4 justify-items-center ">
            <div className="p-4 flex min-[1440px]:flex-row md:flex-col sm:flex-row flex-col gap-2 h-fit -y-auto">
              <ReUsableHTTPStatusCode item={statusCodeData} />
            </div>
          </div>
        </div>
        <section className="w-full grid col-span-2 h-full md:h-[348px] border rounded-md p-6">
          <Title
            title="List of pages  not indexed by search engines"
            info={
              "Pages that search engines haven’t added to their results."
            }
          />
          <div className=" h-full w-full  overflow-auto">
            <NonIndexedPages data={craawl} />
          </div>
        </section>

      </section>
    </main>
  );
}
