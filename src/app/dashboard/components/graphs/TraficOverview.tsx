import { RxQuestionMarkCircled } from "react-icons/rx";
import ProgressiveCircle from "../SeoprogressCircle";
import { TrafficOverviewGraph } from "../TrafficOverviewGraph";
import { FaCircle } from "react-icons/fa";

import "./style.css";
import {  SiteHealthScoreDto } from "../../dashboard/SiteHealthScore";
import { PositionDistribution } from "../../rank-tracker/components/PositionDistribution";
import SiteHealthScore from "../SiteHealthScore";

export default function TraficOverview() {
  return (
    <section
      className={`main h-auto lg:h-[580px] grid grid-cols-1 md:grid-cols-2 w-auto lg:w-full gap-4 py-8 justify-between`}
    >
      <div className="grid shadow-md border font-bold text-xl items-start h-full rounded-md p-2 md:p-6 w-full ">
        <h1 className={`text-[#101828] flex items-center gap-4`}>
          Site health score
          <button title="This is the overall site health based on general best practice">
            <RxQuestionMarkCircled />
          </button>
        </h1>
        <div className={`size-fit my-4 mx-auto`}>
          <ProgressiveCircle />
        </div>

        <div className="grid gap-3 w-full">
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-red-500" />
            <p className=" font-normal"> Low</p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-yellow-500" />
            <p className=" font-normal"> Moderate</p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-green-500" />
            <p className=" font-normal"> High</p>
          </div>
        </div>
      </div>
      <div className="grid shadow-md border font-bold text-xl items-start h-full rounded-md p-2 md:p-6 w-full ">
        <div className="">
          <div className="flex w-full h-full items-start justify-between">
            <h1 className={`text-[#101828] flex items-center gap-4`}>
              Traffic overview
              <button title="Here is the summary of your website visitors">
                <RxQuestionMarkCircled className="text-gray-600" />
              </button>
            </h1>
            {/* <select className={`border rounded-md p-2 text-[#344054] text-sm font-normal`}>
              <option className={``}>
                Last 12 months
              </option>
              <option className={``}>
                Last 6 months
              </option>
              <option className={``}>
                Last 3 months
              </option>
            </select> */}
          </div>
          <hr className="w-full mt-4" />
        </div>
        <div className=" h-full w-full max-w-[600px]">
          <TrafficOverviewGraph />
        </div>
      </div>
    </section>
  );
}


interface TOverviewDto {
  siteHealthScore: number | SiteHealthScoreDto,
  increase?: number

}

export const TOverview: React.FC<TOverviewDto> = ({
  siteHealthScore, increase = 0
}) => {
  return (
    <section
      className={`lg:h-[580px] grid grid-cols-1 md:grid-cols-3 w-auto lg:w-full gap-4 py-8 justify-between`}
    >
      {/* <div className="grid col-span-1 md:col-span-1 shadow-md border font-bold text-xl items-start h-full rounded-md p-2 md:p-6 w-auto ">
        <h1 className={`text-[#101828] flex items-center gap-4`}>
          Site health score
          <button title="This is the overall site health based on general best practice">
            <RxQuestionMarkCircled />
          </button>
        </h1>
        <div className={`size-fit my-4 mx-auto`}>
          <SiteHealthScore score={siteHealthScore.score} previous={siteHealthScore.previous} />
        </div>

        <div className="grid gap-3 w-full">
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-red-500" />
            <p className=" font-normal"> Low</p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-yellow-500" />
            <p className=" font-normal"> Moderate</p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-green-500" />
            <p className=" font-normal"> High</p>
          </div>
        </div>
      </div> */}
      <SiteHealthScore
        site_health={
          typeof siteHealthScore === "number"
            ? siteHealthScore
            : siteHealthScore.score
        }
        increase={increase}
      />
      <div className="grid col-span-1 md:col-span-2 w-full shadow-md border font-bold text-xl items-start h-full rounded-md p-2 md:p-6">
        <div className="">
          <div className="flex w-auto h-full items-start justify-between">
            <h1 className={`text-[#101828] flex items-center gap-4`}>
              Position Distribution(Organic)
              <button title="A color-coded breakdown of where your site ranks in search results (e.g., positions 2-3, 4-20, 31-40, 41-50).">
                <RxQuestionMarkCircled className="text-gray-600" />
              </button>
            </h1>
          </div>
          <hr className="w-full mt-4" />
        </div>
        <PositionDistribution se={"google"} type={{
          name: "Organic",
          value: "organic_positions"
        }} />
      </div>
    </section>
  )
}