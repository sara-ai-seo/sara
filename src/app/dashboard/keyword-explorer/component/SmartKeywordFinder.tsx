import { mockedData } from "@/app/component/data/mockedData";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { CiImageOn, CiSearch } from "react-icons/ci";
import { FaLink, FaPlus, FaQuestion, FaVideo } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { IoCartOutline, IoChevronDownOutline } from "react-icons/io5";
import { MdArrowUpward } from "react-icons/md";
import { DetailButton } from "./KeywordAnalysis";
import { getSmartKeywordFinder, useKeywordIdeas } from "@/app/services/keyword_services/useSmartKeywordFinder";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { abbreviateNumber } from "@/app/utils/abbreviateNumber";
import moment from "moment";
import Loader from "@/app/component/Loader";
import { LuCopy } from "react-icons/lu";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";
import toast from "react-hot-toast";
import { KeywordServicesFetch } from "@/app/services/keyword_services/keyword-services";
import { useMutation } from "@tanstack/react-query";
import PlainButton from "@/app/component/PlainButton";
import { AiOutlineProduct } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tabsFilter = [
  { name: "All keywords" },
  { name: "Related terms" },
  { name: "Matching phrase" },
  { name: "Matching terms" },
  { name: "Questions" },
];

export function SelectorDropdown({
  items,
  icon,
  selected,
  setSelected,
}: {
  items: any[];
  icon?: React.ReactNode;
  selected: string;
  setSelected: () => void;
}) {
  return (
    <Menu as="div" className="  relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        {selected}

        <IoChevronDownOutline
          className="-mr-1 ml-2 h-5 w-5 text-black"
          aria-hidden="true"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <span className="px-1 py-1 ">
            {items.map((prop) => {
              return (
                <Menu.Item key={prop}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={setSelected}
                    >
                      {prop}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </span>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function SmartKeywordFinder({addNew} : {addNew: ()=> void}) {
  const [keyword, setKeyword] = useState("");
  const [keywordData, setKeywordData] = useState<any[]>([]);
  // console.log(keywordData);
  const [keywordLength, setKeywordLength] = useState<any[]>([]);
  const [keywordCategory, setKeywordCategory] = useState("All keywords");
  const [selected, setSelected] = useState("Volume");
  const [isCopy, setIsCopy] = useState(false);
  const [smartKeyword, setSmartKeyword] = useState<any | null>(null);
  const [smartKeywordDetail, setSmartKeywordDetail] = useState<[] | null>(null);

  const { id } = CurrentProperty();
  const KeywordService = new KeywordServicesFetch();

  const {
    isPending,
    isError,
    data: smartKeywordIdea,
  } = useKeywordIdeas(id);

  // const mutation  = useMutation({
  //   mutationFn: ()=>KeywordService.crawl(id, {})
  // })

  // summary table data
const ret = smartKeywordIdea?.project?.crawlings?.map((item: any) => item.crawlingData[0])
const retu = smartKeywordIdea?.project?.crawlings.flatMap((crawlingData: any)=> crawlingData )



const dataItems = retu?.flatMap((item: { crawlingData: any[]; }) => item.crawlingData.flatMap(data => {
 if(data.tab === "tasks"){
const id =  data.data.flatMap((res:any) => res.id)
const detail = data.data.flatMap((res:any) => res.result[0].items)
return data.data
 } else {
  return []
 }

}))

const smart = smartKeywordIdea?.project?.crawlings[0]?.crawlingData[0]
const smartDetail = smartKeywordIdea?.project?.crawlings[0]?.crawlingData[0]?.data[0]?.result[0]?.items?.map((item:any) => item)
const seedKeyword = smartKeywordIdea?.project?.crawlings[0]?.crawlingData[0]?.data[0]?.data?.keywords[0]




// console.log("ITEMS", smartKeywordDetail);

  // console.log("IDEA", returned);

  const data: any[] =
  smartKeywordIdea?.[0]?.project?.crawlings?.[0]?.crawlingData?.[0]?.data
  ?.tasks?.[0]?.result;


  const totalVolume = (smartKeywordDetail ?? []).reduce((acc: number, current: any) => {
    return Number(acc + current.keyword_info.search_volume);
  }, 0);

  const handleOnchangeKeyword = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setKeywordLength((prev) => {
      const newArray: any = [...prev];

      if (e.target.checked) {
        newArray[i] = i;
      } else {
        newArray[i] = null;
      }

      return newArray;
    });
  };
  const validItemsCount = keywordLength.filter((item) => item !== null);

  const handleCopy = async () => {
    try {
      const objArr = validItemsCount?.map((_, i: number) => keywordData[i]);
      const StringData = JSON.stringify(objArr);

      if (!navigator.clipboard) {
        throw new Error("Clipboard API is not supported by this browser.");
      }
      await navigator.clipboard.writeText(StringData);
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy: ", error);
      toast.error(
        "Failed to copy. Clipboard API is not supported in your browser."
      );
    }
  };

  const handleOnchangeKeywordSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = e.target.value.toLowerCase();
    setKeyword(searchTerm);

    if (searchTerm.length > 0) {
      const filteredData = keywordData.filter((item: any) => {
        const keyword = item.keyword.toLowerCase();
        return keyword.includes(searchTerm);
      });

      setKeywordData(filteredData.length > 0 ? filteredData : data);
    } else {
      setKeywordData(data);
    }
  };

  useEffect(() => {
    setKeywordData(dataItems);
    
  }, [dataItems]);
  useEffect(() => {
    setSmartKeyword(smart);
    setSmartKeywordDetail(smartDetail);

  }, [smart, smartKeyword, smartKeywordDetail]);

  return (
    <main className="py-10 grid gap-8 w-fit">
      <section className="flex min-[500px]:flex-row flex-col min-[500px]:items-center gap-2 justify-between w-full">
        <h1 className=" text-2xl text-black font-semibold">
          Keyword: <span className=" font-normal">{seedKeyword} </span>
        </h1>
        <span>
              <PlainButton title={"Add keyword"} icon={<FaPlus />} handleClick={addNew} />
          </span>
        {/* <div className="flex relative rounded-md sm:w-[320px] ">
          <input
            type="search"
            value={keyword}
            onChange={(e) => handleOnchangeKeywordSearch(e)}
            className="w-full h-full border p-3 rounded-md focus:outline-none focus:shadow-sm focus:shadow-primary pl-8 "
          />
          <CiSearch className=" absolute top-4 left-4 " />
          
        </div> */}
      </section>
      {/* <section className="flex xl:flex-row flex-col xl:items-center gap-3 xl:justify-between w-full">
        <div className="flex items-center gap-2 flex-wrap">
          {tabsFilter.map((item, index) => (
            <button
              key={index}
              title={item.name}
              className={`flex items-center border shadow rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${
                keywordCategory === item.name
                  ? "bg-[#EFF8FF] border-none "
                  : "bg-[#FFF]"
              }`}
              onClick={() => setKeywordCategory(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex min-[375px]:flex-row flex-col min-[375px]:items-center gap-4">
          <SelectorDropdown
            items={["Volume", "Quantity", "Awareness"]}
            selected={selected}
            setSelected={() => setSelected}
          />
          <SelectorDropdown
            items={["KD", "Quantity", "Awareness"]}
            selected={"KD"}
            setSelected={() => setSelected}
          />
          <SelectorDropdown
            items={["KD", "Quantity", "Awareness"]}
            selected={"SERP features"}
            setSelected={() => setSelected}
          />
        </div>
      </section> */}
      <section className="overflow-x-auto rounded-md w-full border shadow-sm p-6 ">
        <div className="flex items-center gap-3 mb-3">
          <>
            {/* {validItemsCount.length > 0 ? (
              <p className="text-[#101828] font-medium min-[375px]:text-lg text-sm">
                {validItemsCount.length} selected keywords
              </p>
            ) : (
              <>
                <p className="text-[#101828] font-medium min-[375px]:text-lg text-sm">
                  {dataItems?.length ?? 0} keywords
                </p>
                <p className="text-[#344054] font-medium text-xs px-3 p-2 rounded-2xl bg-[#F2F4F7] ">
                  {abbreviateNumber(totalVolume)} total volume{" "}
                </p>
              </>
            )} */}
             <>
                <p className="text-[#101828] font-medium min-[375px]:text-lg text-sm">
                  {keywordData?.length ?? 0} keywords
                </p>
                <p className="text-[#344054] font-medium text-xs px-3 p-2 rounded-2xl bg-[#F2F4F7] ">
                  {abbreviateNumber(totalVolume)} total volume{" "}
                </p>
              </>
          </>

          {/* {validItemsCount.length > 0 && (
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                className="text-[#175CD3] text-sm"
                onClick={() => setKeywordLength([])}
              >
                unselect all
              </button>
              <button
                onClick={handleCopy}
                type="button"
                className="bg-[#EFF8FF] text-sm gap-1 rounded-md inline-flex items-center py-1 px-2"
              >
                <LuCopy />
                {isCopy ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                className="text-sm gap-1 rounded-md inline-flex items-center py-1 px-2 border"
              >
                <GrUpdate />
                Update
              </button>
            </div>
          )} */}
        </div>
        <div className="overflow-x-auto w-full">
          <Table className="w-full table-fixed">
            <TableHeader className="bg-[#F9FAFB] w-full">
              <TableRow className=" h-[44px] text-xs text-[#475467]  font-medium w-full overflow-x-auto">
                {/* <th className="w-10 text-left">
                  <MdOutlineIndeterminateCheckBox className="text-lg text-[#175CD3] rounded-md" />
                </th> */}
                <TableHead className="text-left min-w-[300px]"> Keywords</TableHead>
                <TableHead className="">
                  <span className="flex items-center gap-1 p-2">
                    Volume <MdArrowUpward />
                  </span>
                </TableHead>
                <TableHead className="">
                  {" "}
                  <span className="flex items-center gap-1 p-2">
                    {" "}
                    Backlinks <DetailButton title={""} />{" "}
                  </span>{" "}
                </TableHead>
                <TableHead className="">
                  {" "}
                  <span className="flex items-center gap-1 p-2">
                    {" "}
                    Competition <DetailButton title={""} />{" "}
                  </span>{" "}
                </TableHead>
                <TableHead className="">
                  <div className="flex items-center gap-1 p-2 ">
                    Competition level <DetailButton title={""} />
                  </div>{" "}
                </TableHead>
                <TableHead className="">
                  {" "}
                  <span className="flex items-center gap-1 p-2">
                    {" "}
                    CPC <DetailButton title={""} />{" "}
                  </span>{" "}
                </TableHead>
                <TableHead className="">
                  {" "}
                  <span className="flex items-center gap-1 p-2">
                    {" "}
                    Rank <DetailButton title={""} />{" "}
                  </span>{" "}
                </TableHead>
                <TableHead className="">
                  {" "}
                  <span className="flex items-center gap-1 p-2">
                    {" "}
                    SERP features <DetailButton title={""} />
                  </span>{" "}
                </TableHead>
                <TableHead className="">
                  {" "}
                  <span className="flex items-center gap-1 p-2">
                    {" "}
                    Update
                  </span>{" "}
                </TableHead>
                <TableHead className=""> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending && (
                <TableRow className="h-20 w-full ">
                  <Loader />
                </TableRow>
              )}

              {isError && (
                <TableRow className="h-20 w-full ">Something went wrong</TableRow>
              )}

              {keywordData?.length === 0 && (
                <div className="h-20 w-full text-nowrap">No data</div>
              )}
              {smartKeywordDetail?.map((data: any, i: number) => {
                // console.log("DD", data)
                return (
                  <TableRow className={`border-b ${i === smartKeywordDetail.length - 1 ? 'border-b-0' : ''}`}>
                    {/* <td>
                      <input
                        type="checkbox"
                        checked={keywordLength.includes(i)}
                        className=""
                        onChange={(e) => handleOnchangeKeyword(e, i)}
                      />
                    </td> */}
                    <TableCell className=" p-2">{data.keyword} </TableCell>

                    <TableCell className="rounded-full">
                      <span className={``}>{data?.keyword_info?.search_volume ?? 0} </span>
                    </TableCell>
                    <TableCell className="rounded-full">
                      <span className={``}>{data?.avg_backlinks_info?.backlinks ?? 0} </span>
                    </TableCell>
                    <TableCell className="  p-2  rounded-full">
                      <span
                        className={`p-1 w-2/3 rounded-3xl text-center flex items-center justify-center ${
                          data.keyword_info?.competition > 0.6
                            ? "bg-[#F6FEF9] text-[#12B76A]"
                            : "bg-[#FFFAEB] text-[#B54708] "
                        }`}
                      >
                        <GoDotFill />
                        {data?.keyword_info?.competition ?? 0}
                      </span>
                    </TableCell>
                    <TableCell className="rounded-full p-2">
                      <span className={``}>{data?.keyword_info?.competition_level ?? ""}</span>
                    </TableCell>
                    <TableCell className="rounded-full p-2">
                      <span className={``}>{data?.keyword_info?.cpc ?? 0}</span>
                    </TableCell>
                    <TableCell className="rounded-full p-2">
                      <span className={``}>{data?.avg_backlinks_info?.rank ?? 0}</span>
                    </TableCell>
                    <TableCell className="rounded-full p-2">
                      <span className={`flex items-center gap-2 text-sm`}>
                        {data.serp_info.serp_item_types.includes("link") && <FaLink />}
                        {data.serp_info.serp_item_types.includes("image") && <CiImageOn />}
                        {data.serp_info.serp_item_types.includes("shop") && <IoCartOutline />}
                        {data.serp_info.serp_item_types.includes("video") && <FaVideo />}
                        {data.serp_info.serp_item_types.includes("people_also_ask") && <FaQuestion />}
                        {data.serp_info.serp_item_types.includes("related_searches") && <CiSearch />}
                        {data.serp_info.serp_item_types.includes("popular_products") && <AiOutlineProduct />}
                      </span>

                    </TableCell>
                    <TableCell className="rounded-full p-2 ">
                      <span className={``}>
                        {moment(data?.search_intent_info?.last_updated_time).fromNow()}
                       
                      </span>
                    </TableCell>
                    {/* <td className=" ">
                      <span
                        onClick={() => ""}
                        className={`border flex p-3 items-center justify-center rounded-lg cursor-pointer text-primary `}
                      >
                        <FiRefreshCw />
                      </span>
                    </td> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
