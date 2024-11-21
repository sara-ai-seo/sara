import { RootState } from "@/app/store";
import moment from "moment";
import React from "react";
import { FaArrowDown } from "react-icons/fa6";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

// interface TableProps {
//   data: {
//     id: number;
//     keyword: string;
//     rank: string;
//     change: React.ReactNode;
//   }[];
// }

const KeywordTable: React.FC = () => {
  const keywords = useSelector(
    (state: RootState) => state.performance.metrics?.history?.keyword
  );
  return (
    <>
      <h2 className="my-3 text-sm">
        <span className=" font-medium ">Last updated: </span> 10th May,24{" "}
      </h2>
      <div className="w-full h-full rounded-md border overflow-x-auto  ">
        <table className="divide-y flex flex-col sm:min-w-[500px] w-auto divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr className="">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs rounded-tl-lg font-medium text-gray-500  tracking-wider"
              >
                Top keywords
              </th>
              <th
                scope="col"
                className="px-6 py-3 inline-flex gap-1 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Rank Position
                <button className="" title="Here is the rank position">
                  <RxQuestionMarkCircled />
                </button>
              </th>
              <th
                scope="col"
                className="px-6  inline-flex gap-1 rounded-tr-lg py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
              >
                Changes{" "}
                <button className="" title="Here is the changes">
                  <RxQuestionMarkCircled />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {keywords &&
              Object.entries(keywords).map(([keyword, items]) => (
                <tr key={keyword}>
                  <td className="px-6 py-4 whitespace-nowrap  truncate max-w-[200px]">
                    {keyword}
                  </td>
                  {items.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                      <td className="px-6 py-4 whitespace-nowrap truncate max-w-[300px]">
                        {item.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap truncate max-w-[300px] flex items-center gap-2">
                        <span
                          className={`px-4 p-2 rounded-3xl flex items-center gap-2 ${
                            item.position - item.previousPosition > 0
                              ? "bg-[#ECFDF3] text-[#027A48] "
                              : "bg-[#FEF3F2] text-[#B42318]"
                          } `}
                        >
                          {" "}
                          <FaArrowDown
                            className={`${
                              item.position - item.previousPosition > 0 &&
                              "rotate-180"
                            }`}
                          />{" "}
                          {item.position - item.previousPosition}
                        </span>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default KeywordTable;
