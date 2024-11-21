import { FC } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BiUpArrowAlt } from "react-icons/bi";

interface SEOProgressiveCircleProps {
  site_healthPercentage: number;
}
const SiteHealthDoughnutChart: FC<SEOProgressiveCircleProps> = ({
  site_healthPercentage,
}) => {
  return (
    <div className="z-0">
      {/* {JSON.stringify(healthScore[0].siteHealth)} */}
      <CircularProgressbarWithChildren
        value={site_healthPercentage ?? 0}
        className=""
        styles={{
          path: {
            stroke:
              site_healthPercentage && site_healthPercentage < 40
                ? "#D92D20"
                : site_healthPercentage &&
                  site_healthPercentage > 40 &&
                  site_healthPercentage < 70
                ? "#FDB022"
                : "#039855",
          },
        }}
      >
        <div className="flex flex-col">
          <p className="text-gray-600 text-center text-sm"> Health score</p>
          <p className="text-gray-900 text-center text-3xl lg:text-5xl">
            {" "}
            {/* {averageSeo?.toFixed(0)}%{" "} */}
            {site_healthPercentage}%
          </p>
          <p className="text-[#027A48] inline-flex items-center justify-center lg:mt-4 mt-2 gap-0.5 text-sm">
            <BiUpArrowAlt className="text-lg" />
            12
          </p>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default SiteHealthDoughnutChart;
