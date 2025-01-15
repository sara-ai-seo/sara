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
import { getClassTwo } from "@/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { GiGraduateCap } from "react-icons/gi";
import { FcQuestions } from "react-icons/fc";
import { BsTwitterX } from "react-icons/bs";
import { MdYoutubeSearchedFor } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { LuCrown } from "react-icons/lu";
import { FaRegImages } from "react-icons/fa";
import { countries } from "@/app/component/data/countries";





interface Props {
  se: string;
}

export default function Rankings() {
  const [se, setSe] = useState("google");
  const [add, setAdd] = useState(false);
  const [locationCode, setLocationCode] = useState<number[]>([])
  const [current, setCurrent] = useState<any[]>([])

  const property = CurrentProperty();


  const locations = countries.filter((item: any) => locationCode.includes(item.location_code));

  const handleChange = (selectedValue: string) => {
    const selectedCountry = locations.find(
      (country) => country.location_name === selectedValue
    );
    // console.log("#", selectedCountry); // Logs the selected country
    if (selectedCountry) {
      const matchingItems = google.filter(
        (item: any) => item.location_code === selectedCountry.location_code
      );
      setCurrent(matchingItems); // Updates current with matching items
    } else {
      setCurrent([]); // Sets current to null if no match is found
    }
  };


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


  // console.log("CURRENT", current)


  const featureSnippet = [
    { icon: < GiGraduateCap />, description: "knowledge_graph" },
    { icon: < FcQuestions />, description: "people_also_ask" },
    { icon: < BsTwitterX />, description: "twitter" },
    { icon: < MdYoutubeSearchedFor />, description: "related_searches" },
    { icon: < IoIosStar />, description: "google_reviews" },
    { icon: < GiPerspectiveDiceSixFacesRandom />, description: "perspectives" },
    { icon: < LuCrown />, description: "organic" },
    { icon: < FaRegImages />, description: "images" },

  ]

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
              
              {current.length > 0 ? current.length : se == "google" ? google?.length ?? 0 : bing?.length ?? 0}{" "}
              keywords{" "}
            </p>
            <span>
              

{/* <Select onValueChange={(value) => handleChange(value)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a country" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Countries</SelectLabel>
      {locations.map((country, i) => (
        <SelectItem key={i} value={country.location_name}>
          {country.location_name}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select> */}


              <select
                id="country-select"
                onChange={(e) => handleChange(e.target.value)}
                defaultValue="" // Sets default value to prompt user selection
                className="border rounded-lg p-2"
              >
                <option value="" disabled>
                  Select a country
                </option>
                {locations.map((country, i) => (
                  <option key={i} value={country.location_name}>
                    {country.location_name}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className="overflow-x-auto w-full">
            <Table className="py-4 overflow-x-auto  w-full ">
              <TableHeader className=" bg-[#EAECF0] h-12">
                <TableRow className="rounded-md items-center">
                  <TableHead className="font-medium text-xs text-[#475467] min-w-[200px]  text-left p-2">
                    Keyword
                  </TableHead>
                  <TableHead className="font-medium text-xs text-[#475467]  text-left p-2 flex items-center gap-2 mt-2">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Position <RiExpandUpDownFill />
                    </span>
                  </TableHead>
                  <TableHead className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Volume{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                      <RiExpandUpDownFill />{" "}
                    </span>
                  </TableHead>
                  <TableHead className="font-medium text-xs text-[#475467] whitespace-nowrap   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs `}>
                      {" "}
                      Referring Pages{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                      <RiExpandUpDownFill />{" "}
                    </span>
                  </TableHead>
                  <TableHead className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Backlinks
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                      <RiExpandUpDownFill />{" "}
                    </span>
                  </TableHead>
                  <TableHead className="font-medium text-xs text-[#475467] whitespace-nowrap   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Do-follow
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                      <RiExpandUpDownFill />{" "}
                    </span>
                  </TableHead>
                  <TableHead className="font-medium text-xs text-[#475467] whitespace-nowrap text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      SERP features{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                      <RiExpandUpDownFill />{" "}
                    </span>
                  </TableHead>
                  <TableHead className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      KD{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </TableHead>
                  <TableHead className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      CPC
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </TableHead>
                  <TableHead className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    URL{" "}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs">
                { 
                ( ( current.length > 0 ? current : se == "google" ? google ?? [] : bing ?? []).map(
                  (data: any, index: number) => {

                    const gpastRank =
                      previousRouteGoogle && previousRouteGoogle[index]
                        ? previousRouteGoogle[index].rank
                        : 0;

                    const bpastRank =
                      previousRouteBing && previousRouteBing[index]
                        ? previousRouteBing[index].rank
                        : 0;
                    // !options.includes(data?.location_code) && options.push(data?.location_code)
                    if (data?.location_code && !locationCode.includes(data.location_code)) {
                      locationCode.push(data.location_code);
                    }

                    return (
                      <TableRow className=" border-b">
                        <TableCell className=" p-2 ">{data.keyword} </TableCell>
                        <TableCell className=" p-2 ">
                          <span
                            className={`flex items-center text-xs p-1 gap-1`}
                          >
                            {ShortenNumber(data?.rank)}
                            <span
                              className={` py-0.5 px-2 rounded-full flex items-center gap-1 ${se == "google" && data.rank > gpastRank
                                ? "bg-green-100 text-green-500"
                                : data.rank < gpastRank
                                  ? " bg-red-100 text-red-300 rotate-180"
                                  : ""
                                } ${se == "bing" && data.rank > bpastRank
                                  ? "bg-green-100 text-green-500"
                                  : data.rank < bpastRank
                                    ? " bg-red-100 text-red-300"
                                    : ""
                                }`}
                            >
                              <FaArrowUp />

                            </span>
                            <span className={`text-xs ${getClassTwo(gpastRank, data.rank)}`}>
                              {se == "google"
                                ? data.rank !== gpastRank &&
                                (data.rank - gpastRank).toFixed(2)
                                : data.rank !== bpastRank &&
                                (data.rank - bpastRank).toFixed(2)}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell className="  p-2 rounded-full">
                          <span className={``}>{ShortenNumber(data.search_volume)} </span>{" "}
                        </TableCell>
                        <TableCell className="  p-2 rounded-full">
                          <span className={``}>{ShortenNumber(data.referring_pages)} </span>
                        </TableCell>
                        <TableCell className="  p-2 rounded-full">
                          <span className={``}>{ShortenNumber(data.backlinks)} </span>
                        </TableCell>
                        <TableCell className="  p-2 rounded-full">
                          <span className={``}>{ShortenNumber(data.dofollow)} </span>
                        </TableCell>
                        <TableCell className="  p-2 rounded-full">
                          <span className={`flex items-center gap-2 text-sm`}>


                            {
                              featureSnippet.map((item, i) => {
                                return (

                                  data.serp_item_types.includes(item.description) && (
                                    <button key={i} title={item.description} className={`text-blue-300 font-semibold text-lg`}>
                                      {item.icon}
                                    </button>
                                  )
                                )
                              })
                            }

                          </span>
                        </TableCell>
                        <TableCell className="  p-2 rounded-full">
                          <span className={``}>
                            {ShortenNumber(data.keyword_difficulty)}%
                          </span>{" "}
                        </TableCell>
                        <TableCell className="  p-2 rounded-full">
                          <span className={``}>
                            {ShortenNumber(data.cpc)}
                          </span>
                        </TableCell>
                        <TableCell className="p-2 rounded-full max-w-[200px] overflow-x-auto whitespace-nowrap">
                          <span className="text-blue-500 cursor-pointer inline-block">
                            {data.url}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  }
                ))
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
