"use client";
import LastUpdated from "@/app/component/LastUpdated";
import TitleShareSettingTop from "@/app/component/TitleShareSettingTop";
import Card, { SimpleCard } from "../Card";
import AverageTimeOnsite from "../technical-seo/components/AverageTimeOnsite";
import { SelectorDropdown } from "../keyword-explorer/component/SmartKeywordFinder";
import SearchBox from "@/app/component/SearchBox";
import { GoQuestion } from "react-icons/go";
import { mockedData } from "@/app/component/data/mockedData";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
// import { contentAnalysisProps } from "@/types/contentAnalysis";
import { FormattedDate } from "@/helper";
import { ConvertToMilliuseconds } from "@/app/utils/ConvertToMilliseconds";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { usePathname, useSearchParams } from "next/navigation";
import Overview from "./components/Overview";
import ExploreContent from "./components/ExploreContent";
import { contentAnalysisOverViewType } from "@/types/contentAnalysis";

export default function ContentAnalysis() {
  const [showDetail, setShowDetail] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All recommendations");
  const activePropertyId = useSelector(
    (state: RootState) => state.property.activePropertyObj.id
  );

  console.log(activePropertyId);

  const tabsFilter = [
    { name: "All recommendations" },
    {
      name: "Undone",
      icon: (
        <Image
          src={"/dashboard/error.svg"}
          alt="undone"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "Done",
      icon: (
        <Image src={"/dashboard/fixed.svg"} alt="Done" width={24} height={24} />
      ),
    },
  ];
  const path = usePathname();
  const queryParameter = useSearchParams().get("type");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["content-analysis", activePropertyId],
    queryFn: async () => {
      const result = await ApiCall.get(
        `/user/crawler/content-analysis/by-tab/${activePropertyId}?tab=extractedOverview`
      );
      return result.data?.project;
    },
  });

  const {
    data: exploreTabData,
    isError: exploreisError,
    isLoading: exploreIsLoading,
  } = useQuery({
    queryKey: ["explore-content", activePropertyId],
    queryFn: async () => {
      const result = await ApiCall.get(
        `/user/crawler/content-analysis/by-tab/${activePropertyId}?tab=extractedExplore`
      );
      return result.data?.project;
    },
  });

  // console.log(exploreTabData, exploreisError, exploreIsLoading);

  return (
    <main className="grid w-full h-full items-start content-start gap-6 mb-20">
      {/* {JSON.stringify(queryParameter)} */}
      <TitleShareSettingTop title="Content analysis" />
      {/* <LastUpdated date={FormattedDate(detail?.content[0].updatedAt ?? "")} /> */}

      <div className="flex gap-4 border-b-2">
        <Link
          href="content-analysis"
          className={`border-b-2 pb-3 ${
            queryParameter === null &&
            "text-[#175CD3] border-b-2  border-[#175CD3]"
          }`}
        >
          Overview
        </Link>
        <Link
          href="content-analysis?type=explore-content"
          className={`border-b-2 pb-3  ${
            queryParameter === "explore-content" &&
            "text-[#175CD3] border-b-2  border-[#175CD3]"
          }`}
        >
          Explore content
        </Link>
      </div>

      <section className="flex justify-between items-center">
        <h1 className="text-2xl">
          <strong>Topics:</strong> Business branding
        </h1>
        <div className="relative">
          <CiSearch className="absolute top-2.5 text-gray-500 left-2 text-2xl" />
          <input type="text" className="rounded-md border p-2 pl-8" />
        </div>
      </section>
      <section className="h-[500px] overflow-y-auto pb-20 mb-20">
        {queryParameter === null && <Overview OverviewData={data} />}
        {queryParameter === "explore-content" && (
          <ExploreContent data={exploreTabData} />
        )}
      </section>

      {/* {!showDetail ? (
        <section className="grid w-full h-full items-start content-start gap-6 overflow-auto">
          <section className=" grid w-full gap-6 grid-cols-1 lg:grid-cols-3">
            <SimpleCard
              title={"Number of pages"}
              amount={detail?.summary?.number_of_pages ?? 0}
            />
            <AverageTimeOnsite />
            <Card
              title={"Bounce rate"}
              amount={`${(
                (detail?.summary.bounce_rate[0].bounceRate * 1000) /
                10
              ).toFixed(2)}%`}
              style={""}
              percent={undefined}
              chart={undefined}
            />
          </section>
          <section className="flex items-center justify-end gap-7">
            <SelectorDropdown
              items={["Words", "Images", "Videos"]}
              selected={"Words"}
              setSelected={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <SearchBox
              value={""}
              setValue={function (e: any): void {
                throw new Error("Function not implemented.");
              }}
            />
          </section>
          <section className=" w-full rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="font-medium py-6 border-b w-full text-xs bg-[#F9FAFB] text-left">
                  <th className=" p-3 font-medium rounded-tl-lg ">
                    {" "}
                    Page title
                  </th>
                  <th className="p-3 font-medium"> URL</th>
                  <th className="font-medium p-3 text-xs text-[#475467]   text-left ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Status code{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </th>
                  <th className="font-medium p-3 text-xs text-[#475467]   text-left  ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Words{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </th>
                  <th className="font-medium p-3 text-xs text-[#475467]   text-left  ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      ATP{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </th>
                  <th className="font-medium p-3 text-xs text-[#475467]   text-left ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      BR{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </th>
                  <th className="p-3 font-medium rounded-tr-lg">
                    {" "}
                    Last content update
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockedData.map((data) => {
                  return (
                    <tr key={data.gv}>
                      <td className="p-3 border-b">
                        <span className="flex items-center gap-2 ">
                          {" "}
                          {data.keyword}{" "}
                          <AiOutlineExpandAlt
                            className="bg-[#EFF8FF] p-1 text-[#1570EF] cursor-pointer rounded text-2xl"
                            onClick={() => setShowDetail(true)}
                          />{" "}
                        </span>
                      </td>

                      <td className="p-3 border-b text-primary">{data.url} </td>
                      <td className={`p-3 border-b `}>
                        {" "}
                        <span
                          className={`rounded-full p-1 px-3 ${
                            data.position > 25
                              ? "bg-[#ECFDF3] text-[#027A48]"
                              : "bg-[#FEF3F2] text-[#B42318]"
                          }`}
                        >
                          {" "}
                          {data.position}{" "}
                        </span>{" "}
                      </td>
                      <td className="p-3 border-b">{data.traffic} </td>
                      <td className="p-3 border-b">{data.cpc} </td>
                      <td className="p-3 border-b">{data.cpc} </td>
                      <td className="p-3 border-b"> Two weeks ago</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </section>
      ) : (
        <section className=" flex flex-col w-full gap-6  ">
          <div className="flex items-center gap-4 w-full">
            <span
              className="p-2 flex items-center shadow-sm border rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => setShowDetail(false)}
            >
              <IoMdArrowRoundBack />
            </span>
            <p className={`font-bold`}> Page title:</p>
            <p className={``}>
              Step-by-step guide to building a business system
            </p>
          </div>

          <div className={`px-16 flex flex-col gap-6`}>
            <div className="flex items-center gap-2 flex-wrap">
              {tabsFilter.map((item, index) => (
                <button
                  key={index}
                  title={item.name}
                  className={`flex h-[44px] items-center border shadow-sm rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${
                    currentFilter === item.name
                      ? "bg-[#EFF8FF] border-none"
                      : "bg-[#FFF]"
                  }`}
                  onClick={() => setCurrentFilter(item.name)}
                >
                  {item.icon && item.icon} {item.name}
                </button>
              ))}
            </div>
            <div className={`rounded-md w-full`}>
              <table className="w-full">
                <thead>
                  <tr className=" border-b bg-gray-100 p-2 rounded-tl-lg rounded-tr-lg font-semibold w-full">
                    <th className="p-2 rounded-tl-lg text-left font-normal text-sm">
                      {" "}
                      Recommendations{" "}
                    </th>
                    <th className="p-2 text-left font-normal text-sm">
                      {" "}
                      Length{" "}
                    </th>
                    <th className="p-2 rounded-tr-lg text-left font-normal text-sm">
                      {" "}
                      Detail{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockedData.map((item) => {
                    return (
                      <tr key={item.tf}>
                        <td className={`py-3 border-b`}>
                          <span className="flex items-center gap-3">
                            <span className={``}>
                              {item.volume > 30 ? (
                                <Image
                                  src={`/dashboard/error.svg`}
                                  alt={""}
                                  width={24}
                                  height={24}
                                />
                              ) : (
                                <Image
                                  src={`/dashboard/fixed.svg`}
                                  alt={""}
                                  width={24}
                                  height={24}
                                />
                              )}
                            </span>
                            {item.keyword}
                          </span>
                        </td>
                        <td
                          className={`py-3 border-b rounded-br-lg rounded-bl-lg `}
                        >
                          {item.volume}
                        </td>
                        <td className={`py-3 border-b`}>{item.keyword}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )} */}
    </main>
  );
}
