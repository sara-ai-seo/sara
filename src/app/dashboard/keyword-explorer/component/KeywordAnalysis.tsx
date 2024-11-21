import PlainButton from "@/app/component/PlainButton";
import chartData, {
  PiechartMockedData,
  mockedData,
} from "@/app/component/data/mockedData";
import React, { useState } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { FaLink, FaPlus, FaVideo } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import { GoDotFill, GoQuestion } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MdArrowUpward } from "react-icons/md";
import {
  Title,
  TitleWithoutUnderline,
} from "../../technical-seo/components/Overview";
import ProgressiveCircle from "../../components/SeoprogressCircle";
import ProgressiveCircleReusable from "../../components/ProgressiveCircleReusable";
import Card from "../../Card";
import PieChart from "../../technical-seo/components/(technicalseo)/PieChart";
import { AnotherDoughnutChart } from "../../technical-seo/components/(technicalseo)/DoughnutChart";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { useKeywordAnalysisData } from "@/app/services/crawlers/keywordExplorer";

import moment from "moment";
import Loader from "@/app/component/Loader";

export const DetailButton = ({ title }: { title: string }) => (
  <button className="" title={title}>
    {" "}
    <GoQuestion />{" "}
  </button>
);
export default function KeywordAnalysis() {
  const [detail, setDetail] = useState(false);
  const [keyword, setKeyword] = useState("");
  const currentProperty = CurrentProperty();

  const { keywordAnalysisData, isPending, isSuccess, isError } =
    useKeywordAnalysisData(currentProperty.id);

  // summary table data
  const data =
    keywordAnalysisData?.[0]?.project?.crawlings?.[0]?.crawlingData?.[0]?.data
      ?.tasks?.[0]?.result;
  // console.log("keyword-analysis", keywordAnalysisData?.[0]);

  function Detail() {
    return (
      <div className="grid gap-6 ">
        <div className="flex sm:flex-row flex-col w-full justify-between sm:items-center">
          <div className="flex items-center gap-4">
            <span
              className="p-2 shadow-sm border rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => setDetail(false)}
            >
              <IoMdArrowRoundBack />
            </span>
            <span className="flex items-center gap-3 md:text-2xl text-lg">
              <p className={` font-semibold text-[#101828] `}>Keyword: </p>
              <p className="font-normal min-[375px]:text-lg text-sm">
                {keyword}
              </p>
            </span>
          </div>
          <div className="flex">
            <span className="flex items-center gap-3 text-base">
              <p className={` font-medium text-[#101828] `}>Last updated: </p>
              <p className="font-normal"> two weeks ago </p>
            </span>
          </div>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-7 gap-6 ">
          <div className="rounded-md border col-span-2 p-6 space-y-6">
            <TitleWithoutUnderline
              title={"Keyword difficulty"}
              info={"How difficult it is for keyword ..."}
            />

            <div className="grid md:grid-cols-1 min-[475px]:grid-cols-2 grid-cols-1 min-[475px]: gap-10">
              <ProgressiveCircleReusable value={35} title={"medium"} />

              <p className="mt-auto">
                You need about backlinks from about 22 websites to get into the
                top 10 search results for this keyword.
              </p>
            </div>
          </div>
          <div className="rounded-md md:grid-cols-1 min-[500px]:grid-cols-2 grid-cols-1 col-span-2 grid gap-6">
            <Card
              title={"Volume"}
              amount={59}
              style={""}
              percent={undefined}
              chart={undefined}
            />
            <Card
              title={"Traffic forecast"}
              amount={59}
              style={""}
              percent={undefined}
              chart={undefined}
            />
            <Card
              title={"Cost per click (CPC)"}
              amount={59}
              style={""}
              percent={undefined}
              chart={undefined}
            />
          </div>
          <div className="h-fit rounded-md border p-6 space-y-6  col-span-3  gap-6">
            <TitleWithoutUnderline
              title={"Global Volume"}
              info={"Global volume..."}
            />
            <div
              className={`flex lg:flex-row md:flex-col min-[500px]:flex-row flex-col w-full gap-3`}
            >
              <div className="xl:w-full  lg:w-2/3 w-full">
                <AnotherDoughnutChart />
              </div>

              <div className="flex justify-center flex-col w-full">
                <p className="flex gap-2 items-center">
                  <GoDotFill className="text-[#194185]" /> USA 23000
                </p>
                <p className="flex gap-2 items-center  ">
                  {" "}
                  <GoDotFill className="text-[#1570EF]" /> CA 900
                </p>
                <p className="flex gap-2 items-center  ">
                  {" "}
                  <GoDotFill className="text-[#84CAFF]" /> UK 50000
                </p>
                <p className="flex gap-2 items-center  ">
                  {" "}
                  <GoDotFill className="text-[#039855]" /> IN 3200
                </p>
                <p className="flex gap-2 items-center ">
                  {" "}
                  <GoDotFill className="text-[#A6F4C5]" /> SA 2302
                </p>
                <p className="flex gap-2 items-center ">
                  {" "}
                  <GoDotFill className="text-[#FECDCA]" /> Others 1800
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col xl:w-3/4 w-full gap-4 rounded-md border p-6 ">
          <Title title={"Keyword ideas"} info={"Keyword ideas"} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-[#101828] font-semibold text-lg">
                  Similar terms
                </h2>
                <p className="rounded-2xl bg-[#F2F4F7] text-[#344054] px-3 p-2 text-xs font-medium">
                  {" "}
                  2,343 keywords{" "}
                </p>
              </div>
              <div className="rounded-md border shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-100 w-full">
                    <tr className="w-full justify-between">
                      <th className="p-4 text-left rounded-tl-md "> Keyword</th>
                      <th className="p-4 text-left rounded-tr-md h-14">
                        {" "}
                        Volume
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    <tr className="w-full">
                      <td className="p-4 w-full"> Branding</td>
                      <td className="p-4 text-left "> 344</td>
                    </tr>
                    <tr className="w-full">
                      <td className="p-4 w-full"> Brand basics</td>
                      <td className="p-4 text-left "> 344</td>
                    </tr>
                    <tr className="w-full">
                      <td className="p-4 w-full"> Business branding</td>
                      <td className="p-4 text-left "> 344</td>
                    </tr>
                    <tr className="w-full">
                      <td className="p-4 w-full"> Brand features</td>
                      <td className="p-4 text-left "> 344</td>
                    </tr>
                    <tr className="w-full">
                      <td className="p-4 w-full"> Top brands</td>
                      <td className="p-4 text-left "> 344</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end w-full">
                <button className="p-2 px-3 bg-[#EFF8FF] text-primary rounded-md font-semibold">
                  View all
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-[#101828] font-semibold text-lg">
                  Questions
                </h2>
                <p className="rounded-2xl bg-[#F2F4F7] text-[#344054] px-3 p-2 text-xs font-medium">
                  {" "}
                  8,730 keywords{" "}
                </p>
              </div>
              <div className="rounded-md border shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-100 w-full">
                    <tr className="w-full justify-between">
                      <th className="p-4 text-left rounded-tl-md "> Keyword</th>
                      <th className="p-4 text-left rounded-tr-md h-14">
                        {" "}
                        Volume
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    <tr className="w-full">
                      <td className="p-4 w-full"> What is branding</td>
                      <td className="p-4 text-left "> 344</td>
                    </tr>
                    <tr className="w-full">
                      <td className="p-4 w-full">How to brand a business</td>
                      <td className="p-4 text-left "> 664</td>
                    </tr>
                    <tr className="w-full">
                      <td className="p-4 w-full"> Why do business branding</td>
                      <td className="p-4 text-left "> 122</td>
                    </tr>
                    <tr className="w-full">
                      <td className="p-4 w-full"> How to brand a business</td>
                      <td className="p-4 text-left "> 422</td>
                    </tr>
                    <tr className="w-full">
                      <td className="p-4 w-full"> How to brand a business</td>
                      <td className="p-4 text-left "> 43</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end w-full">
                <button className="p-2 px-3 bg-[#EFF8FF] text-primary rounded-md font-semibold">
                  View all
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <main className="py-10 grid ">
      {!detail ? (
        <div className="rounded-md shadow-sm border h-full w-full">
          <div className="flex w-full items-center justify-between p-6 h-[75px]">
            <p className={` font-medium text-[#101828] text-lg`}>
              {data?.length} keywords{" "}
            </p>
            <span>
              <PlainButton title={"Add keyword"} icon={<FaPlus />} />
            </span>
          </div>
          <table className="w-full">
            <thead className="bg-[#F9FAFB] w-full">
              <tr className=" h-[44px] text-xs text-[#475467]  font-medium">
                <th>
                  {/* {" "}
                  <span className="flex items-center gap-2 p-2 px-6">
                    {" "}
                    <input type="checkbox" className="" /> Keywords{" "}
                  </span> */}
                  Keywords
                </th>
                <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    Volume <DetailButton title={""} /> <MdArrowUpward />{" "}
                  </span>{" "}
                </th>
                <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    KD <DetailButton title={""} />{" "}
                  </span>{" "}
                </th>
                <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    CPC <DetailButton title={""} />{" "}
                  </span>{" "}
                </th>
                {/* <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    SERP features <DetailButton title={""} />{" "}
                  </span>{" "}
                </th> */}

                <th>
                  <span className="flex items-center gap-1 p-2 px-6">LTB</span>
                </th>

                <th>
                  <span className="flex items-center gap-1 p-2 px-6">HTB</span>
                </th>
                <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    Update
                  </span>{" "}
                </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {isPending && (
                <div className="h-20 w-full">
                  <Loader />
                </div>
              )}
              {data?.map((data: any, index: number) => {
                return (
                  <tr key={index} className=" border-b">
                    <td className="px-6">
                      <span className="flex items-center gap-2 ">
                        {/* <input type="checkbox" className="" /> */}
                        {data.keyword}{" "}
                        <AiOutlineExpandAlt
                          onClick={() => {
                            setDetail(true);
                            setKeyword(data.keyword);
                          }}
                          className="bg-[#EFF8FF] p-0.5 text-[#1570EF] cursor-pointer rounded text-2xl"
                        />{" "}
                      </span>
                    </td>
                    <td className="  p-2 px-6 rounded-full">
                      <span className={``}>{data.search_volume ?? 0} </span>{" "}
                    </td>
                    <td className="  p-2  rounded-full">
                      <span
                        className={`p-1 w-2/3 rounded-3xl text-center flex items-center justify-center ${
                          data.competition_index > 39
                            ? "bg-[#F6FEF9] text-[#12B76A]"
                            : "bg-[#FFFAEB] text-[#B54708] "
                        }`}
                      >
                        {" "}
                        <GoDotFill />
                        {data.competition_index ?? 0}{" "}
                      </span>{" "}
                    </td>
                    <td className="  p-2 px-6 rounded-full">
                      <span className={``}>${data.cpc ?? 0}</span>{" "}
                    </td>
                    {/* <td className="  p-2 px-6 rounded-full"> */}
                    {/* <span className={`flex items-center gap-2 text-sm`}>
                        {data.serp.includes("link") && <FaLink />}
                        {data.serp.includes("image") && <CiImageOn />}
                        {data.serp.includes("shop") && <IoCartOutline />}
                        {data.serp.includes("video") && <FaVideo />}
                      </span>{" "} */}
                    {/* </td> */}

                    <td className="  p-2 px-6 rounded-full">
                      {data.high_top_of_page_bid ?? 0}
                    </td>

                    <td className="  p-2 px-6 rounded-full">
                      {data.low_top_of_page_bid ?? 0}
                    </td>
                    <td className="  p-2 px-6 rounded-full">
                      <span className={``}>
                        {moment(keywordAnalysisData?.[0].project).fromNow()}
                      </span>
                    </td>
                    <td className="  p-2 px-6  ">
                      <span
                        className={`  border flex p-3 items-center justify-center rounded-lg cursor-pointer text-primary `}
                      >
                        {" "}
                        <FiRefreshCw />
                      </span>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Detail />
      )}
    </main>
  );
}
