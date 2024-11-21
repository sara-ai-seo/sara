import AutoModal from "@/app/component/modals/AutoModal";
import PlainButton from "@/app/component/PlainButton";
import { useRankTrackingOverview } from "@/app/services/crawlers/rank_tracking";
import React, { useState } from "react";
import { CiImageOn, CiSquareQuestion } from "react-icons/ci";
import {
  FaArrowDown,
  FaArrowUp,
  FaLink,
  FaPlus,
  FaQuestion,
  FaVideo,
} from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineArrowForward } from "react-icons/md";
import { RiExpandUpDownFill } from "react-icons/ri";
import AddKeywordModal from "./AddKeywordModal";
import { CurrentProperty } from "@/app/utils/currentProperty";
import Loader from "@/app/component/Loader";

interface Props {
  se: string;
}

// const mocked = [
//   {
//     keyword: "When we price goods",
//     position: 20,
//     increase: true,
//     volume: 40,
//     serp: ["link", "image", "shop"],
//     kd: 20,
//     traffic: 35,
//     url: "www.ogene.com",
//   },
//   {
//     keyword: "When we price goods",
//     position: 30,
//     increase: true,
//     volume: 30,
//     serp: ["link", "video", "shop"],
//     kd: 20,
//     traffic: 35,
//     url: "www.ogene.com",
//   },
//   {
//     keyword: "When we price goods",
//     position: 34,
//     increase: true,
//     volume: 28,
//     serp: ["location", "image", "shop"],
//     kd: 20,
//     traffic: 35,
//     url: "www.ogene.com",
//   },
//   {
//     keyword: "When we price goods",
//     position: 43,
//     increase: true,
//     volume: 43,
//     serp: ["link", "image", "shop", "location", "video"],
//     kd: 20,
//     traffic: 35,
//     url: "www.ogene.com",
//   },
//   {
//     keyword: "When we price goods",
//     position: 10,
//     increase: true,
//     volume: 90,
//     serp: ["link", "image", "shop", "video"],
//     kd: 20,
//     traffic: 35,
//     url: "www.ogene.com",
//   },
// ];
export default function Rankings() {
  const [se, setSe] = useState("google");
  const [add, setAdd] = useState(false);

  const property = CurrentProperty();

  const {
    isError,
    isPending,
    isSuccess,
    data: rankingData,
  } = useRankTrackingOverview("ranking", property.id);
  const route = rankingData?.project?.crawlings[0]?.crawlingData[0]?.data;

  const previousRouteBing =
    rankingData?.project?.crawlings[1]?.crawlingData[0]?.data?.bing;
  const previousRouteGoogle =
    rankingData?.project?.crawlings[1]?.crawlingData[0]?.data?.google;

  // const bing = route?.bing?.map((item:any)=> item)
  // const google = route?.google?.map((item:any)=> item)

  const bing =
    route?.bing && Array.isArray(route.bing)
      ? route.bing.map((item: any) => item)
      : [];

  const google =
    route?.google && Array.isArray(route.google)
      ? route.google.map((item: any) => item)
      : [];

  // console.log("RANKING", route?.bing)

  return isPending ? (
    <div className="h-20 w-full flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <>
      {add && (
        <AutoModal
          closeModal={() => setAdd(false)}
          ModalBody={<AddKeywordModal />}
        />
      )}
      <main className="grid w-full h-full items-start content-start gap-6 my-10 mb-20 overflow-auto">
        <div className="grid h-full w-full border rounded-md ">
          <div className="flex w-full items-center justify-between p-6">
            <p className={` font-medium text-[#101828] text-lg`}>
              {" "}
              {se == "google" ? google?.length ?? 0 : bing?.length ?? 0}{" "}
              keywords{" "}
            </p>
            {/* <span>
              <PlainButton
                title={"Add keyword"}
                icon={<FaPlus />}
                handleClick={() => setAdd(true)}
              />
            </span> */}
          </div>
          <div className="overflow-x-auto w-full">
            <table className="py-4 overflow-x-auto  w-full ">
              <thead className=" bg-[#EAECF0] h-12">
                <tr className="rounded-md items-center">
                  <th className="font-medium text-xs text-[#475467] min-w-[360px]  text-left p-2">
                    Keyword
                  </th>
                  <th className="font-medium text-xs text-[#475467]  text-left p-2 flex items-center gap-2 mt-2">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Position <RiExpandUpDownFill />
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Volume{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                      <RiExpandUpDownFill />{" "}
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467]  min-w-[240px] text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      SERP features{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                      <RiExpandUpDownFill />{" "}
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      KD{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      CPC
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    URL{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {(se == "google" ? google ?? [] : bing ?? []).map(
                  (data: any, index: number) => {
                    // const gpastRank = previousRouteGoogle[index]?.rank ?? 0
                    // const bpastRank = previousRouteBing[index]?.rank ?? 0

                    const gpastRank =
                      previousRouteGoogle && previousRouteGoogle[index]
                        ? previousRouteGoogle[index].rank
                        : 0;

                    const bpastRank =
                      previousRouteBing && previousRouteBing[index]
                        ? previousRouteBing[index].rank
                        : 0;

                    return (
                      <tr className=" border-b">
                        <td className=" p-2 ">{data.keyword} </td>
                        <td className=" p-2 ">
                          <span
                            className={`flex items-center text-xs p-1 gap-1`}
                          >
                            {data.rank.toFixed(2)}
                            <span
                              className={` py-0.5 px-2 rounded-full flex items-center gap-1 ${
                                se == "google" && data.rank > gpastRank
                                  ? "bg-green-100 text-green-500"
                                  : data.rank < gpastRank
                                  ? " bg-red-100 text-red-300 rotate-180"
                                  : ""
                              } ${
                                se == "bing" && data.rank > bpastRank
                                  ? "bg-green-100 text-green-500"
                                  : data.rank < bpastRank
                                  ? " bg-red-100 text-red-300"
                                  : ""
                              }`}
                            >
                              <FaArrowUp />{" "}
                              {se == "google"
                                ? data.rank !== gpastRank &&
                                  (data.rank - gpastRank).toFixed(2)
                                : data.rank !== bpastRank &&
                                  (data.rank - bpastRank).toFixed(2)}
                            </span>{" "}
                          </span>
                        </td>
                        <td className="  p-2 rounded-full">
                          <span className={``}>{data.search_volume} </span>{" "}
                        </td>
                        <td className="  p-2 rounded-full">
                          <span className={`flex items-center gap-2 text-sm`}>
                            {data.serp_item_types.includes("link") && (
                              <FaLink />
                            )}
                            {data.serp_item_types.includes("images") && (
                              <CiImageOn />
                            )}
                            {data.serp_item_types.includes("shop") && (
                              <IoCartOutline />
                            )}
                            {data.serp_item_types.includes("video") && (
                              <FaVideo />
                            )}
                            {data.serp_item_types.includes(
                              "people_also_ask"
                            ) && <FaQuestion />}
                          </span>{" "}
                        </td>
                        <td className="  p-2 rounded-full">
                          <span className={``}>
                            {data.keyword_difficulty}%{" "}
                          </span>{" "}
                        </td>
                        <td className="  p-2 rounded-full">
                          <span className={``}>
                            {data.cpc?.toFixed(2) ?? 0}
                          </span>
                        </td>
                        <td className="p-2 rounded-full max-w-[200px] overflow-x-auto whitespace-nowrap">
                          <span className="text-blue-500 cursor-pointer inline-block">
                            {data.url}{" "}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          {/* <section className="w-full flex justify-between items-center py-4 px-4 ">
              <button
                type="button"
                className="border rounded-md p-2 px-4 sm:text-lg font-semibold flex items-center gap-2 hover:bg-gray-200"
              >
                <MdOutlineArrowForward className="sm:text-2xl text-lg rotate-180" />{" "}
                Previous
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="hover:bg-green-50  rounded-md p-2 px-4 "
                >
                  1
                </button>
                <button
                  type="button"
                  className="hover:bg-green-50  rounded-md p-2 px-4 "
                >
                  2
                </button>
              </div>
              <button
                type="button"
                className="border rounded-md p-2 px-4 sm:text-lg font-semibold flex items-center gap-2 hover:bg-gray-200"
              >
                Next
                <MdOutlineArrowForward className="sm:text-2xl text-lg" />
              </button>
            </section> */}
        </div>
      </main>
    </>
  );
}
