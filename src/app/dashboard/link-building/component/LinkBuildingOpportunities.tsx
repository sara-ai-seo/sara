import FilledButton from '@/app/component/FilledButton'
import React, { useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import SearchBox from '@/app/component/SearchBox';
import { SelectorDropdownMenu } from '@/app/component/SelectDropdownMenu';
import { mockedData } from '@/app/component/data/mockedData';
import { FaInstagram, FaLinkedin, FaPlus, FaXTwitter } from 'react-icons/fa6';
import { GoQuestion } from 'react-icons/go';
import PlainButton from '@/app/component/PlainButton';
import { MdFacebook } from 'react-icons/md';
import Button from '../../components/ui/Button';
import { toast } from 'react-hot-toast';
import { trimDomain } from '@/app/utils/trimDomain';
import ApiCall from '@/app/utils/apicalls/axiosInterceptor';
import { CurrentProperty } from '@/app/utils/currentProperty';
import { UseLinkBuildingOpportunities, getLinkBuildingOpportunities, useLinkBuildingOpportunities } from './UseLinkbuilding';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import moment from 'moment';
import { useMutation } from '@tanstack/react-query';

export default function LinkBuildingOpportunities() {
  const property = CurrentProperty();
  const { linkMutate, opportunitiesQuery } = useLinkBuildingOpportunities(property.id)

  const [stage, setStage] = useState(opportunitiesQuery?.data?.project?.crawlings.length < 1 ? 0 : 1);
  const [competitor, setCompetitor] = useState("");


// console.log("#", trimDomain(competitor))
  const postOpportunities = useMutation({
    mutationFn: async (target:string) => {

     return await ApiCall.post(`user/crawler/back-link/opportunities/${property.id}`, [{
        target: trimDomain(target)
      }])
    },
    onSuccess: () => {
      toast.success('Successfully crawled competitor detail', { position: 'top-right' });
      setCompetitor("")
      opportunitiesQuery.refetch()
      setStage(1)
    },
    onError: (error: any) => {
      toast.error(`Error crawling competitor detail: ${error}`, { position: 'top-right' });
    },
  })

  return (

    stage === 0 ?
      (<main className='my-10'>
        <main className='grid w-full h-full items-start content-start gap-6 my-10 mb-20 overflow-auto'>
          <section className={`flex flex-col gap-4 text-[#101828] `}>
            <p className={`text-lg 2xl:text-xl`}> Find linking opportunities by contacting sites linking to your competitors but don’t link to you yet.</p>
          </section>
          <section className="flex items-start gap-8 justify-between">
            <div className="flex flex-col gap-2 ">
              <div className="flex items-start gap-6">
                <div className='flex flex-col gap-2'>
                  <label className=" font-medium " htmlFor="keyword"> Enter competitor’s domain</label>
                  <textarea rows={5} cols={70} placeholder="e.g. domain.com"
                    className=" p-2 border rounded-md "
                    value={competitor}
                    onChange={(e) => setCompetitor(e.target.value)}
                  >


                  </textarea>

                  <div className="flex justify-end items-center gap-6">
                    <Button variant="text" className=" border flex items-center gap-2 rounded-md font-semibold p-2 px-3 "
                      onClick={() => setCompetitor("")}
                    >

                      Clear all
                    </Button>
                    {/* <button className=" bg-[#EFF8FF] border text-[#175CD3] flex items-center gap-2 rounded-md font-semibold p-2 px-3 ">
                    <AiOutlineFileAdd />
                    Import file
                  </button> */}
                  </div>
                </div>
                <div className='mt-8'>
                  {/* <FilledButton title='Find link opportunities' /> */}
                  <Button className={``} loading={postOpportunities.isPending} onClick={()=> postOpportunities.mutate(competitor)} > Find link opportunities</Button>
                </div>
              </div>


            </div>

          </section>

        </main>
      </main>)
      :
      (
        <main className='my-10 grid gap-6'>
          {/* <section className="flex items-center justify-between w-full ">
            <div className="flex items-center gap-2">
              <SelectorDropdownMenu items={["May", "June", "July"]} selected={'DTS'} setSelected={function (e: any): void {
                throw new Error('Function not implemented.');
              }} />
              <SelectorDropdownMenu items={["May", "June", "July"]} selected={'PTS'} setSelected={function (e: any): void {
                throw new Error('Function not implemented.');
              }} />
              <SelectorDropdownMenu items={[23, 44, 54]} selected={'Domain traffic'} setSelected={function (e: any): void {
                throw new Error('Function not implemented.');
              }} />
              <SelectorDropdownMenu items={[1, 2, 3]} selected={'Page traffic'} setSelected={function (e: any): void {
                throw new Error('Function not implemented.');
              }} />
            </div>
            <SearchBox value={''} setValue={function (e: any): void {
              throw new Error('Function not implemented.');
            }} />
          </section> */}
          <section className="grid gap-4 my-10 border shadow-sm rounded-md">
            <div className="flex p-4 px-6 w-full items-center justify-between">
              <p className={` font-medium text-[#101828] items-center text-lg flex gap-4`}>{opportunitiesQuery?.data?.project?.crawlings?.length ?? 0} Source pages </p>
              <div className="flex ">
                {/* <span><PlainButton title={'Add competitor'} icon={<FaPlus />} /></span> */}

                <span><Button className=" gap-2 items-center flex" onClick={() => setStage(0)}>  <FaPlus /> Add competitor</Button> </span>
              </div>
            </div>
            <Table className='py-4 w-full text-xs'>
              <TableHeader className=' bg-[#EAECF0] h-12'>
                <TableRow className='rounded-md items-center'>
                  <TableHead className='font-medium text-xs text-[#475467]   text-left '>
                    <span className={`flex items-center gap-1 text-xs`}> Source domain and URL <button title='The volume of ...'> <GoQuestion />
                    </button> </span>
                  </TableHead>

                  <th className='font-medium text-xs text-[#475467]   text-left '>
                    <span className={`flex items-center gap-1 text-xs`}> DTS <button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </th>
                  <TableHead className='font-medium text-xs text-[#475467]   text-left '>
                    <span className={`flex items-center gap-1 text-xs`}> Email <button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </TableHead>

                  <TableHead className='font-medium text-xs text-[#475467]   text-left '>
                    <span className={`flex items-center gap-1 text-xs`}> Phone  </span>
                  </TableHead>
                  <TableHead className='font-medium text-xs text-[#475467]   text-left '>
                    <span className={`flex items-center gap-1 text-xs`}> Last visited </span>
                  </TableHead>
                  <TableHead className='font-medium text-xs text-[#475467]   text-left '>
                    <span className={`flex items-center gap-1 text-xs`}> Social handles <button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </TableHead>
                  {/* <TableHead className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Email<button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </TableHead>
                  <TableHead className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Social media<button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </TableHead> */}

                </TableRow>
              </TableHeader>
              <TableBody>

                {
                  opportunitiesQuery?.data?.project?.crawlings.map((data: any) => {
                    if (data.crawlingData[0]?.data?.result !== null) {

                    const item = data?.crawlingData[0]?.data?.result[0]
                    // console.log("@", item)
                    return (
                      <TableRow>
                        <TableCell className=' items-start'>
                          <span className='grid'>
                            <span className=' max-w-md truncate'>
                              {item?.title ?? ""}
                            </span>

                            <Link href={`https://.${item?.domain}`} target="_blank" rel="noopener noreferrer" className='text-primary'>
                              {item?.domain}
                            </Link>
                          </span>
                        </TableCell>
                        <TableCell> {item?.domain_rank ?? ""} </TableCell>
                        <TableCell className=""> {
                          item.emails.map((email: string) => email)
                        } </TableCell>
                        <TableCell className=""> {
                          item.phone_numbers.map((email: string) => email)
                        } </TableCell>
                        <TableCell> {
                          moment(item?.last_visited).fromNow()
                        }  </TableCell>
                        <TableCell>
                          {item.social_graph_urls && item.social_graph_urls.map((social: string) => {
                            social.includes("facebook") && <MdFacebook />
                            social.includes("instagram") && <FaInstagram />
                            social.includes("twitter") && <FaXTwitter />
                            social.includes("linkedin") && <FaLinkedin />
                          })}
                        </TableCell>

                      </TableRow>

                    )
                  }
                  })
                }
              </TableBody>
            </Table>
            {/* </div> */}
          </section>
        </main>)

  )
}


