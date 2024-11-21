import { FC } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

interface ReusableCrawlStatusProps {
  TotalLinkFound: number;
}
export const ReusableCrawlStatus: FC<ReusableCrawlStatusProps> = ({
  TotalLinkFound,
}) => {
  return (
    <div className="rounded-full w-full h-fit flex items-center justify-center ">
      <div className="z-0">
        {/* <CircularProgressbarWithChildren value={averageSeo ?? 0} className='' styles={{
            path: { stroke: averageSeo && averageSeo < 40 ? "#D92D20" : averageSeo && averageSeo > 40 && averageSeo < 70 ? "#FDB022" : "#039855" }
          }} >
            <div className="flex flex-col">
              <p className='text-gray-600 text-center text-sm'>Total links found </p>
              <p className='text-gray-900 text-center text-5xl'> {total} </p>
            </div>
          </CircularProgressbarWithChildren> */}
        <CircularProgressbarWithChildren
          value={TotalLinkFound ?? 0}
          className="lg:size-full size-[200px]"
          styles={{
            trail: {
              stroke: "#D1FADF",
            },
            path: {
              stroke: "#12B76A",
            },
          }}
        >
          <div className="flex flex-col">
            <p className="text-gray-600 text-center text-sm">
              Total links found{" "}
            </p>
            <p className="text-gray-900 text-center text-5xl">
              {" "}
              {TotalLinkFound}{" "}
            </p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};
