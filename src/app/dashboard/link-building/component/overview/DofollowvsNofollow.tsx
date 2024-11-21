import React from "react";
import { GoDotFill } from "react-icons/go";

import { TitleWithoutUnderline } from "../../../technical-seo/components/Overview";
import { ReusableDoughnutGraph } from "./ReusableDoughnutGraph";

export function DofollowvsNofollow({ dofollowvsNofollow }: any) {
  return (
    <section className="grid gap-4 border shadow-sm rounded-md p-4 py-6">
      <TitleWithoutUnderline
        title={"Dofollow vs Nofollow"}
        info={"Dofollow vs Nofollow"}
      />
      <div className="p-4 flex lg:flex-row md:flex-col gap-2 h-48">
        <ReusableDoughnutGraph
          data={{
            labels: [],
            datasets: [
              {
                data: [dofollowvsNofollow?.dofollow,dofollowvsNofollow?.nofollow],
                backgroundColor: ["#12B76A", "#D1FADF"],
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
        <div className="flex flex-col justify-end">
          <p className=" text-xs flex items-center text-[#475467]">
            {" "}
            <span className="text-green-600">
              <GoDotFill />{" "}
            </span>{" "}
            {`Dofollow (${dofollowvsNofollow?.dofollow}) `}{" "}
          </p>
          <p className=" text-xs flex items-center text-[#475467]">
            {" "}
            <span className="text-green-400">
              <GoDotFill />{" "}
            </span>
            {` Nonfollow (${dofollowvsNofollow?.nofollow}) `}{" "}
          </p>
        </div>
      </div>
    </section>
  );
}
