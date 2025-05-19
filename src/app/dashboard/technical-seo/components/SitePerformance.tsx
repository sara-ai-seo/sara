import { RxQuestionMarkCircled } from "react-icons/rx";
import Card from "../../Card";
import { BarChartDouble } from "./(technicalseo)/BarChartSingle";
import {
  ProgressBarChart,
} from "./(technicalseo)/DualProgressBar";

import Loader from "@/app/component/Loader";
import { useTechnicalSeoDataByTab, useTechnicalSeoFetchData } from "@/app/services/technicalSeo/TechnicalSeoFetch";
import {
  CrawlingData,
  SitePerformanceData,
} from "@/types/technicalseo/technicalSeoTypes";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { sitePerformanceIssueColumns } from "../column/sitePerformanceIssueColumn";
import ShowDescription from "@/app/component/ShowDescription";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function SitePerformance() {
  const [isPerformanceIssue, setIsPerformanceIssue] = useState(false);

  function isSitePerformanceData(
    data: CrawlingData
  ): data is SitePerformanceData {
    return data.tab === "sitePerformance";
  }
  

  // const pageMetrics = useQuery(({
  //   queryKey: ['page_metrics', ]
  // }))

    const activePropertyObj = useSelector(
      (state: RootState) => state.property.activePropertyObj
    );

  const pageMetrics = useTechnicalSeoDataByTab({ tab: "pageMetrics", id: activePropertyObj.id });
  


  const { data, isLoading } = useTechnicalSeoFetchData(activePropertyObj.id);
  const sitePerformanceData: SitePerformanceData[] =
    data?.crawlings
      ?.flatMap((crawling: any) => crawling.crawlingData) 
      .filter(isSitePerformanceData) ?? []; 

  const pageloadSpeedArray = sitePerformanceData[0]?.data.page_load_speed || [];
  const pagemet = pageMetrics?.data?.project?.crawlings[0]?.crawlingData[0]?.data || {}

  // console.log("DATA", pagemet )


  const pageloadSpeedTotal =
    sitePerformanceData[0]?.data.page_load_speed.reduce((acc, currentValue) => {
      return (acc += currentValue);
    }, 0) || 0;

  const average_page_load_speed =
    sitePerformanceData[0]?.data.average_page_load_speed || 0;

  const amountJavascriptAndCssLabel: string[] =
    sitePerformanceData[0]?.data.amount_of_javascript.map(
      (item) => `${item?.range}`
    ) || [];


  const JavascriptData =
    sitePerformanceData[0]?.data.amount_of_javascript.map(
      (item) => item.script_count
    ) || [];
  const CssData =
    sitePerformanceData[0]?.data.amount_of_javascript.map(
      (item) => item.stylesheet_count
    ) || [];

  const sitePerformanceIssue =
    sitePerformanceData[0]?.data.performance_issues || [];

  const pageloadSpeedArr = pageloadSpeedArray.slice(0, 4);

  const CardClone = (
    <div className="grid gap-4 w-full md:max-w-[390px] h-[226px] rounded-md p-6 pb-2 border">
      <div className="flex w-full justify-between items-center ">
        <h5 className=" font-semibold text-base flex gap-4 items-center">
          {" "}
          Page load speed{" "}
          <button title="How quickly a specific page displays all its content.">
            {" "}
            <RxQuestionMarkCircled />
          </button>{" "}
        </h5>
        <p className=" text-sm font-normal">{pageloadSpeedTotal} </p>
      </div>

      <div className="flex flex-col gap-4 ">
        {/* <DualProgressBar leftPercentage={'30'} /> */}
        {/* <QuadProgressBar
          metric1Percentage={metric1Percentage}
          metric2Percentage={metric2Percentage}
          metric3Percentage={metric3Percentage}
          metric4Percentage={metric4Percentage}
        /> */}
        <ProgressBarChart dataArray={pageloadSpeedArr} />
        {/* <div className="flex flex-col items-stretch justify-end w-full text-sm text-[#475467]"></div> */}
      </div>
    </div>
  );

  return isLoading ? (
    <div className=" w-full h-20 flex items-center justify-center mt-10">
      <Loader />
    </div>
  ) : (
    <main className="grid gap-6 mt-10 h-full">
      <section className=" grid w-full grid-cols-1 md:grid-cols-3 md:gap-6 md:space-y-0 space-y-4 2xl:gap-8 py-4 mb-5">
        <div className="grid col-span-1 ">
          <div className="flex md:flex-col min-[600px]:flex-row flex-col gap-7 ">
            <Card
              title={"Average page load speed"}
              amount={`${average_page_load_speed}ms`}
              style={""}
              percent={1}
              chart={undefined}
              showDescription
              description="The typical time it takes for your pages to fully load."
            />
            <Card
              title={"Images without alt tag"}
              amount={`${pagemet?.checks?.no_image_alt || 0}`}
              style={""}
              percent={1}
              chart={undefined}
              showDescription
              description="Images without alt tag"
            />
            {/* {CardClone} */}
          </div>
        </div>
        <div className="col-span-2 border grid rounded-md p-6">
          <div className="flex flex-col w-full">
            <h1
              className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}
            >
              Amount of Javascript and CSS
              <button title={`The volume of code (scripts and styles) on your site, which can affect loading speed`}>
                {" "}
                <RxQuestionMarkCircled />
              </button>
            </h1>
            <hr className="mt-2 w-full" />
          </div>


          <BarChartDouble labels={amountJavascriptAndCssLabel} data={JavascriptData} 
          datasets={[
              {
                label: "JavaScript",
                data: JavascriptData,
                backgroundColor: `#F0DB4F`,
              },
              {
                label: "CSS",
                data: CssData,
                backgroundColor: `#1B73BA`,
              },
            ]}
            xAxisLabel="Amount of Javascript and CSS"
            yAxisLabel="Number of pages"
          />
        </div>
      </section>
      <section className="flex flex-col w-full border rounded-md p-6 mb-20">
        <div className="flex  justify-between w-full border-b pb-2">
          <h3 className="text-[#101828] text-xl font-semibold">
            Site performance issues <ShowDescription description="Issues that affect the performance of your site" />
          </h3>
          <button
            onClick={() => setIsPerformanceIssue(!isPerformanceIssue)}
            className="text-blue-400 cursor-pointer"
          >
           {`${!isPerformanceIssue ? "Show" : "Hide"}`}
          </button>
        </div>
        <div className="w-full">
          {isPerformanceIssue && (
            <DataTable
              columns={sitePerformanceIssueColumns}
              data={sitePerformanceIssue}
            />
          )}
        </div>
      </section>
    </main>
  );
}
