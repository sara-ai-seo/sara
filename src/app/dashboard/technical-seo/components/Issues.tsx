import { forwardRef, useState, useEffect } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

import { CategoryItem, IssuesType } from "@/types/technicalseo/IssuesType";
import { BsDot } from "react-icons/bs";
import Loader from "@/app/component/Loader";
import IssueCustomAccordion from "./IssueCustomAccordion";
import FeaturedIcon from "@/components/svgComponents/FeaturedIcon";
import { CrawlingData, IssueTab } from "@/types/technicalseo/technicalSeoTypes";
// import { useTechnicalSeoFetchData } from "@/app/services/technicalSeo/TechnicalSeoFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { issuesData } from "./(technicalseo)/issueData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Button from "../../components/ui/Button";
import { FaCaretUp } from "react-icons/fa6";


export default function Issues() {
  const categories: { [key: string]: any[] } = {};

  // const loading = useSelector((state: RootState) => state.loading.loading);
  const [currentFilter, setCurrentFilter] = useState("All issues");
  const [currentSitePerfId, setCurrentSitePerfId] = useState("");
  const [issueData, setissueData] = useState<
    | {
      id: string;
      score: number;
      title: string;
      description: string;
      scoreDisplayMode: string;
    }
    | undefined
  >(undefined);

  const [first, setfirst] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentCategoryDetail, setCurrentCategoryDetail] =
    useState({
      description: "",
      fix: ""
    });

  const id = CurrentProperty()

  const issues = useQuery({

    queryKey: ["issues"],
    queryFn: async () => {
      const response = await ApiCall.get(`/user/crawler/technical-seo/by-tab/${id.id}?tab=issues`);
      return response.data;
    }
  })


  const rawData = issues?.data?.project?.crawlings[0]?.crawlingData[0]?.data?.issues;
  const capitalizeFirstLetter = (val: string) => {
    if (!val) return '';
    return val.charAt(0).toUpperCase() + val.slice(1);
  };


  //  const renderData = rawData && Object?.entries(rawData as Record<string, number>).filter(([key, val]) => val > 0)
  interface filteredDataDto {
    [key: string]: number;
  }
  const filterData = (): filteredDataDto => {
    return (rawData && Object.entries(rawData as Record<string, number>)
      .filter(([key, value]) => value > 0)
      .reduce((acc, [key, value]) => {
        acc[key] = value as number;
        return acc;
      }, {} as Record<string, number>));
  };



  const tabsFilter = [
    { name: "All issues" },
    {
      name: "Errors",
      icon: (
        <Image
          src={"/dashboard/error.svg"}
          alt="Error"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "Warnings",
      icon: (
        <Image
          src={"/dashboard/warning.svg"}
          alt="Warning issues"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "Notices",
      icon: (
        <Image
          src={"/dashboard/notices.svg"}
          alt="Notices"
          width={24}
          height={24}
        />
      ),
    },
    // {
    //   name: "Fixed",
    //   icon: (
    //     <Image
    //       src={"/dashboard/fixed.svg"}
    //       alt="Fixed issues"
    //       width={24}
    //       height={24}
    //     />
    //   ),
    // },
  ];

  interface Props {
    title: string;
  }

  const getIssueByTitle = (title: string) => {
    return issuesData.find(issue => issue.title.includes(title));
  };


  return (
    <>

      {/* TOP FILTERS  */}
      <section className=" grid w-full gap-8 overflow-auto h-32">
        <div className="flex  flex-wrap items-center z-10 bg-white justify-between w-full gap-4 ">
          <div className="flex items-center gap-2 flex-wrap">
            {tabsFilter.map((item, index) => (
              <button
                key={index}
                title={item.name}
                className={`flex items-center border shadow-md rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${currentFilter === item.name ? "bg-[#EFF8FF]" : "bg-[#FFF]"
                  }`}
                onClick={() => setCurrentFilter(item.name)}
              >
                {item.icon && item.icon} {item.name}, {item.name == "All issues" ? filterData() && Object.keys(filterData()).length : 0}
              </button>
            ))}
          </div>
        </div>

      </section>
      {/* ERROR DATA  */}

      {
        issues.isPending ?
          <div className="h-14 w-full flex items-center">
            <Loader />
          </div> :
          <div className="overflow-x-auto">
            <Table className="min-w-full flex flex-col gap-2 h-full pb-20">
              <TableBody>
                {Object.entries(filterData()).map(([key, value]) => {
                  return (
                    <TableRow className="w-full h-full flex items-center">
                      <TableCell className="w-full">
                        <span className="flex items-center flex-nowrap gap-2">
                          {/* {
                  data.category === "Errors" ? tabsFilter[1].icon :
                  data.category === "Warnings" ? tabsFilter[2].icon :
                  data.category === "Notices" ? tabsFilter[3].icon : 
                  } */}
                          {tabsFilter[1].icon}
                          <span>{capitalizeFirstLetter(key)}</span>
                        </span>
                      </TableCell>
                      <TableCell className="w-full flex-nowrap flex">
                        {value} pages
                      </TableCell>
                      <TableCell className="w-full">
                        <Popover >
                          <PopoverTrigger asChild onClick={()=> {
                            const data = getIssueByTitle(key)
                            setCurrentCategoryDetail({
                              description: data?.Description || "",
                              fix: data?.["How to Fix"] || ""
                            })
                          }}>
                            <span className="flex items-center gap-2 cursor-pointer"> Description and how to fix <FaCaretUp /> </span>
                          </PopoverTrigger>
                          <PopoverContent className="w-96 p-0 min-h-24">
                            <div className="grid gap-4 grid-cols-2 h-full">
                              <div className="space-y-3 p-2">
                                <h4 className="font-medium leading-none">Issue Description</h4>
                                <span className="text-sm text-muted-foreground">
                                  {currentCategoryDetail.description ?? "NA"}
                                </span>
                              </div>
                              <div className="bg-green-300 h-full min-h-24">
                                <div className="space-y-3 p-2">
                                  <h4 className="font-medium leading-none">How to fix</h4>
                                  <span className="text-sm text-muted-foreground">
                                   {currentCategoryDetail.fix ?? "NA"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>

                        </Popover>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
      }
    </>
  );
}
