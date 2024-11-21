import { TitleWithoutUnderline } from "@/app/dashboard/technical-seo/components/Overview";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { ReusableDoughnutGraph } from "./ReusableDoughnutGraph";

interface Props {
  dates: string[],
  dataType: { [key: string]: number }
}

export default function BacklinkType({ dates, dataType }: Props) {
  const labels = Object.keys(dataType);

  return (
    <section className="flex flex-col gap-4 border shadow-sm rounded-md p-4 py-6">
      <TitleWithoutUnderline title={"Backlink type"} info={"Backlink type"} />
      <div className="p-4 flex flex-col gap-3">
        <ReusableDoughnutGraph
          data={{
            labels: labels,
            datasets: [
              {
                data: Object.values(dataType),
                backgroundColor: ["#1849A9", "#53B1FD", "#FECDCA", "#A6F4C5"],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 0,
              },
            ],
          }}
        />
        <div className="w-full flex justify-end">
          <div className="flex flex-col justify-end">
            {Object.entries(dataType).map(([key, value], index) => (
              <p key={index} className="text-xs flex items-center text-[#475467] whitespace-nowrap">
                <span className={`${index === 0 ? "text-[#1849A9]" : index === 1 ? "text-[#53B1FD]"
                  : index === 2 ? "text-[#FECDCA]" : index === 3 ? "text-[#A6F4C5]" : ""
                }`}>
                  <GoDotFill />{" "}
                </span>{" "}
                {` ${key} - (${value.toLocaleString()}) `}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
