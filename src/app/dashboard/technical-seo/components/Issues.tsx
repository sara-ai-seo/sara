import { forwardRef, useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

import { CategoryItem, IssuesType } from "@/types/technicalseo/IssuesType";
import { BsDot } from "react-icons/bs";
import Loader from "@/app/component/Loader";
import IssueCustomAccordion from "./IssueCustomAccordion";
import FeaturedIcon from "@/components/svgComponents/FeaturedIcon";
import { CrawlingData, IssueTab } from "@/types/technicalseo/technicalSeoTypes";
import { useTechnicalSeoFetchData } from "@/app/services/technicalSeo/TechnicalSeoFetch";

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
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCategoryDetail, setCurrentCategoryDetail] =
    useState<CategoryItem | null>(null);

  // Type guard to check if a CrawlingData is of type SitePerformanceData
  function isIssues(data: CrawlingData): data is IssueTab {
    return data.tab === "issues";
  }

  const { data, isLoading } = useTechnicalSeoFetchData();
  console.log("react query issue", data);
  // Extract the `sitePerformance` data
  const siteIssues: IssueTab[] =
    data?.crawlings
      .flatMap((crawling: any) => crawling.crawlingData)
      .filter(isIssues) ?? []; // Filter by tab = 'issues tab'

  const currentDescription = siteIssues[0]?.data.issueArr.find(
    (item) => item.id === currentSitePerfId
  );
  console.log(siteIssues);
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
    {
      name: "Fixed",
      icon: (
        <Image
          src={"/dashboard/fixed.svg"}
          alt="Fixed issues"
          width={24}
          height={24}
        />
      ),
    },
  ];

  interface Props {
    title: string;
  }

  return (
    <>
      <main className="pb-14 grid w-full gap-8 overflow-auto min-h-[400px]">
        <section className="flex  flex-wrap items-center z-10 bg-white justify-between w-full gap-4 ">
          <div className="flex items-center gap-2 flex-wrap">
            {tabsFilter.map((item, index) => (
              <button
                key={index}
                title={item.name}
                className={`flex items-center border shadow-md rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${
                  currentFilter === item.name ? "bg-[#EFF8FF]" : "bg-[#FFF]"
                }`}
                onClick={() => setCurrentFilter(item.name)}
              >
                {item.icon && item.icon} {item.name}, 44
              </button>
            ))}
          </div>
          <div className="flex">
            <div className="flex relative rounded-md min-[375px]:w-[320px] w-[300px] ">
              <input
                type="search"
                placeholder="Search issues"
                className="w-full h-full border p-3 rounded-md focus:outline-none focus:shadow-sm focus:shadow-primary pl-8 "
              />
              <CiSearch className=" absolute top-4 left-4 " />
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className=" w-full h-10 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-8 md:grid-cols-3 max-h-[80dvh]  overflow-auto h-full ">
            <div className="flex flex-col h-full gap-2 col-span-1 border   shadow-sm rounded-md">
              {/* <IssueCustomAccordion title="Crawlability and indexability" /> */}

              <IssueCustomAccordion
                title="Site performance"
                data={siteIssues[0]?.data.issueArr}
                setCurrentSitePerfId={setCurrentSitePerfId}
              />

              <div
                className="grid gap-4 my-4 transition-all ease-linear delay-300 p-3"
                style={{ height: "100%" }}
              >
                {/* {Object.entries(categories).map(([key, value]) => {
                  // console.log("VALUES", value)
                  return (
                    <>
                      {key}: {value}
                      <div
                        className={`w-full flex justify-between cursor-pointer items-center `}
                        onClick={() => {
                          currentCategory === key
                            ? setCurrentCategory("")
                            : setCurrentCategory(key);
                        }}
                      >
                        <h2 className={`text-[#344054] font-semibold text-lg`}>
                          {key}
                        </h2>
                        <IoIosArrowDown
                          className={`${
                            currentCategory == key && "rotate-180"
                          } cursor-pointer transition-all ease-out delay-300`}
                          onClick={() => setfirst(!first)}
                        />
                      </div>
                      {currentCategory === key &&
                        value.map((eachVal, i) => (
                          <div
                            key={i}
                            className={`w-full space-y-1  text-left gap-2 cursor-pointer grid items-center`}
                          >
                            {eachVal.categoryItems.map(
                              (catItem: any, index: number) => (
                                <div
                                  key={index}
                                  className="text-left hover:bg-blue-200 flex line-clamp-2 gap-2 w-full"
                                  onClick={() =>
                                    setCurrentCategoryDetail(catItem)
                                  }
                                >
                                  <Image
                                    src={"/dashboard/error.svg"}
                                    alt="Error"
                                    width={24}
                                    height={24}
                                  />
                                  <span className="">
                                    {catItem.title.replace(/\s+/g, " ")}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        ))}
                    </>
                  );
                })} */}
              </div>

              {/* {
                  currentCategoryDetail.map((item, i) => {
                    return <div key={i} className="flex w-full h-full cursor-pointer  py-2 justify-between items-center" onClick={() => {
                      setIssueCategory(item)
                    }}>
                      <h3 className=" w-[90%] truncate text-[#344054] font-semibold flex items-center"> <BsDot />  {item.issue.title} </h3>
                      <span className={`p-2 px-4 rounded-3xl bg-[#ECFDF3]`}> {item.issue.count} </span>
                    </div>
                  })
                } */}
            </div>

            {
              <div className="flex flex-col md:col-span-2 col-span-1 gap-4">
                <div className="border shadow-sm overflow-auto rounded-md w-full h-full ">
                  <div className="flex gap-6 w-full p-4 items-center font-semibold text-[#101828] text-lg">
                    <FeaturedIcon className="size-10" />{" "}
                    <h2 className=" font-semibold"> Pages with poor CLS: </h2>
                    {/* <h3 className="">{currentCategoryDetail?.title} </h3> */}
                  </div>
                  <div className="overflow-auto h-[30vh] w-full">
                    <table className="w-full text-left table-fixed">
                      <thead className="bg-[#EAECF0] h-14 text-sm font-normal">
                        <tr>
                          <th className="p-2 pl-4 w-[310px]"> URL </th>
                          <th className="p-2 w-[120px]"> Page depth </th>
                          <th className="p-2 w-[120px]"> Internal links </th>
                          <th className="p-2 w-[120px]"> Status code </th>
                          <th className="p-2 w-[120px]"> Indexable </th>
                        </tr>
                      </thead>
                      <tbody className="overflow-auto h-40 p-2 w-full">
                        {currentCategoryDetail?.titleItems[0].pageData.rows.map(
                          (item, i) => {
                            return (
                              <tr key={i} className="px-2 space-y-1 border-y">
                                <td className="px-2 pl-4 space-y-1">
                                  {" "}
                                  {item.website}{" "}
                                </td>
                                <td className="px-2"> {item.crawlDepth} </td>
                                <td className="px-2"> {item.url} </td>
                                <td className="px-2">
                                  {" "}
                                  {item.httpStatusCode}{" "}
                                </td>
                                <td className="px-2"> {item.index_status} </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border shadow-sm h-[170px] overflow-y-auto flex flex-col gap-4  rounded-md w-full p-4 2xl:p-4">
                  <h2 className=" font-semibold text-[#344054] text-2xl ">
                    Issue Description{" "}
                  </h2>
                  {/* <p className="">{currentCategoryDetail?.description}</p> */}
                  <p>
                    {currentDescription?.description ?? "issue Description "}
                  </p>
                </div>
              </div>
            }
          </section>
        )}
      </main>
    </>
  );
}
