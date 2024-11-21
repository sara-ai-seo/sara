"use client";
import { useState } from "react";
import { CountryPickAllLocationDefault } from "../rank-tracker/components/CountryPick";
import LinkBuildingOverview from "./component/overview/LinkBuildingOverview";
import BacllinkPages from "./component/backlinkPages/BacllinkPages";
import ReferingDomains from "./component/ReferingDomains";
import LinkBuildingOpportunities from "./component/LinkBuildingOpportunities";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import Button from "../components/ui/Button";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { useMutation } from "@tanstack/react-query";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { trimDomain } from "@/app/utils/trimDomain";
import toast from "react-hot-toast";
import moment from "moment";
import { handleDownloadAsImage } from "@/app/utils/downloadFileAsImage";

export default function LinkBuilding() {
  const [data, setData] = useState("");
  const tabs = [
    {
      title: "Linking building opportunities",
      content: <LinkBuildingOpportunities />,
    },
    {
      title: "Backlink overview",
      content: <LinkBuildingOverview sendData={setData} />,
    },
    { title: "Backlink pages", content: <BacllinkPages sendData={setData} /> },
    {
      title: "Reffering domains",
      content: <ReferingDomains sendData={setData} />,
    },
  ];
  const property = CurrentProperty();

  const { isSuccess, isPending, isError, mutate } = useMutation({
    mutationFn: async () =>
      await ApiCall.post(`user/crawler/back-link/${property.id}`, {
        targets: { "1": trimDomain(property.domain) },
      }),
    onSuccess: () => {
      toast.success("Successfully crawled", { position: "top-right" });
    },
    onError: () => {
      toast.error("Error crawling link building", { position: "top-right" });
    },
  });

  return (
    <main className="grid w-full h-full items-start content-start gap-6  mb-20">
      <section
        className={`flex min-[600px]:flex-row  flex-col  justify-between w-full min-[600px]:items-center min-[600px]:gap-4 gap-2 text-[#101828]`}
      >
        <h1
          className={`font-semibold text-2xl sm:text-4xl 2xl:text-5xl whitespace-nowrap`}
        >
          Link building{" "}
        </h1>
        <div className="flex w-full md:w-1/2 items-center min-[600px]:justify-end gap-2 md:gap-4">
          <span className="">
            <Button
              className="rounded-lg sm:text-base  text-sm p-2 w-[136px] bg-primary text-white font-semibold hover:bg-blue-500"
              onClick={() => mutate()}
              loading={isPending}
            >
              Update data
            </Button>
          </span>
          <span className="">
            <Button
              onClick={() =>
                handleDownloadAsImage("Link-building", "Link-building page")
              }
              className="text-primary bg-[#EFF8FF] sm:text-inherit text-sm"
            >
              Export
            </Button>
          </span>
          {/* <span className="p-3 rounded-md border cursor-pointer ">
            <CiSettings />
          </span> */}
        </div>
      </section>
      <section className="flex min-[500px]:flex-row flex-col  min-[500px]:items-center items-start  min-[500px]:gap-6 gap-3">
        <span className="flex items-center gap-3 text-lg">
          <p className={` font-medium text-[#101828] `}>Last updated: </p>
          <p className="font-normal"> {moment(data).format("Do MMM, YY")} </p>
        </span>
        {/* <CountryPickAllLocationDefault title="All location" /> */}
      </section>
      <section id="Link-building" className=" h-full overflow-auto">
        <TabGroup>
          <TabList className="flex gap-4 w-full overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => {
              return (
                <div key={tab.title}>
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
                </div>
              );
            })}
          </TabList>
          <hr className="w-full" />
          <div className={` h-full w-full overflow-auto  `}>
            <TabPanels>
              {tabs.map((tab) => {
                return (
                  <div key={tab.title} className="h-full ">
                    <Tab.Panel>{tab.content}</Tab.Panel>
                  </div>
                );
              })}
            </TabPanels>
          </div>
        </TabGroup>
      </section>
    </main>
  );
}
