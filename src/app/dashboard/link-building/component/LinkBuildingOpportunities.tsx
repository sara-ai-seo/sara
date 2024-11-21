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

export default function LinkBuildingOpportunities() {
  const [stage, setStage] = useState(1);
  const [competitor, setCompetitor] = useState("");

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
                  <label className=" font-medium " htmlFor="keyword"> Enter competitor’s domains separated by commas</label>
                  <textarea rows={5} cols={70} placeholder="e.g. domain.com, abcde.com, zyxwv.com..."
                    className=" p-2 border rounded-md "
                    value={competitor}
                    onChange={(e) => setCompetitor(e.target.value)}
                  >


                  </textarea>

                  <div className="flex justify-end items-center gap-6">
                    <Button className=" border flex items-center gap-2 rounded-md font-semibold p-2 px-3 "
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
                  <Button className={``} loading={false} > Find link opportunities</Button>
                </div>
              </div>


            </div>

          </section>

        </main>
      </main>)
      :
      (
        <main className='my-10 grid gap-6'>
          <section className="flex items-center justify-between w-full ">
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
          </section>
          <section className="grid gap-4 my-10 border shadow-sm rounded-md">
            {/* <div className="grid h-full w-full overflow-auto border rounded-md "> */}
            <div className="flex p-4 px-6 w-full items-center justify-between">
              <p className={` font-medium text-[#101828] items-center text-lg flex gap-4`}>227 Source pages </p>
              <div className="flex">
                <span><PlainButton title={'Add competitor'} icon={<FaPlus />} /></span>
              </div>
            </div>
            <table className='py-4 w-full text-xs'>
              <thead className=' bg-[#EAECF0] h-12'>
                <tr className='rounded-md items-center'>
                  {/* <th className='font-medium text-xs text-[#475467]   text-left p-2 px-6'> 
              <span className={`flex items-center gap-1 text-xs`}> Referring domains </span>
              </th> */}
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 px-6'>
                    <span className={`flex items-center gap-1 text-xs`}> Source domain and URL <button title='The volume of ...'> <GoQuestion />
                    </button> </span>
                  </th>

                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> DTS <button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> PTS <button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </th>

                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Domain traffic </span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Page traffic </span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Com.backlinks <button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Email<button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Social media<button title='The volume of ...'>
                    </button> <GoQuestion /> </span>
                  </th>

                </tr>
              </thead>
              <tbody>
                {
                  mockedData.map((data) => {
                    return (
                      <tr className=' border-b'>
                        <td className=' p-2 px-6 '>
                          <span className='grid'>
                            {data.keyword}

                            <span className='text-primary'> {data.url}</span>
                          </span>
                        </td>
                        <td className=' p-2 px-6 '>
                          <span className={`flex items-center text-xs p-1 gap-1`}>{data.position} <span className={` py-0.5 px-2 rounded-full flex items-center gap-1 `}>  </span>  </span>
                        </td>

                        <td className='  p-2  rounded-full'><span className={``}>{data.volume} </span> </td>
                        <td className=' p-2  '>
                          <span className='grid'>
                            {data.volume}


                          </span>
                        </td>


                        <td className='  p-2  rounded-full'><span className={``}> 20th June,2024</span> </td>
                        <td className='  p-2  rounded-full'><span className={` `}>10th July,2024 </span> </td>
                        <td className=' p-2  '>
                          <span className='grid'>
                            {data.url}
                            <button className="text-primary"> Send mail</button>

                          </span>
                        </td>
                        <td className=' p-2  '>
                          <span className='flex gap-1 items-center'>
                            <FaXTwitter /> <MdFacebook /> <FaInstagram /> <FaLinkedin />



                          </span>
                        </td>
                      </tr>
                    )
                  })
                }


              </tbody>
            </table>
            {/* </div> */}
          </section>
        </main>)

  )
}
function useMutattion(arg0: { mutationFn: () => Promise<any>; onSuccess: () => void; onError: () => void; }): { mutate: any; } {
  throw new Error('Function not implemented.');
}

