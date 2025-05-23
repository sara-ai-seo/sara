"use client";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { Tab } from "@headlessui/react";
import PlainButton from "@/app/component/PlainButton";
import { CiSettings, CiShare2 } from "react-icons/ci";
import Overview from "./components/Overview";
import Crawlability from "./components/Crawlability";
import SitePerformance from "./components/SitePerformance";
import Issues from "./components/Issues";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import moment from "moment";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { useDispatch } from "react-redux";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useTechnicalSeoFetchData } from "@/app/services/technicalSeo/TechnicalSeoFetch";
import { shareOrFallback } from "@/app/utils/shareContentOrFallback";
import { handleDownloadAsImage } from "@/app/utils/downloadFileAsImage";
import Loader from "@/app/component/Loader";
import toast from "react-hot-toast";
import ProgressBarPercent from "@/app/component/ProgressBarPercent";
import { AxiosError } from "axios";
import { CrawlingIndicator } from "../components/CrawlingIndicator";

export default function TechnicalSeoLayout() {

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [progress, setProgress] = useState(0);


  // const techSeo = useSelector((state: RootState) => state.technicalSeo.metrics);
  const lastUpdated = useSelector(
    (state: RootState) =>
      state.performance.metrics?.history?.scores[0]?.createdAt
  );

  const activePropertyObj = useSelector(
    (state: RootState) => state.property.activePropertyObj
  );

  const tabs = [
    {
      title: "Overview",
      content: <Overview onViewAllIssues={() => setSelectedTabIndex(3)} />,
    },
    { title: "Crawlability and indexability", content: <Crawlability /> },
    { title: "Site performance", content: <SitePerformance /> },
    { title: "Issues", content: <Issues /> }
  ];
  const CrawlTechnicalSeo = async () => {
    return ApiCall.post(
      `/user/crawler/technical-seo/${activePropertyObj.id}`,
      {},
      {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            console.log('Progress:', percentCompleted);
            setProgress(percentCompleted);
          }
        },
        onDownloadProgress: (progressEvent) => {  // Add download progress too
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            console.log('Download Progress:', percentCompleted);
            setProgress(percentCompleted);
          }
        },
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  const mutate = useMutation({
    mutationFn: CrawlTechnicalSeo,
    onMutate: () => {
      setProgress(0);
    },
    onSuccess: () => {
      toast.success("Recrawl Technical SEO Successfully");
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
      // useTechnicalSeoFetchData(activePropertyObj.id);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message);
      setProgress(0);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });

  const { isLoading, data } = useTechnicalSeoFetchData(activePropertyObj.id);
  const pendingStatus = data?.crawlings[0]?.status === "PENDING"

  // console.log("tech-seo", data?.crawlings[0]?.status);
  return (
    <section className={`flex w-full h-full justify-start flex-col gap-2 `}>
      <div className="flex sm:flex-row flex-col w-full justify-between sm:items-center gap-2">
        <div className="w-fit">
          <h2 className=" font-semibold text-[#101828] sm:text-3xl text-2xl">
            Technical SEO
          </h2>
        </div>
        <div className="flex w-fit md:w-1/2 items-center justify-end gap-2 md:gap-4">
          <span className="">
            <button
              className={`rounded-lg sm:text-base text-sm p-2  text-white font-semibold hover:bg-blue-500 ${pendingStatus ? "bg-secondary" : "bg-primary"} flex items-center gap-2`}
              onClick={() => mutate.mutate()}
              disabled={mutate.isPending || pendingStatus}
              title="Re-run audit"
            >
              {mutate.isPending ? "Crawling..." :
                data?.crawlings[0]?.status === "PENDING" ? (
                  <CrawlingIndicator text="Deep crawling " />) : " Re-run audit"}

            </button>
          </span>

          <span className="">
            <PlainButton
              moreClass="text-primary bg-[#EFF8FF] sm:text-base text-sm"
              title="Export"
              handleClick={() =>
                handleDownloadAsImage("technical-seoId", "Technical SEO")
              }
              icon={<CiShare2 />}
            />
          </span>
        </div>

      </div>
      <div className="flex items-center gap-4 my-2">
        <div className="flex items-center gap-2 sm:text-base min-[375px]:text-sm text-xs">
          <p className=" font-semibold"> Last Update:</p>
          <p className=""> {moment(lastUpdated).format("Do MMM YY")} </p>
        </div>
        <div> | </div>
        <div>

          <div className="flex items-center gap-2">
            <p className=" font-semibold">Crawl status:</p>

            {
              mutate.isPending ? (
                <CrawlingIndicator text="Crawling " />
              ) :
                data?.crawlings[0]?.status === "PENDING" ?
                  (
                    <CrawlingIndicator text="Deep crawling " />
                  ) : data?.crawlings[0]?.status === "COMPLETED" ? (
                    <p className="text-green-500">
                      Completed
                    </p>
                  ) : data?.crawlings[0]?.status === "FAILED" ? (
                    <p className="text-red-500">
                      Failed
                    </p>
                  ) : (
                    <p className="text-yellow-500">
                      Unknown
                    </p>
                  )

            }


          </div>

        </div>
      </div>
      <div className="w-full" id="technical-seoId">
        <Tab.Group
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        >
          <Tab.List className="flex gap-4 w-full overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => {
              return (
                <div key={tab.title}>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      /* Use the `selected` state to conditionally style the selected tab. */

                      <p
                        className={` cursor-pointer p-2 active:outline-none text-sm font-semibold border-t-0 border-l-0 border-r-0 active:border-r-none ${selected
                            ? "text-primary border-b-2 border-primary"
                            : " text-[#667085] active:border-none"
                          }`}
                      >
                        {tab.title}
                      </p>
                    )}
                  </Tab>
                </div>
              );
            })}
          </Tab.List>

          {/* <p> Here goes the rest</p> */}

          <div className={`h-full w-full overflow-auto`}>
            {isLoading ? (
              // <div className=""> Loading... </div>
              <div className="h-32 w-full flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <Tab.Panels>
                {tabs.map((tab) => {
                  return (
                    <div key={tab.title} className="h-full overflow-auto">
                      <Tab.Panel>{tab.content}</Tab.Panel>
                    </div>
                  );
                })}
              </Tab.Panels>
            )}
          </div>
        </Tab.Group>
      </div>
    </section>
  );
}
