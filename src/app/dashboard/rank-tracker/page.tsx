"use client";

import FilledButton from "@/app/component/FilledButton";
import PlainButton from "@/app/component/PlainButton";
import React, { Fragment, useEffect, useState } from "react";
import { IoCloudUploadOutline, IoSettingsOutline } from "react-icons/io5";
import ToggleMobile from "../components/ToggleMobile";
import CountryPick from "@/app/dashboard/rank-tracker/components/CountryPick";
import SearcgrchEnginePick from "@/app/dashboard/rank-tracker/components/SearchEnginePick";
import OrganicPick from "./components/OrganicPick";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import RankOverview from "./components/RankOverview";
import Rankings from "./components/Rankings";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import moment from "moment";
import useRankMutation, {
  RankCrawl,
  RankTrackerCrawler,
  useRankTrackingOverview,
} from "@/app/services/crawlers/rank_tracking";
import { trimDomain } from "@/app/utils/trimDomain";
import { CurrentProperty } from "@/app/utils/currentProperty";
import Button from "../components/ui/Button";
import SearchEnginePick from "@/app/dashboard/rank-tracker/components/SearchEnginePick";
import { handleDownloadAsImage } from "@/app/utils/downloadFileAsImage";
import toast from "react-hot-toast";
import ProgressBarPercent from "@/app/component/ProgressBarPercent";
// import PageDistributions from './components/PageDistributions'

export default function page() {
  // const [mobile, setMobile] = useState(false);
  // const [detail, setDetail] = useState([])
  const [progress, setProgress] = useState(0);
  console.log(progress);
  const [se, setSe] = useState("google");
  const [type, setType] = useState({
    name: "Organic",
    value: "organic_positions",
  });

  const tabs = [
    { title: "Overview", content: <RankOverview se={se} type={type} /> },
    { title: "Rankings", content: <Rankings /> },
    // { title: "Page distributions", content: <PageDistributions /> }
  ];
  const id = CurrentProperty();

  const {
    isError,
    isPending,
    isSuccess,
    data: OverviewData,
  } = useRankTrackingOverview("overview", id.id);

  // const lastUpdated = (OverviewData?.project?.crawlings[0]?.crawlingData[0]?.updatedAt)
  const lastUpdated = moment(
    OverviewData?.project?.crawlings[0]?.crawlingData[0]?.updatedAt
  ).format("Do MMM YY");
  // console.log("LU", lastUpdated)

  const {
    mutate: RankMutate,
    isSuccess: mutateSuccess,
    isError: mutateError,
    isPaused: mutatePaused,
    isPending: mutatePending,
  } = useRankMutation(id.id, setProgress);

  // const project = CurrentProperty();
  const handleEngineChange = (engine: React.SetStateAction<string>) =>
    setSe(engine);

  // console.log("SE", type)

  return (
    <main className="grid w-full h-full items-start content-start gap-6">
      <section
        className={`flex sm:flex-row flex-col sm:items-center w-full gap-2 justify-between`}
      >
        <div className=" whitespace-nowrap ">
          <h3 className="text-[#101828] text-2xl font-semibold">
            Rank tracker
          </h3>
        </div>
        <div className="flex items-center gap-4 w-full sm:justify-end">
          <div className="">
            {/* <FilledButton
              title={"Re-track rankings"}
              loading={mutatePending}
              className="sm:text-base text-sm min-[375px]:px-5 px-px  min-[375px]:h-full h-9"
              handleClick={() => {
                RankMutate({
                  target: trimDomain(project.domain), 
                  id: project.id, 
                  location_code: 2840
                })
              }
            }
            /> */}

            {mutatePending ? (
              <ProgressBarPercent progress={progress} />
            ) : (
              <Button
                className=""
                loading={mutatePending}
                onClick={() => {
                  RankMutate(
                    {
                      target: trimDomain(id.domain) as string,
                      location_code: 2840,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Rankings re-tracked successfully");
                      },
                    }
                  );
                }}
              >
                Re-track rankings
              </Button>
            )}
          </div>
          <div>
            {" "}
            <Button
              onClick={() =>
                handleDownloadAsImage("Rank_tanker", "Rank-tracking")
              }
              className={`w-full bg-[#EFF8FF] text-primary gap-2  items-center flex justify-center border  rounded-lg sm:text-base text-sm p-2 font-semibold hover:bg-gray-100 `}
            >
              <IoCloudUploadOutline /> Export
            </Button>
          </div>
          <div className="">
            {" "}
            {/* <PlainButton
              title={""}
              icon={<IoSettingsOutline />}
              className="sm:text-base text-sm min-[375px]:h-full h-9"
            /> */}
          </div>
        </div>
      </section>

      <section className="w-full gap-6 flex lg:flex-row flex-col lg:items-center ">
        <div className="flex min-[375px]:flex-row flex-col min-[375px]:items-center min-[375px]:gap-4 gap">
          <p className="min-[425px]:text-inherit gap-2 flex items-center text-sm whitespace-nowrap">
            <strong> Last Update:</strong>
            {lastUpdated}
          </p>
          {/* <ToggleMobile
            mobile={mobile}
            setMobile={setMobile}
            className="min-[425px]:text-inherit text-sm"
          /> */}
        </div>
        <div className="flex sm:flex-row flex-col  w-full sm:gap-6 gap-2 sm:items-center it">
          {/* <CountryPick className=" w-full flex items-center" /> */}
          <SearchEnginePick onEngineChange={handleEngineChange} className=" " />
          <OrganicPick
            className=""
            changeType={function ({
              name,
              value,
            }: {
              name: string;
              value: string;
            }): void {
              setType({ name, value });
              // console.log("TYPE", type)
            }}
          />
        </div>
      </section>
      <section id="Rank_tanker" className={``}>
        <TabGroup>
          <TabList className="flex gap-4 w-full">
            {tabs.map((tab) => {
              return (
                <span key={tab.title}>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <p
                        className={` cursor-pointer p-2 active:outline-none text-sm font-semibold border-t-0 border-l-0 border-r-0 active:border-r-none ${
                          selected
                            ? "text-primary border-b-2 border-primary"
                            : " text-[#667085] active:border-none"
                        }`}
                      >
                        {tab.title}
                      </p>
                    )}
                  </Tab>
                </span>
              );
            })}
          </TabList>
          <hr className="w-full" />
          <div className={` h-full w-full overflow-auto  `}>
            <TabPanels>
              {tabs.map((tab) => {
                return (
                  <span key={tab.title} className="h-full ">
                    <TabPanel>{tab.content}</TabPanel>
                  </span>
                );
              })}
            </TabPanels>
          </div>
        </TabGroup>
      </section>
    </main>
  );
}
