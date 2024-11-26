import { DataTable } from "@/components/ui/data-table";
import React, { useState } from "react";
import { ExploreContentTableColumns } from "../columns/content-analysis-column";
import {
  exploreContentTableData,
  ExploreContentTableItemType,
} from "../data/exploreContentTableData";
import { exploreContentDataType } from "@/types/contentAnalysis";

interface ExploreContentProps {
  data: exploreContentDataType;
}
export default function ExploreContent({ data }: ExploreContentProps) {
  const [currentTab, setCurrentTab] = useState("All pages");
  const tab = ["All pages", "Blog", "News"];
  const exploreResults = data?.crawlings.flatMap((crawling) =>
    crawling.crawlingData.flatMap((crawlingData) => crawlingData.data)
  ) ?? [{}];

  const transformedDataForTable = exploreResults.map((item) => ({
    info: {
      title: item.page_title ?? "",
      link: item.url,
      description: item.snippet,
      author: "",
      date_published: new Date(String(item.date_published)),
      language: item.language,
      // socialMediaHandles: {
      //   [key: string]: number,
      // },
    },
    dr: item.domain_rank,
    ur: item.url_rank,
    bss: item.spam_score,
    page_type: item.page_types?.length > 0 ? item.page_types[0] : "",
    rating: Array.isArray(item.ratings)
      ? item.ratings[0]?.rating_count
      : item.ratings ?? 0,
    cqs: item.content_quality_score,
    content_type: item.page_types?.length > 0 ? item.page_types[0] : "",
    sentiment: [
      String(item.sentiment?.anger),
      String(item.sentiment?.fun),
      String(item.sentiment?.happiness),
      String(item.sentiment?.love),
      String(item.sentiment?.sadness),
      String(item.sentiment?.share),
    ],
  }));

  // console.log(exploreResults);

  return (
    <section className="flex flex-col ">
      <div className="flex justify-between items-center gap-2 ">
        <div className="flex gap-2">
          {tab.map((item, i) => (
            <button
              onClick={() => setCurrentTab(item)}
              key={i}
              className={`border py-2 rounded-md px-5 ${
                currentTab === item && "bg-[#EFF8FF] border-none"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {/* <div className="flex items-center gap-2">
          <select name="" id="" className="rounded-md border p-2">
            <option value="Domain rank">Domain rank</option>
          </select>
          <select name="" id="" className="rounded-md border p-2">
            <option value="URL rank">URL rank</option>
          </select>
          <select name="" id="" className="rounded-md border p-2">
            <option value="Rating">Rating</option>
          </select>
          <select name="" id="" className="rounded-md border p-2">
            <option value="Domain rank">CQS</option>
          </select>
          <select name="" id="" className="rounded-md border p-2">
            <option value="Domain rank">Date published</option>
          </select>
        </div> */}
        {/* <div className="rounded-md border p-2">
          <label htmlFor="sortBy">Sort by:</label>
          <select name="" id="sortBy" className="border-none outline-none">
            <option value="Domain rank">Ascending</option>
          </select>
        </div> */}
      </div>

      <div className="border rounded-md my-8 overflow-x-auto w-full">
        <h1 className="p-4 text-lg font-semibold">
          {transformedDataForTable?.length ?? 0} results
        </h1>
        <DataTable
          columns={ExploreContentTableColumns}
          data={transformedDataForTable}
        />
      </div>
    </section>
  );
}
