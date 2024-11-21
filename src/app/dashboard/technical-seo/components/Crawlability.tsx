// import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { GoDotFill } from "react-icons/go";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Title } from "./Overview";
import { HorizontalBar } from "./(technicalseo)/DualProgressBar";
import BarChartSingle from "./(technicalseo)/BarChartSingle";
import { useEffect, useState } from "react";
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

export default function Crawlability() {
  const [Err, setErr] = useState({
    status: false,
    message: "",
  });

  // Type guard to check if a CrawlingData is of type CrawlingDataCrawlability
  function isCrawlabilityData(
    data: CrawlingData
  ): data is CrawlingDataCrawlability {
    return data.tab === "crawlabilityAndIndexibility";
  }
  // const techSeo = useSelector((state: RootState) => state.technicalSeo);
  const { data, isLoading } = useTechnicalSeoFetchData();

  // const overviewResult: OverviewDataType[] = techSeo.crawlings.flatMap(
  //   (crawling: any) =>
  //     crawling.crawlingData
  //       .filter((data: any) => data.tab === "overview")
  //       .map((overviewData: CrawlingDataOverview) => ({
  //         pagesCrawled: overviewData.data.crawl_status.pages_crawled,
  //         pagesInQueue: overviewData.data.crawl_status.pages_in_queue,
  //         maxCrawlPages: overviewData.data.crawl_status.max_crawl_pages,
  //       }))
  // );

  // Loop through the crawlings array
  const crawlbilityAndIndexibiltyResult: CrawlingDataCrawlability[] =
    data?.crawlings?.flatMap((crawling: any) =>
      crawling.crawlingData.filter(isCrawlabilityData)
    ) ?? [];

  // console.log("crawl", crawlbilityAndIndexibiltyResult[0]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await ApiCall.get("/crawl/technical-seo", {
  //         params: {
  //           limit: 100,
  //           platform: "desktop",
  //           url: removeTrailingSlash(activeProperty),
  //           page: "crawlability",
  //         },
  //       });
  //       setCrawlabilityData(response.data);
  //       // console.log(response.data);
  //     } catch (error: any) {
  //       setErr({
  //         status: true,
  //         message: error.message,
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [activeProperty]);

  const crawled =
    crawlbilityAndIndexibiltyResult[0]?.data.crawled_detail.pages_crawled || 0;
  const uncrawled =
    crawlbilityAndIndexibiltyResult[0]?.data.crawled_detail.pages_in_queue || 0;

  const indexable = crawlbilityAndIndexibiltyResult[0]?.data.indexable || 0;
  const non_indexable =
    crawlbilityAndIndexibiltyResult[0]?.data.non_indexible_count || 0;

  const total = crawlbilityAndIndexibiltyResult[0]?.data.total_page || 0;
  const statusCodeData = crawlbilityAndIndexibiltyResult[0]?.data.status_code;
  const CrawledDetail = crawlbilityAndIndexibiltyResult[0]?.data.crawled_detail;
  const TotalLinkFound = crawlbilityAndIndexibiltyResult[0]?.data.items;

  const crawledvalue = (crawled / total) * 100;

  const startDate = new Date();

  const labels = Array.from(
    { length: crawlbilityAndIndexibiltyResult[0]?.data.total_page },
    (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i); // Increment the date by 'i' days
      return moment(date).format("DD MMM YY");
    }
  );

  const mockData =
    Array.from(
      { length: crawlbilityAndIndexibiltyResult[0]?.data.total_page },
      (_, i) => i + 1
    ) || [];

  const crawldepthlabels1 = ["1", "2", "3", "4+"];
  const crawldepthlabels = crawldepthlabels1;
  // console.log(crawldepthlabels);
  const crawldepthLabelData: any[] = [];

  // const indexibilitData1 = crawlabilityData?.indexability?.unindexableReasons;
  const indexibilitData1 = "";
  const categories = Object.keys(indexibilitData1 || []);
  const categoriesNumber = Object.values(indexibilitData1 || []);

  return isLoading ? (
    <div className=" w-full h-20 flex items-center justify-center mt-10">
      <Loader />
    </div>
  ) : (
    <main className="pb-14 mt-10 grid w-full gap-8">
      <section
        className={`grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 `}
      >
        {/* <div className="grid p-2 md:p-4 col-span-1 h-[348px] justify-items-start  rounded-md w-full border ">

          <Title title={"Crawl status"} info="The status of the crawl result" />
          <div className="p-2 flex w-full ">
            <div className=" rounded-full h-48 w-48 flex items-center justify-center">
              <div className="relative">
                <CircularProgressbarWithChildren
                  value={crawledvalue}
                  className="h-full w-full"
                  
                  styles={{
                    path: {
                      stroke: '#86EFAB',
                      strokeLinecap: "round",
                      transform: "rotate(-90deg)",
                      transition: "stroke-dashoffset 0.5s ease 0s",
                     
                    },
                    trail: {
                      stroke: "#d6d6d6",
                      strokeLinecap: "round",
                    },
                  }}
                >
                  <div className="flex flex-col">
                    <p className="text-gray-600 text-center text-sm">Total links found</p>
                    <p className="text-gray-900 text-center text-5xl">{Number(total).toLocaleString()}</p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>


            <div className="flex h-full flex-col justify-end">
              <p className=' flex items-center text-xs text-[#475467]'> <span className="text-green-300"><GoDotFill />  </span> {`Crwaled(${crawled})`} </p>
              <p className=' flex items-center text-xs text-[#475467]'> <span className="text-green-100"><GoDotFill /></span> {`Uncrawled(${uncrawled})`} </p>
            </div>
          </div>
        </div> */}
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
              <RxQuestionMarkCircled />
            </h1>
            <hr className="mt-2 w-full" />
          </div>
          <div className=" h-full w-full ">
            {/* <Suspense fallback={<h3> Loading...</h3>}> */}
            <BarChartSingle
              labels={labels}
              data={mockData}
              backgroundColor="#53B1FD"
            />
            {/* </Suspense> */}
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
              "This is the ability of a page to be added to google crawl engine"
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
                indexable={indexable}
                no_indexable={non_indexable}
              />

              {/* <DualProgressBar leftPercentage={`10px`} /> */}
              <div className="flex justify-between w-full items-center">
                <p className="">
                  {/* {" "}
                  {calculatePercentage(crawled, total).toFixed(2)}%{" "} */}
                  {indexable}%
                </p>
                <p className="">
                  {" "}
                  {/* {calculatePercentage(uncrawled, total).toFixed(2)}%{" "} */}
                  {non_indexable}%
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-green-400">
                  <GoDotFill />{" "}
                </span>
                Indexable ({indexable})
              </p>
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-orange-400">
                  <GoDotFill />{" "}
                </span>{" "}
                Non indexable ({non_indexable})
              </p>
            </div>
          </div>
        </div>

        <section className="w-full grid col-span-2 h-full  md:h-[348px] border rounded-md p-6">
          <Title
            title="Pages not indexed by search engines"
            info={
              "These are pages for one reason or the other that google cannot search at the moment"
            }
          />
          <div className=" h-full w-full ">
            <BarChartSingle
              labels={categories}
              data={categoriesNumber}
              backgroundColor="red"
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
              "HTTP status code is the informative response from the server based on requests on your website"
            }
          />
          <div className="grid w-full gap-4 justify-items-center ">
            <div className="p-4 flex min-[1440px]:flex-row md:flex-col sm:flex-row flex-col gap-2 h-fit -y-auto">
              {/* <HTTPStatusCode /> */}
              <ReUsableHTTPStatusCode item={statusCodeData} />
            </div>
          </div>
        </div>

        <div className="w-full grid col-span-2 h-full  md:h-[348px] border rounded-md p-6">
          <Title
            title="Page crawl depth"
            info={
              "This is the number of steps of pages crossed to reach the crawled pages"
            }
          />
          <div className=" h-full w-full">
            <BarChartSingle
              labels={crawldepthlabels}
              data={crawldepthLabelData}
              backgroundColor="#53B1FD"
              xAxisLabel="Number of clicks"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
