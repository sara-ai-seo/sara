
import { RxQuestionMarkCircled } from "react-icons/rx";

import { FaCircle } from "react-icons/fa";

import './style.css'
import ProgressiveCircle from "@/app/dashboard/components/SeoprogressCircle";
import { TrafficOverviewGraph } from "@/app/dashboard/components/TrafficOverviewGraph";


export default function TraficOverview() {
  return (
    // <section className={`flex h-[480px] md:h-[580px] w-full flex-col md:flex-row gap-4 py-8 justify-between`}>
    <section className={`main h-[580px] w-full gap-4 py-8 justify-between`}>
      <div className="grid shadow-md border font-bold text-xl items-start h-full rounded-md p-2 md:p-6 w-full ">
        <h1 className={`text-[#101828] flex items-center gap-4`}>
          Overall SEO
          <RxQuestionMarkCircled />
        </h1>
        <div className={``}>
          <ProgressiveCircle />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className='text-red-500' />
            <p className=' font-normal'> Low</p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className='text-yellow-500' />
            <p className=' font-normal'> Moderate</p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className='text-green-500' />
            <p className=' font-normal'> High</p>
          </div>
        </div>
      </div>
      {/* <div className=" grid h-full items-start rounded-md p-2 md:p-6 w-full  ">  */}
      <div className="grid shadow-md border font-bold text-xl items-start h-full rounded-md p-2 md:p-6 w-full ">
        <div className="">
          <div className="flex w-full h-full items-start justify-between">
            <h1 className={`text-[#101828] flex items-center gap-4`}>
              Traffic overview
              <RxQuestionMarkCircled />
            </h1>
            <select className={`border rounded-md p-2 text-[#344054] text-sm font-normal`}>
              <option className={``}>
                Last 12 months
              </option>
              <option className={``}>
                Last 6 months
              </option>
              <option className={``}>
                Last 3 months
              </option>
            </select>
          </div>
          <hr className='w-full mt-4' />
        </div>
        <div className=" h-full w-full max-w-[600px]">
          <TrafficOverviewGraph />
        </div>
      </div>

    </section>
  )
}
