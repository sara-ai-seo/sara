import React from "react";
import { TitleWithoutUnderline } from "../../technical-seo/components/Overview";
import PieChart from "./PieChart";
import { GoDotFill } from "react-icons/go";
import { connotation } from "../data/connotationData";
import DoughnutChartWithBottomLegend from "./DoughnutChartWithBottomLegend";
import { sentimentDataset } from "../data/sentmentData";
import { contentAnalysisOverViewType } from "@/types/contentAnalysis";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface OverviewProps {
  OverviewData: contentAnalysisOverViewType;
}
export default function Overview({ OverviewData }: OverviewProps) {
  // console.log("CONTENT ANALYSIS(oVERVIEW)", OverviewData);

  const firstCrawling = OverviewData?.crawlings[0] ?? [];

  // Access the crawlingData array from the first crawling
  const crawlingDataArray = firstCrawling.crawlingData ?? [];

  // Access the first item in the crawlingData array
  const OverviewDataProperty = crawlingDataArray[0]?.data;

  const sentiment_connotations = OverviewDataProperty?.sentiment_connotations
    ? Object.entries(OverviewDataProperty.sentiment_connotations).flatMap(
        ([key, value]) => [{ label: key, percentage: value }]
      )
    : [{}];

  const sentiment_types = OverviewDataProperty?.connotation_types
    ? Object.entries(OverviewDataProperty.connotation_types).flatMap(
        ([key, value]) => [{ label: key, percentage: value }]
      )
    : [{}];

  const top_domains = OverviewDataProperty?.top_domains ?? [];

  // console.log(sentiment_connotations, top_domains);

  return (
    <section className="grid grid-cols-3 gap-10 mb-10 overflow-y-auto">
      {/* first grid */}
      <div className="flex flex-col gap-6 h-[480px] ">
        <div className="border rounded-md px-4">
          <div className="mt-6">
            <TitleWithoutUnderline
              title={"Aggregate rank"}
              info={"An overall score that combines different ranking factors."}
            />
          </div>

          <h1 className="text-4xl font-bold my-8">
            {OverviewDataProperty?.aggregate_rank ?? 0}
          </h1>
        </div>

        <div className="border rounded-md px-4 space-y-8 h-full">
          <div className="mt-6">
            <TitleWithoutUnderline
              title={"Connotation types"}
              info={"Categories that describe the tone or style of the content."}
            />

            <div className="flex h-[200px] w-full mt-6 gap-2">
              <PieChart dataSet={sentiment_types} />{" "}
              {/* <div className="flex flex-col justify-end">
                <p className="inline-flex gap-1 items-center whitespace-nowrap">
                  <GoDotFill className="text-green-500" />
                  Positive (44%)
                </p>
                <p className="inline-flex gap-1 items-center whitespace-nowrap">
                  <GoDotFill className="text-yellow-500" /> Neutral (44%)
                </p>
                <p className="inline-flex gap-1 items-center whitespace-nowrap">
                  <GoDotFill className="text-red-500" /> Negative (44%)
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* second grid */}
      <div className="border rounded-md h-[480px] px-4">
        <div className="mt-6">
          <TitleWithoutUnderline
            title={"Sentiment connotations"}
            info={"The general tone or emotion (positive, neutral, negative) shown in the content."}
          />
        </div>

        {/* <div className="h-full bg-red-400"> */}
        <DoughnutChartWithBottomLegend items={sentiment_connotations} />
        {/* </div> */}
      </div>
      {/* third grid */}
      <div className=" h-[480px] border rounded-md px-4">
        <div className="mt-6">
          <TitleWithoutUnderline title={"Top domains"} info={"The leading websites that are influencing your content’s ranking."} />
        </div>
        <hr className="mt-4" />
        <div className="overflow-x-auto max-w-full mt-4">
          <Table className="border rounded-lg border-separate border-spacing-0">
            <TableRow className="bg-[#F9FAFB] border-b">
              <TableHead className="w-full  text-left p-3">Domain</TableHead>
              <TableHead className="w-full  text-left p-3">Mentions</TableHead>
            </TableRow>
            {top_domains.map((toDomain, i) => (
              <TableRow className="border-b">
                <TableCell className="w-full  text-left p-3">{toDomain.domain}</TableCell>
                <TableCell className="w-full  text-left p-3">{toDomain.count}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </div>
    </section>
  );
}
