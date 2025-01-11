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
import { IoMdArrowRoundBack } from "react-icons/io";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "../../components/ui/Button";

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
                      className={`${active ? "bg-primary text-white" : "text-gray-900"
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

export default function SmartKeywordFinder({ addNew }: { addNew: () => void }) {
  const [keyword, setKeyword] = useState("");
  const [keywordData, setKeywordData] = useState<any[]>([]);
  const [keywordLength, setKeywordLength] = useState<any[]>([]);
  const [keywordCategory, setKeywordCategory] = useState("All keywords");
  const [selected, setSelected] = useState("Volume");
  const [isCopy, setIsCopy] = useState(false);
  const [smartKeyword, setSmartKeyword] = useState<any | null>(null);
  const [smartKeywordDetail, setSmartKeywordDetail] = useState<[] | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentKeywordDetail, setCurrentKeywordDetail] = useState<any | null>(null);

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
  const ret = smartKeywordIdea?.project?.crawlings?.map((item: any) => item.crawlingData)
  const retu = smartKeywordIdea?.project?.crawlings.flatMap((crawlingData: any) => crawlingData?.data?.value)




  const smart = smartKeywordIdea?.project?.crawlings[0]?.crawlingData[0]
  const smartDetail = smartKeywordIdea?.project?.crawlings[0]?.crawlingData[0]?.data[0]?.result[0]?.items?.map((item: any) => item)


  const data: any[] =
    smartKeywordIdea?.[0]?.project?.crawlings?.[0]?.crawlingData?.[0]?.data
      ?.tasks?.[0]?.result;


  const totalVolume = (currentKeywordDetail ?? []).reduce((acc: number, current: any) => {
    return Number(acc + current.keyword_info.search_volume);
  }, 0);


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

  useEffect(() => {
    setSmartKeyword(smart);
    setSmartKeywordDetail(smartDetail);

  }, []);

  function SeedKeywords() {
    return (
      <div className="flex flex-wrap gap-2">
        {retu?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 rounded-lg shadow-sm border hover:bg-gray-100 cursor-pointer"
            style={{ width: 'fit-content' }}
            onClick={() => {
              setShowDetail(true);
              setKeyword(item);
              setCurrentKeywordDetail(ret[index][0]?.data[0]?.result[0]?.items.slice(0, 50));
              // currentKeyword[0]?.data[0]?.result[0]?.items.slice(0,50)
            }}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className="py-10 grid gap-8 w-fit">
      <section className="flex md:min-[700px]:flex-row lg:md:min-[1200px]:flex-row flex-col min-[500px]:items-center gap-2 justify-between w-full">
        <div className="flex items-center gap-2 flex-wrap ">
          {
            showDetail && <Button variant="text" onClick={() => setShowDetail(false)} className="flex items-center gap-2">
              <IoMdArrowRoundBack />
              <span className="text-sm">Back</span>
            </Button>
          }

          <h1 className=" text-2xl text-black font-semibold">
            {
              showDetail ? <span> Keyword: <span className=" font-normal"> {keyword} </span> </span>
                :
                <span className=" font-normal"> Searched Keywords </span>
            }
          </h1>
        </div>
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

      {showDetail ? <section className="overflow-x-auto rounded-md w-full border shadow-sm p-6 ">
        <div className="flex items-center gap-3 mb-3">


          <>
            <p className="text-[#101828] font-medium min-[375px]:text-lg text-sm">
              {currentKeywordDetail?.length ?? 0} keywords
            </p>
            <p className="text-[#344054] font-medium text-xs px-3 p-2 rounded-2xl bg-[#F2F4F7] ">
              {abbreviateNumber(totalVolume)} total volume{" "}
            </p>
          </>



        </div>
        <div className="overflow-x-auto w-full">
          <Table className="w-full table-auto border-collapse">
            <TableHeader className="bg-[#F9FAFB] w-full sticky top-0">
              <TableRow className="h-[44px] text-xs text-[#475467] font-medium w-full">
                {/* ... Table Headers ... */}
                <TableHead className="text-left whitespace-nowrap min-w-[200px]">Keywords</TableHead> {/* whitespace-nowrap and min-w */}
                <TableHead className="whitespace-nowrap">Volume</TableHead> {/* whitespace-nowrap */}
                <TableHead className="whitespace-nowrap">Backlinks</TableHead>
                <TableHead className="whitespace-nowrap">Competition</TableHead>
                <TableHead className="whitespace-nowrap">Competition level</TableHead>
                <TableHead className="whitespace-nowrap">CPC</TableHead>
                <TableHead className="whitespace-nowrap">Rank</TableHead>
                <TableHead className="whitespace-nowrap">Keyword Difficulty</TableHead>
                <TableHead className="whitespace-nowrap">Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* ... Table Rows ... */}
              {currentKeywordDetail?.map((data: any, i: number) => (
                <TableRow className={`border-b ${i === currentKeywordDetail?.length - 1 ? 'border-b-0' : ''}`} key={i}>
                  <TableCell className="p-2 whitespace-nowrap">{data.keyword}</TableCell> {/* whitespace-nowrap */}
                  <TableCell className="rounded-full whitespace-nowrap">{data?.keyword_info?.search_volume ?? 0}</TableCell>
                  <TableCell className="rounded-full whitespace-nowrap">{data?.avg_backlinks_info?.backlinks ?? 0}</TableCell>
                  <TableCell className="p-2 rounded-full whitespace-nowrap">
                    <span className={`p-1 w-2/3 rounded-3xl text-center flex items-center justify-center 
                 ${data.keyword_info?.competition_level === "HIGH" ? "bg-[#F6FEF9] text-[#12B76A]" :
                        data?.keyword_info?.competition_level === "MEDIUM" ? "bg-[#FFFAEB] text-[#79efb8]" : "bg-[#FFFAEB] text-[#B54708]"}`}>
                      {/* :"bg-[#FFFAEB] text-[#B54708]"}`}> */}
                      <GoDotFill />
                      {data?.keyword_info?.competition ?? 0}
                    </span>
                  </TableCell>
                  <TableCell className="rounded-full whitespace-nowrap">{data?.keyword_info?.competition_level ?? ""}</TableCell>
                  <TableCell className="rounded-full whitespace-nowrap">{data?.keyword_info?.cpc ?? 0}</TableCell>
                  <TableCell className="rounded-full whitespace-nowrap">{data?.avg_backlinks_info?.rank ?? 0}</TableCell>
                  <TableCell className="rounded-full whitespace-nowrap">{data?.keyword_properties?.keyword_difficulty}</TableCell>
                  <TableCell className="rounded-full whitespace-nowrap">{moment(data?.search_intent_info?.last_updated_time).fromNow()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
        : <SeedKeywords />}
    </main>
  );
}
