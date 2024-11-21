import { RootState } from "@/app/store";
import {
  CrawlingDataOverview,
  OverviewDataType,
} from "@/types/technicalseo/technicalSeoTypes";
import { ActivityRings } from "@jonasdoesthings/react-activity-rings";

// Basic example with no custom settings
import React from "react";
import { useSelector } from "react-redux";

interface ActivityGuageProps {
  errorCount: number;
  warningCount: number;
}
export default function ActivityGuage({
  errorCount,
  warningCount,
}: ActivityGuageProps) {
  const errorPercentage = errorCount ?? 0;
  const warningPercentage = warningCount ?? 0;
  // const noticesPercentage = overviewResult[0]?.cost ?? 0;

  return (
    <div className="h-full w-full ">
      <ActivityRings
        rings={[
          { filledPercentage: errorPercentage / 100, color: "#F04438" },
          { filledPercentage: warningPercentage / 100, color: "#FDB022" },
          // { filledPercentage: noticesPercentage / 100, color: "#175CD3" },
        ]}
        options={{
          initialRadius: 40,
          animationDurationMillis: 1500,
          containerHeight: "min-content", //30vh
          backgroundOpacity: 0.1,
        }}
      />
    </div>
  );
}
