import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

interface Props {
  value: number;
  title: string;
}
export default function ProgressiveCircleReusable({ value, title }: Props) {
  return (
    <div className="z-0">
      <CircularProgressbarWithChildren
        value={value ?? 0}
        className=""
        styles={{
          path: {
            stroke:
              value && value < 40
                ? "#D92D20"
                : value && value > 40 && value < 70
                ? "#FDB022"
                : "#039855",
          },
        }}
      >
        <div className="flex flex-col">
          <p className="text-gray-600 text-center text-sm">{title} </p>
          <p className="text-gray-900 text-center text-5xl">
            {" "}
            {value?.toFixed(0)}%{" "}
          </p>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
