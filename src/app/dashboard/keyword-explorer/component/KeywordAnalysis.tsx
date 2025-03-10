import PlainButton from "@/app/component/PlainButton";
import React, { useState, useEffect } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { GoDotFill, GoQuestion } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  Title,
  TitleWithoutUnderline,
} from "../../technical-seo/components/Overview";
import ProgressiveCircleReusable from "../../components/ProgressiveCircleReusable";
import { CustomDoughnutChart } from "../../technical-seo/components/(technicalseo)/DoughnutChart";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { useKeywordAnalysisData } from "@/app/services/crawlers/keywordExplorer";

import moment from "moment";
import Loader from "@/app/component/Loader";
import { CrawlingData, GoogleSearchVolume, BingSearchVolumeData, KeywordIdea, GlobalSearchVolume } from "@/types/keyword/keywordAnalysisDto";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ShowDescription from "@/app/component/ShowDescription";




export const DetailButton = ({ title }: { title: string }) => (
  <button className="" title={title}>
    <GoQuestion />
  </button>
);
export default function KeywordAnalysis({ addNew }: { addNew: () => void }) {
  const [detail, setDetail] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [currentData, setCurrentData] = useState<any | null>(null)
  const [keywordData, setKeywordData] = useState<[] | null>(null)

  const currentProperty = CurrentProperty();

  const { keywordAnalysisData, isPending, isSuccess, isError } =
    useKeywordAnalysisData(currentProperty.id);

  const oneKeyword = keywordAnalysisData?.project?.crawlings.map((item: any) => item.crawlingData)
  useEffect(() => {
    setKeywordData(oneKeyword)
  }, [keywordAnalysisData])

// console.log("#", keywordData)

  const colors = [
    "#FF6F61",
    "#6FA3EF",
    "#F7B7A3",
    "#F2E4B8",
    "#E2D1C3",
    "#B2D7A2",
    "#A4D65E",
    "#FFD700",
    "#FF9A8B",
    "#6B5B95",
  ];

  const googleSearchVolume: GoogleSearchVolume[] = (currentData ?? [])?.find((item: any) => item.tab === "googleSearchVolume")?.data
  const currGlobal: GlobalSearchVolume[] = (currentData ?? [])?.find((item: any) => item.tab === "globalSearchVolume")?.data
  const keywordIdeas: any = (currentData ?? [])?.find((item: any) => item.tab === "keywordIdeas")?.data
  // console.log("@",  (currentData ?? [])?.find((item: any) => item.tab === "googleSearchVolume"))
  // console.log("@", googleSearchVolume && (googleSearchVolume[0]?.competition_index))
  // console.log("#", keywordIdeas)

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
              <p className="font-normal"> 
                {/* {moment((currentData ?? [])?.find((item: any) => item?.tab === "googleSearchVolume").updatedAt).fromNow() ?? ""} */}
                {moment(currentData[0]?.updatedAt).fromNow() ?? ""}

                </p>
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
              {/* <ProgressiveCircleReusable value={(currentData ?? [])?.find((item: any) => item.tab === "googleSearchVolume")?.data?.competition_index ?? 0} title={currentData?.competition ?? ""} /> */}
              <ProgressiveCircleReusable value={googleSearchVolume[0]?.competition_index ?? 0} title={currentData?.competition ?? ""} />
            </div>
          </div>
          <div className="rounded-md md:grid-cols-1 min-[500px]:grid-cols-2 grid-cols-1 col-span-2 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-1 items-center"> 
                  <TitleWithoutUnderline title="High top-of-page bid" info={"refers to the maximum amount an advertiser is willing to pay for their ad to appear at the very top of search results. It indicates a competitive bid aimed at gaining more visibility, as ads in this position are more likely to be seen and clicked by users. Essentially, it's about paying more to ensure your ad stands out in search results."} />
                </CardTitle>
                <CardDescription> </CardDescription>
              </CardHeader>
              <CardContent className={`flex gap-3 items-center ${
                googleSearchVolume[0]?.high_top_of_page_bid < 2 ? "text-red-500" 
                : googleSearchVolume[0]?.high_top_of_page_bid < 5 && googleSearchVolume[0]?.high_top_of_page_bid > 2 ? "text-yellow-500"
                : "text-green-500"
              }`}>
                <h2 className={`text-2xl ${
                  googleSearchVolume[0]?.high_top_of_page_bid < 2 ? "text-red-500" 
                  : googleSearchVolume[0]?.high_top_of_page_bid < 5 && googleSearchVolume[0]?.high_top_of_page_bid > 2 ? "text-yellow-500"
                  : "text-green-500"
                }}`
                }
                  > 
                  {googleSearchVolume[0]?.high_top_of_page_bid} </h2>
              </CardContent>
              <CardFooter>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-1 items-center "> 
       
                  <TitleWithoutUnderline title={"Cost Per Click (CPC)"} info={"refers to the maximum amount an advertiser is willing to pay for each click on their ad. It’s a key metric in online advertising that helps measure the cost-effectiveness of a campaign"} />
                </CardTitle>
                <CardDescription> </CardDescription>
              </CardHeader>
              <CardContent className={`flex gap-3 items-center ${
                googleSearchVolume[0]?.cpc < 2 ? "text-green-500" 
                : googleSearchVolume[0]?.cpc < 5 && googleSearchVolume[0]?.cpc > 2 ? "text-yellow-500"
                : "text-red-500"
              } `}>
                <h2 className={`text-2xl text-green-500}`}
                  > 
                  {googleSearchVolume[0]?.cpc} </h2>
              </CardContent>
              <CardFooter>
              </CardFooter>
            </Card>
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
                <CustomDoughnutChart labels={currGlobal?.map((item:GlobalSearchVolume, i) => item.country_iso_code ) ?? []} label={"Countries"} data={currGlobal?.map((item:GlobalSearchVolume) => item.search_volume ) ?? []} backgroundColor={colors} borderColor={colors} borderWidth={0} />
              </div>

              <div className="flex justify-center flex-col w-full">
                {
                  currGlobal?.map((country: GlobalSearchVolume, i:number) => {
                    return (
                      <p className="flex gap-2 items-center" key={i}>
                  <GoDotFill className={``} style={{color: colors[i]}} /> {country.country_iso_code}
                </p>
                    )
                  })
                }
                
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
                  {keywordIdeas?.length}
                </p>
              </div>
              <div className="rounded-md border shadow-sm">
                <Table className="w-full">
                  <TableHeader className="bg-gray-100 w-full">
                    <TableRow className="w-full justify-between">
                      <TableHead className="p-4 text-left rounded-tl-md "> Keyword</TableHead>
                      <TableHead className="p-4 text-left rounded-tr-md h-14">
                        {" "}
                        Volume
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="w-full">
                    {
                      keywordIdeas?.map((item: any, i: number) => {
                        return (
                          <TableRow key={i} className="w-full">
                            <TableCell className="p-4 w-full"> {item.keyword}</TableCell>
                            <TableCell className="p-4 text-left "> {item?.search_volume}</TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </div>
              {/* <div className="flex justify-end w-full">
                <button className="p-2 px-3 bg-[#EFF8FF] text-primary rounded-md font-semibold">
                  View all
                </button>
              </div> */}
            </div>

            {/* <div className="flex flex-col gap-4">
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
                <Table className="w-full">
                  <TableHeader className="bg-gray-100 w-full">
                    <TableRow className="w-full justify-between">
                      <th className="p-4 text-left rounded-tl-md "> Keyword</th>
                      <TableHead className="p-4 text-left rounded-tr-md h-14">
                        {" "}
                        Volume
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="w-full">
                    <TableRow className="w-full">
                      <TableCell className="p-4 w-full"> What is branding</TableCell>
                      <TableCell className="p-4 text-left "> 344</TableCell>
                    </TableRow>
                    <TableRow className="w-full">
                      <TableCell className="p-4 w-full">How to brand a business</TableCell>
                      <TableCell className="p-4 text-left "> 664</TableCell>
                    </TableRow>
                    <TableRow className="w-full">
                      <TableCell className="p-4 w-full"> Why do business branding</TableCell>
                      <TableCell className="p-4 text-left "> 122</TableCell>
                    </TableRow>
                    <TableRow className="w-full">
                      <TableCell className="p-4 w-full"> How to brand a business</TableCell>
                      <TableCell className="p-4 text-left "> 422</TableCell>
                    </TableRow>
                    <TableRow className="w-full">
                      <TableCell className="p-4 w-full"> How to brand a business</TableCell>
                      <TableCell className="p-4 text-left "> 43</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end w-full">
                <button className="p-2 px-3 bg-[#EFF8FF] text-primary rounded-md font-semibold">
                  View all
                </button>
              </div>
            </div> */}
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
              {oneKeyword?.length} keywords{" "}
            </p>
            <span>
              <PlainButton title={"Add keyword"} icon={<FaPlus />} handleClick={addNew} />
            </span>
          </div>



          <div className="rounded-md border w-full overflow-auto">
            <Table>
              <TableHeader className="w-full">
                <TableRow className="w-full">
                  <TableHead className="">Keyword <ShowDescription description="The search term you’re analyzing" /> </TableHead>
                  <TableHead>CPC <ShowDescription description="How much advertisers typically pay for a click when this keyword is used. "/> </TableHead>
                  <TableHead>Search Volume <ShowDescription description="The number of times this keyword is searched over a period. "/> </TableHead>
                  <TableHead>Competition <ShowDescription description="How many advertisers are bidding on this keyword. "/> </TableHead>
                  <TableHead className="">KD <ShowDescription description="A score showing how tough it is to rank for this keyword. "/> </TableHead>
                  <TableHead className="">Location Code <ShowDescription description="A code representing the geographic area for the search data. "/> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full">
                {keywordData?.length === 0 && (
                  <TableRow className="w-full">
                    <TableCell className="p-4 text-center">No data found</TableCell>
                  </TableRow>
                )}

                {isPending && (
                  <div className="h-20 w-full justify-center items-center">
                    <Loader />
                  </div>
                )}

{

  keywordData?.map((item: any, i: number) => {
    const google = item.find((fig: CrawlingData) => fig.tab === "googleSearchVolume")?.data ?? {} as GoogleSearchVolume
    const bing = item.find((fig: CrawlingData) => fig.tab === "bingSearchVolume")?.data ?? {} as BingSearchVolumeData
    const KD = item.find((fig: any) => fig.tab === "keywordIdeas")?.data[0]?.parent_keyword_difficulty
    
    // const check = item?.find((x) => x.tab === "keywordIdeas")

    // Skip rendering if no google data is available
    if (!google[0]?.keyword) return null;

    return (
      <TableRow key={i} className="w-full">
        <TableCell className="">
          <span className="flex items-center gap-2 ">
            {google[0]?.keyword}
            <AiOutlineExpandAlt
              onClick={() => {
                setDetail(true);
                setKeyword(google[0]?.keyword);
                setCurrentData(item);
              }}
              className="bg-[#EFF8FF] p-0.5 text-[#1570EF] cursor-pointer rounded text-2xl"
            />
          </span>
        </TableCell>
        <TableCell className=""> {google[0]?.cpc ?? '-'} </TableCell>
        <TableCell className=""> {google[0]?.search_volume ?? '-'} </TableCell>
        <TableCell className=""> {google[0]?.competition ?? '-'} </TableCell>
        {/* <TableCell className=""> {google[0]?.competition_index ?? '-'} </TableCell> */}
        <TableCell className=""> {KD ? `${KD.toFixed(2) }%` :  "NA"} </TableCell>
        <TableCell className=""> {google[0]?.location_code ?? '-'} </TableCell>
      </TableRow>
    )
  })
}
              </TableBody>
            </Table>

          </div>
        </div>

      ) : (
        <Detail />
      )}
    </main>
  );
}
