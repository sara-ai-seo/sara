"use client";

import FilledButton from "../component/FilledButton";
import TraficOverview, { TOverview } from "./components/graphs/TraficOverview";
import { RxQuestionMarkCircled } from "react-icons/rx";
// import { BacklinkGraph } from './components/graphs/BacklinkGraph';
// import KeywordTable from './components/tables/KeywordTable';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OrganicTrafficCard from "./technical-seo/components/OrganicTrafficCard";
import OrganicKeywords from "./technical-seo/components/OrganicKeywords";
import AverageTimeOnsite from "./technical-seo/components/AverageTimeOnsite";
import PlainButton from "../component/PlainButton";
import { useRouter } from "next/navigation";
import { StackedBarChart } from "./components/graphs/StackedBarChart";
import { RootState } from "../store";
import KeywordTable from "./components/tables/KeywordTable";
import AutoModal from "../component/modals/AutoModal";
import { handleDownloadAsImage } from "../utils/downloadFileAsImage";
import { UseOverviewData } from "./components/fetches/overviewdata";
import { CurrentProperty } from "../utils/currentProperty";
import Loader from "../component/Loader";
import { TimeToInteractive } from "./dashboard/TimeToInteractive";
import { LCP } from "./dashboard/LCP";
import RankOverview from "./rank-tracker/components/RankOverview";
import moment from "moment";
import Button from "./components/ui/Button";
import { BiExport } from "react-icons/bi";
import { useTechnicalSeoFetchData } from "../services/technicalSeo/TechnicalSeoFetch";
import { chartConfig, chartData, CustomPieChart } from "../component/charts/piechart";

export default function Dashboard() {
  const exportIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_7818_2872)">
        <path
          d="M13.3334 13.3332L10 9.9999M10 9.9999L6.66669 13.3332M10 9.9999V17.4999M16.9917 15.3249C17.8045 14.8818 18.4466 14.1806 18.8166 13.3321C19.1866 12.4835 19.2635 11.5359 19.0352 10.6388C18.8069 9.7417 18.2863 8.94616 17.5556 8.37778C16.8249 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6978 6.52427 13.2277 5.61852 12.575 4.85073C11.9223 4.08295 11.1041 3.47311 10.1818 3.06708C9.25949 2.66104 8.25715 2.46937 7.25013 2.50647C6.2431 2.54358 5.25758 2.80849 4.36768 3.28129C3.47777 3.7541 2.70662 4.42249 2.11221 5.23622C1.5178 6.04996 1.1156 6.98785 0.935844 7.9794C0.756086 8.97095 0.803449 9.99035 1.07437 10.961C1.3453 11.9316 1.83273 12.8281 2.50003 13.5832"
          stroke="#344054"
          stroke-width="1.67"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_7818_2872">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const property = CurrentProperty();

  const response = UseOverviewData(property.id);


  const User = useSelector((state: RootState) => state.user.user);

  const data: DashboardDto = response.data

  if (response.isPending) {
    return (
      <div className="h-14 w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (response.isError) {
    return (
      <div className="h-20 w-full flex items-center justify-center">
        <p>An error occurred while fetching the data.</p>
      </div>
    )
  }

  const siteHealthScore = {
    score: data.techSeo.current.siteHealth,
    previous: data.techSeo.differences.siteHealthDifference
  }
  const dataLabel = Array.isArray(data?.newvslost) ? data?.newvslost.map((item) => moment(item.updatedAt).format("Do MMM,YY")) : [];
  const newRd = Array.isArray(data?.newvslost) ? data.newvslost.map((newB) => newB.newReferringMainDomains) : [];
  const lostRd = Array.isArray(data?.newvslost) ? data.newvslost.map((newB) => newB.lostReferringMainDomains) : [];
  // console.log("DT", data.techSeo )

  const router = useRouter()

  return (
    <>
      {/* {show && (
        <AutoModal
          closeModal={() => setShow(false)}
          ModalBody={<CheckUserType close={closeModal} />}
        />
      )} */}
      <div className=" mb-10 p-2 grid h-full w-full sm:overflow-auto">
        <div className="flex w-full flex-col sm:flex-row gap-4 justify-between items-start flex-grow">
          <div className="flex flex-col">
            <h1 className="sm:text-3xl text-2xl text-[#101828] font-bold">
              Welcome back, {User.name.split(" ")[0]}
              {/* Welcome back, {User.name} */}
            </h1>
            <p className="sm:text-base text-sm text-gray-600">
              Track, manage and boost your site’s SEO.
            </p>
          </div>
          <div className="flex  items-center gap-2">
            <span>
              <Button variant="secondary" className="flex items-center gap-2"
                onClick={() => {
                  handleDownloadAsImage(
                    "dashboardOverview",
                    "dashboardOverview"
                  )
                }}
              >
                <BiExport />
                <span> Export</span>

              </Button>            </span>
            <span>
              <Button
                className="bg-primary  text-white min-[375px]:text-base text-sm hover:bg-primary outline-2 hover:outline-2 hover:outline-offset-2 p-2 rounded-md"
                onClick={() => router.push("/dashboard/optimization-plans")}
              >
                View recommendations
              </Button>
            </span>
          </div>
        </div>
        <div id="dashboardOverview">
          {/* {loaded && ( */}
          <section
            className={`w-full grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-8 gap-4 justify-between`}
          >
            <OrganicTrafficCard />
            <TimeToInteractive amount={data?.techSeo?.current?.timeToInteractive ?? 0}
              difference={data?.techSeo?.differences?.timeToInteractiveDifference ?? 0}
              chartData={data.techSeo.current.timeToInteractiveHistory}
              previous={data?.techSeo.current.timeToInteractive - data?.techSeo?.differences?.timeToInteractiveDifference}
            />

            <LCP
              amount={data?.techSeo?.current?.largestContentfulPaint}
              previous={data?.techSeo?.current?.largestContentfulPaint - data?.techSeo?.differences?.largestContentfulPaintDifference}
              chartData={data?.techSeo?.current?.largestContentfulPaintHistory} 
              difference={data?.techSeo?.differences?.largestContentfulPaintDifference}
              />
          </section>
          {/* )} */}

          <section className="w-full">
            <TOverview siteHealthScore={siteHealthScore} />
          </section>
          <div className="w-full grid shadow-md border font-bold text-xl items-start h-[426px] mb-10 rounded-md p-2 md:p-6  ">
            <div className="">
              <div className="flex w-full h-full items-start justify-between">
                <div className={`text-[#101828] flex items-center gap-4`}>
                  Backlink status
                  <button title="The links associated with your website either leading out or directing into your website">
                    <RxQuestionMarkCircled className="text-gray-600" />
                  </button>
                </div>
                {/* <select className={`border rounded-md p-2 text-[#344054] text-sm font-normal`}>
              <option className={``}>
                Last 12 months
              </option>
              <option className={``}>
                Last 6 months
              </option>
              <option className={``}>
                Last 3 months
              </option>
            </select> */}
              </div>
              <hr className="w-full mt-4" />
            </div>
            <div className=" h-full w-full max-w-[600px]">
              {/* <BacklinkGraph /> */}
              <StackedBarChart
                label={dataLabel}
                lostData={lostRd}
                newData={newRd}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
