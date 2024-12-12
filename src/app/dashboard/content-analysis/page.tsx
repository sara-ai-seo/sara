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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Overview from "./components/Overview";
import ExploreContent from "./components/ExploreContent";
import { contentAnalysisOverViewType } from "@/types/contentAnalysis";
import Button from "../components/ui/Button";
import { FaPlus } from "react-icons/fa6";



export default function ContentAnalysis() {
  const [showDetail, setShowDetail] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All recommendations");
  const activePropertyId = useSelector(
    (state: RootState) => state.property.activePropertyObj.id
  );
const router = useRouter()
  // console.log(activePropertyId);

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

  // console.log("CONT",data);

  return (
    <main className="grid w-full h-full items-start content-start gap-6 mb-20">
      {/* {JSON.stringify(queryParameter)} */}
      <TitleShareSettingTop title="Content analysis" keyword={data?.crawlings[0]?.data?.keywords[0]?.keyword} /> 
      {/* <LastUpdated date={FormattedDate(detail?.content[0].updatedAt ?? "")} /> */}

      <div className="flex border-b-2 gap-4">
        <Link
          href="content-analysis"
          className={`border-b-2 pb-3 justify-left ${
            queryParameter === null &&
            "text-[#175CD3] border-b-2  border-[#175CD3]"
          }`}
        >
          Overview
        </Link>
        <Link
          href="content-analysis?type=explore-content"
          className={`border-b-2 pb-3 justify-right  ${
            queryParameter === "explore-content" &&
            "text-[#175CD3] border-b-2  border-[#175CD3]"
          }`}
        >
          Explore content
        </Link>
      </div>

      <section className="flex justify-between items-center">
        <h1 className="text-2xl">
          <strong>Topics:</strong> {data?.crawlings[0]?.data?.keywords[0]?.keyword}
        </h1>
        {/* <div className="relative">
          <CiSearch className="absolute top-2.5 text-gray-500 left-2 text-2xl" />
          <input type="text" className="rounded-md border p-2 pl-8" placeholder={data?.crawlings[0]?.data?.keywords[0]?.keyword} />
        </div> */}
        <Button variant="secondary" className="flex items-center gap-2" onClick={()=> router.push("/dashboard/content-analysis/add-new")}> <FaPlus/> Add New Content</Button>
      </section>
      <section className="h-[500px] overflow-y-auto pb-20 mb-20">
        {queryParameter === null && <Overview OverviewData={data} />}
        {queryParameter === "explore-content" && (
          <ExploreContent data={exploreTabData} />
        )}
      </section>

    </main>
  );
}
