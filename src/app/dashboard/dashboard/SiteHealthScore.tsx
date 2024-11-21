
import { arrowStyle, getClass } from "@/helper";
import { calculatePercentageDifference } from "@/lib/DateFormater";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { BiUpArrowAlt } from "react-icons/bi";

export interface SiteHealthScoreDto {
    score: number,
    previous: number
}
export const SiteHealthScore: React.FC<SiteHealthScoreDto> = ({score, previous})=> {
    const diff = score - previous;
    return (
        <div className="z-0">
        <CircularProgressbarWithChildren
          value={score ?? 0}
          className=""
          styles={{
            path: {
              stroke:
                score && score < 40
                  ? "#D92D20"
                  : score && score > 40 && score < 70
                  ? "#FDB022"
                  : "#039855",
            },
          }}
        >
          <div className="flex flex-col">
            <p className="text-gray-600 text-center text-sm"> Health score</p>
            <p className="text-gray-900 text-center text-3xl lg:text-5xl">
              {" "}
              {score?.toFixed(0)}%{" "}
            </p>
            <p className={`${ getClass(diff)} inline-flex items-center justify-center lg:mt-4 mt-2 gap-0.5 text-sm`}>
              <BiUpArrowAlt className={`text-lg ${arrowStyle(diff)} `} />
              {`${calculatePercentageDifference(previous, score)}`}
            </p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    )
}