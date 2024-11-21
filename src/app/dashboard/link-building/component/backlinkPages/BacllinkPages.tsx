import PlainButton from "@/app/component/PlainButton";
import { mockedData } from "@/app/component/data/mockedData";
import { useLinkBuildingOverview } from "@/app/services/crawlers/link_building";
import { backlinkPageData } from "@/app/types/backlinks/backlinkPages";
import { Menu, Transition, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import moment from "moment";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { CiImageOn, CiSearch } from "react-icons/ci";
import {
  FaPlus,
  FaArrowDown,
  FaArrowUp,
  FaLink,
  FaVideo,
} from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";


interface ParentProp {
  sendData: (lastUpdated: string) => void;
}

export default function BacllinkPages({sendData}:ParentProp) {
  const [currentFilter, setCurrentFilter] = useState("All issues");
  const [attribute, setAttribute] = useState("All issues");

  const tabsFilter = ["All backlinks", "Active", "New", "Lost"];

  const { isError, isPending, isSuccess, data: backlinkPages } = useLinkBuildingOverview("backlinkPages", sendData);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const crawlingData = backlinkPages?.project?.crawlings[0]?.crawlingData[0]?.data || {};
  const prevData = backlinkPages?.project?.crawlings[1]?.crawlingData[0]?.data || {};

  if(isSuccess) {
    sendData(backlinkPages?.project?.crawlings[0]?.crawlingData[0]?.updatedAt);
  }
console.log("CD",crawlingData)
  return (
    <main className="py-10 grid gap-8 overflow-auto ">
      {/* <section className="flex h-fit gap-2 flex-wrap items-center z-10 bg-white justify-between w-full">
        <div className="flex items-center gap-2 flex-wrap">
          {tabsFilter.map((item, index) => (
            <button
              key={index}
              title={item}
              className={`flex items-center border shadow-md rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${
                currentFilter === item ? "bg-[#EFF8FF]" : "bg-[#FFF]"
              }`}
              onClick={() => setCurrentFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex min-[425px]:flex-row flex-col min-[425px]:items-center gap-4  md:w-fit w-full">
          <Menu as="div" className=" relative inline-block text-left">
            <MenuButton className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              Attributes
              <IoChevronDownOutline
                className="-mr-1 ml-2  text-black"
                aria-hidden="true"
              />
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute z-50 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <span className="px-1 py-1 ">
                  {["Main", "Everyone"].map((item, i) => {
                    return (
                      <MenuItem key={i}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-primary text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => setAttribute(item)}
                          >
                            {item}
                          </button>
                        )}
                      </MenuItem>
                    );
                  })}
                </span>
              </MenuItems>
            </Transition>
          </Menu>
          <div className="flex  relative rounded-md md:w-[320px] sm:w-full w-full">
            <input
              placeholder="Search referring domain or pages"
              type="search"
              className="w-full h-full border p-3 rounded-md focus:outline-none focus:shadow-sm focus:shadow-primary pl-8 placeholder:pl-2"
            />
            <CiSearch className="size-5 absolute top-3.5 left-4 " />
          </div>
        </div>
      </section> */}
      <section className=" h-full">
        <main className="grid w-full h-full items-start content-start gap-6 mb-20 overflow-auto">
          <div className="grid h-full w-full overflow-auto border rounded-md ">
            <div className="flex w-full items-center justify-between p-6">
              <p className={` font-medium text-[#101828] text-lg`}>
                {" "}
                {crawlingData?.length} Referring pages
              </p>
            </div>
            <table className="py-4 w-full text-xs">
              <thead className=" bg-[#EAECF0] h-12">
                <tr className="rounded-md items-center">
                  <th className="font-medium text-xs text-[#475467]  w-[254px] whitespace-nowrap text-left p-2">
                    <span className={`flex items-center gap-1 text-xs`}>
                      Referring page title and URL{" "}
                      <button title="The volume of ...">
                        <GoQuestion />
                      </button>
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467]  text-left p-2 flex items-center gap-2 mt-2">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      PTS{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                      <FaArrowUp />{" "}
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467]   text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      DTS{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                      <FaArrowUp />{" "}
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467] whitespace-nowrap text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Anchor and target URL{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467] whitespace-nowrap  text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Link type{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467]  w-[146px] text-left p-2 ">
                    <span className={`flex items-center gap-1 text-xs`}>
                      {" "}
                      Status & Attr.{" "}
                      <button title="The volume of ...">
                        {" "}
                        <GoQuestion />
                      </button>{" "}
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467]  w-[134px] text-left p-2 ">
                    First seen{" "}
                  </th>
                  <th className="font-medium text-xs text-[#475467] w-[138px]  text-left p-2 ">
                    Last seen{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {crawlingData?.map((data: backlinkPageData, i:number) => {
                  return (
                    <tr className=" border-b" key={i}>
                      <td className=" p-2 ">
                        <span className="grid">
                          {data.refering_page_title}

                          <Link href={data.target_url} className="text-primary"> {data.target_url }</Link>
                        </span>
                      </td>
                      <td className=" p-2 ">
                        <span className={`flex items-center text-xs p-1 gap-1`}>
                          {data.pts ?? 0}
                          <span
                            className={` py-0.5 px-2 rounded-full flex items-center gap-1 `}
                          >
                            
                          </span>
                        </span>
                      </td>

                      <td className="  p-2 rounded-full">
                        <span className={``}>{data.pts ?? 0 } </span>{" "}
                      </td>
                      <td className=" p-2 text-primary">
                        <Link href={data.target_url} className="grid">
                          {data.target_url}

                          <span className="text-primary"> {data.status}</span>
                        </Link>
                      </td>
                      <td className="  ">
                        <span
                          className={`flex rounded-full px-2 py-0.5 size-fit text-center justify-center items-center bg-[#F2F4F7] gap-2 text-sm`}
                        >
                          <p>{data.link_type}</p>
                        </span>
                      </td>
                      <td className="  p-2 rounded-full">
                        <span className={`flex items-center gap-2 `}>
                          <span
                            className={`rounded-full p-2 px-3 ${
                              data.status == true
                                ? "text-green-500 bg-green-200"
                                : "bg-red-200 text-red-500"
                            }`}
                          >
                            {data.status == true ? "New" : "Lost"}
                          </span>
                          <span
                            className={`rounded-full p-2 px-3 ${
                              data.attribute == true
                                ? "text-green-500 bg-green-200"
                                : "bg-red-200 text-red-500"
                            }`}
                          >
                            {data.attribute == true ? "Follow" : "Nofollow"}
                          </span>
                        </span>{" "}
                      </td>
                      <td className="  p-2 rounded-full">
                        <span className={``}> {moment(data.first_seen).format("Do MMM, YY")} </span>{" "}
                      </td>
                      <td className="  p-2 rounded-full">
                        <span className={` `}> {moment(data.last_seen).format("Do MMM, YY")} </span>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <section className="w-full"></section>
        </main>
      </section>
    </main>
  );
}
