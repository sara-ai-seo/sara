

import SearchBox from "@/app/component/SearchBox";
import { SelectorDropdownMenu } from "@/app/component/SelectDropdownMenu";
import { mockedData } from "@/app/component/data/mockedData";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaRegCircleQuestion } from "react-icons/fa6";
import {  linkGapData } from "./competitorAnalysis";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody
} from "@/components/ui/table"


interface Props {
  target: string,
  rank: number,
  intersections: number
}
export default function LinkGap() {
  const [selected, setSelected] = useState('DTS');

  // const {data} = useQuery({
  //   queryKey: ["link_gap", property.id ],
  //   queryFn: async () => {
  //     return await ApiCall.get(`/user/crawler/competitor-analysis/by-tab/${property.id}?tab=linkGap`)
  //   }
  // })
  const {data: linkGap, isPending, isError} = linkGapData();
  const linkData= linkGap?.project?.crawlings[0]?.crawlingData[0]?.data.tasks[0].result[0].items


  // console.log("DATA", linkData)

  return (
    <section className={`grid col-span-1 lg:col-span-3 gap-6 mt-6 mb-20
        `}>
      {/* <div className={` flex items-center gap-4`}>
        <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={selected} setSelected={() => setSelected('')} />
        <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={"Traffic"} setSelected={() => setSelected('')} />
        <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={"DTS"} setSelected={() => setSelected('')} />
      </div> */}
      <div className={`border rounded-lg w-full pt-7`}>
        <div className="flex w-full items-center p-6 justify-between">
          <h3 className="text-[#101828] text-lg text-left font-medium">
            {linkData?.length} Reffering domains
          </h3>
          {/* <SearchBox value={""} setValue={function (e: any): void {
            throw new Error("Function not implemented.");
          }} /> */}
        </div>
        <Table className="w-full">
          <TableHeader className="w-full bg-[#EAECF0] text-left">
            <TableRow className="text-[#475467] font-normal text-xs">
              <TableHead className="p-4">
                Reffering domains
              </TableHead>
              <TableHead className="p-4">
                  <p> Rank Position</p>
              </TableHead>
              <TableHead className="p-4">
                <span className={`flex gap-1 items-center `}>
                  <p> Intersections</p>
                  <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                </span>
              </TableHead>

            </TableRow>

          </TableHeader>
          <TableBody>
            {
              linkData?.map((item: Props, index:number) => {
                return (
                  <TableRow className={`${index === linkData.length - 1 ? '' : 'border-b'} text-left hover:bg-blue-100`} key={index}>
                    <TableCell className="p-4 text-primary">
                        <p> {item?.target} </p>
                    </TableCell>
                    <TableCell className=" p-4">{item?.rank} </TableCell>
                    <TableCell className="p-4">
                      {item?.intersections}
                    </TableCell>
                    
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
