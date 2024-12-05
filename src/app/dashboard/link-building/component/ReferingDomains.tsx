
import SearchBox from '@/app/component/SearchBox'
import { mockedData } from '@/app/component/data/mockedData'
import { useLinkBuildingOverview } from '@/app/services/crawlers/link_building'
import { ReferringDomainData } from '@/app/types/backlinks/referringDomain'
import Link from 'next/link'
import React from 'react'
import { FaArrowUp } from 'react-icons/fa6'
import { GoQuestion } from 'react-icons/go'
import moment from "moment"
import { ShortenNumber } from '@/app/utils/ShortenedNumber'

interface Props {
  sendData: (data: string) => void
}
export default function ReferingDomains({ sendData }: Props) {

  const { isError, isPending, isSuccess, data: rDomainData } = useLinkBuildingOverview("referingDomains", sendData);
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  if (isSuccess) {
    sendData(rDomainData?.project?.crawlings[0]?.crawlingData[0]?.updatedAt);
  }

 

  const crawlingData = rDomainData?.project?.crawlings[0]?.crawlingData[0]?.data || {};
  const prevData = rDomainData?.project?.crawlings[1]?.crawlingData[0]?.data || {};
  // console.log("CD", crawlingData)
  // const totalbacklinks = (crawlingData ?? [])?.reduce((sum: any, item: { backlinks: any }) => sum + item.backlinks,0)

  const totalbacklinks = Array.isArray(crawlingData)
  ? crawlingData.reduce((sum: number, item: { backlinks: number }) => sum + (item.backlinks ?? 0), 0)
  : 0;
  return (
    <section className="grid gap-4 my-10 border shadow-sm rounded-md">
      {/* <div className="grid h-full w-full overflow-auto border rounded-md "> */}
      <div className="flex p-4 px-6 w-full items-center justify-between">
        <p className={` font-medium text-[#101828] items-center text-lg flex gap-4`}>{crawlingData?.length} Referring domains <span className='px-2 p-0.5 bg-[#F2F4F7] items-center rounded-full text-xs'> {ShortenNumber(totalbacklinks)} </span> </p>
        {/* <div className="flex">
          <SearchBox value={''} setValue={function (e: any): void {
            throw new Error('Function not implemented.')
          }} placeholder='Search refering domain' />
        </div> */}
      </div>
      <table className='py-4 w-full text-xs'>
        <thead className=' bg-[#EAECF0] h-12'>
          <tr className='rounded-md items-center'>
            <th className='font-medium text-xs text-[#475467]   text-left p-2 px-6'>
              <span className={`flex items-center gap-1 text-xs`}> Referring domains </span>
            </th>

            <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
              <span className={`flex items-center gap-1 text-xs`}> DTS <button title='The volume of ...'>
              </button> <FaArrowUp /> </span>
            </th>
            <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
              <span className={`flex items-center gap-1 text-xs`}> Dofollow links  <button title='The volume of ...'> <GoQuestion />
              </button> </span>
            </th>
            <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
              <span className={`flex items-center gap-1 text-xs`}> Nofollow links  <button title='The volume of ...'> <GoQuestion />
              </button> </span>
            </th>

            <th className='font-medium text-xs text-[#475467]   text-left p-2 '> Broken backlinks </th>
            <th className='font-medium text-xs text-[#475467]   text-left p-2 '>Last seen </th>
          </tr>
        </thead>
        <tbody>
          {
            (Array.isArray(crawlingData) ? crawlingData: [])?.map((data: ReferringDomainData, i:number) => {
              return (
                <tr className=' border-b' key={i}>
                  <td className=' p-2 px-6 '>
                    <span className='grid'>
                      {/* {data.url}  */}

                      <Link href={data.refering_domain} className='text-primary'> {data.refering_domain}</Link>
                    </span>
                  </td>
                  <td className=' p-2 px-6 '>
                    <span className={`flex items-center text-xs p-1 gap-1`}>{data.backlinks_spam_score} <span className={` py-0.5 px-2 rounded-full flex items-center gap-1 `}>  </span>  </span>
                  </td>

                  <td className='  p-2  rounded-full'><span className={``}>{data.referring_domains_dofollow} </span> </td>
                  <td className=' p-2  '>
                    <span className='grid'>
                      {data.referring_domains_nofollow}


                    </span>
                  </td>


                  <td className='  p-2  rounded-full'><span className={``}> {data.broken_backlinks} </span> </td>
                  <td className='  p-2  rounded-full'><span className={` `}> {moment(data.first_seen).format("Do MMM YY")}</span> </td>
                </tr>
              )
            })
          }


        </tbody>
      </table>
      {/* </div> */}
    </section>
  )
}
