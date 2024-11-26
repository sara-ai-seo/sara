import SearchBox from "@/app/component/SearchBox";
import { SelectorDropdownMenu } from "@/app/component/SelectDropdownMenu";
import { mockedData } from "@/app/component/data/mockedData";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { RiExpandUpDownFill } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";
import Button from "../../components/ui/Button";
import { MdAdd } from "react-icons/md";


export interface KeywordGapType {
  rank: number;
  domain1: number;
  domain2: number;
  keyword: string;
  competition: number | null;
  keyword_volume: number;
  keyword_difficulty: number;
}

export default function KeywordGap({
  data,
  prev,
  setStage
}: {
  data: KeywordGapType[];
  prev: KeywordGapType[];
  setStage: ()=> void
}) {
  const [selected, setSelected] = useState("Volume");

  // const {data} = keywordGapData("keywordGap");

  return (
    <section
      className={`grid col-span-1 lg:col-span-3 gap-6 mt-6 mb-20
        `}
    >
      {/* <div className={` flex items-center gap-4`}>
                <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={selected} setSelected={() => setSelected('')} />
                <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={"KD"} setSelected={() => setSelected('')} />
                <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={"Competition"} setSelected={() => setSelected('')} />
            </div> */}
      <div className={`border rounded-lg w-full pt-7`}>
        <div className="flex w-full items-center p-6 justify-between">
          <h3 className="text-[#101828] text-lg text-left font-medium">
            {data.length} Keywords
          </h3>
         <div className="flex items-center gap-3">
         {/* <SearchBox
            value={""}
            setValue={function (e: any): void {
              throw new Error("Function not implemented.");
            }}
          /> */}
          <Button className="flex items-center gap-2" onClick={setStage}>
            <MdAdd />
            <span className="ml-2">Add competitor</span>
          </Button>
         </div>
        </div>
        <table className="w-full">
          <thead className="w-full bg-[#EAECF0]">
            <tr className="text-[#475467] font-normal text-xs">
              <th className="pl-6 py-6">
                <span className={`flex gap-2 items-center `}>
                  {/* <input type="checkbox" value={``} /> */}
                  <p> Keywords</p>
                </span>
              </th>
              <th className=" py-6">
                <span className={`flex gap-1 items-center `}>
                  <p> Volume</p>
                  <RiExpandUpDownFill />
                </span>
              </th>
              <th className=" py-6">
                <span className={`flex gap-1 items-center `}>
                  <p> KD</p>
                  <button className="" title="Here...">
                    {" "}
                    <FaRegCircleQuestion />
                  </button>
                </span>
              </th>
              <th className=" py-6">
                <span className={`flex gap-1 items-center `}>
                  <p> Competition</p>
                  <button className="" title="Here...">
                    <FaRegCircleQuestion />
                  </button>
                </span>
              </th>
              <th className=" py-6">
                <span className={`flex gap-1 items-center `}>
                  <p> Your rank</p>
                  <button className="" title="Here...">
                    <FaRegCircleQuestion />
                  </button>
                  <span className="hover:text-green-600 cursor-pointer transition-transform duration-300 hover:scale-1.5">
                    <RiExpandUpDownFill />
                  </span>
                </span>
              </th>
              <th className=" py-6">
                <span className={`flex gap-1 items-center `}>
                  <p> Domain 1</p>
                  <button className="" title="Here...">
                    {" "}
                    <FaRegCircleQuestion />
                  </button>
                </span>
              </th>
              <th className=" py-6">
                <span className={`flex gap-1 items-center `}>
                  <p> Domain 2</p>
                  <button className="" title="Here...">
                    {" "}
                    <FaRegCircleQuestion />
                  </button>
                </span>
              </th>
              {/* <th className="pl-6 py-6">
                                <span className={`flex gap-1 items-center `}>
                                    <p> Domain 3</p>
                                    <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                                </span>
                            </th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr
                  className={`${index === data.length - 1 ? "" : "border-b"}`}
                  key={index}
                >
                  <td className="pl-6 py-6">
                    <span className={`flex gap-2 items-center `}>
                      {/* <input type="checkbox" value={``} /> */}
                      <p> {item?.keyword} </p>
                    </span>
                  </td>
                  <td>{ShortenNumber(item?.keyword_volume)}</td>
                  <td className="">
                    <span
                      className={` rounded-3xl flex items-center ${
                        item?.keyword_difficulty <
                          prev[index]?.keyword_difficulty || 0
                          ? "bg-[#FEF3F2] text-[#F04438]"
                          : "bg-[#F6FEF9] text-[#6CE9A6]"
                      }`}
                    >
                      <TbPointFilled /> {item?.keyword_difficulty}
                    </span>
                  </td>
                  <td>{item?.competition?.toFixed(2) ?? 0} </td>
                  <td>{item?.rank?.toFixed(2) ?? 0} </td>
                  <td className="bg-[#EFF8FF] pl-4">
                    {item?.domain1?.toFixed(2)}{" "}
                  </td>
                  <td className="bg-[#FDF2FA] pl-4">
                    {item?.domain2?.toFixed(2)}{" "}
                  </td>
                  {/* <td className="bg-[#F4F3FF] pl-4">{item.kd} </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
