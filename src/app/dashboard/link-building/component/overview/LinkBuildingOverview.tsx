import React, { useState } from "react";
import Card from "../../../Card";
import ReferingDomainandBacklinkOverTime from "./ReferingDomainandBacklinkOverTime";
import BacklinkType from "./BacklinkType";
import { DofollowvsNofollow } from "./DofollowvsNofollow";
import NewvslostBacklink from "./NewvslostBacklink";
import { useLinkBuildingOverview } from "@/app/services/crawlers/link_building";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import { calculatePercentageDifference } from "@/lib/DateFormater";
import { LineChart } from "@/app/dashboard/technical-seo/components/LineChart";
import moment from "moment";

interface ParentProp {
  sendData: (lastUpdated: string) => void;
}

export default function LinkBuildingOverview({sendData}: ParentProp) {

  const { isError, isPending, isSuccess, data: OverviewData } = useLinkBuildingOverview("overview", sendData);
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  if(isSuccess) {
    sendData(OverviewData?.project?.crawlings[0]?.crawlingData[0]?.updatedAt);
  }

  const crawlingData = OverviewData?.project?.crawlings[0]?.crawlingData[0]?.data || {};
  const prevData = OverviewData?.project?.crawlings[1]?.crawlingData[0]?.data || {};
  const dts = calculatePercentageDifference(prevData?.domain_trust_score, crawlingData?.domain_trust_score)
  const totalBacklings = calculatePercentageDifference(prevData?.total_backlinks, crawlingData?.total_backlinks)
  const rDomains = calculatePercentageDifference(prevData?.refering_domains, crawlingData?.refering_domains)

  function extractDomainTrustScores() {
    const crawlings = OverviewData?.project?.crawlings;
    const data = crawlings.map((item: any)=> item?.crawlingData[0]?.data?.domain_trust_score);
    return data.slice(0,5)
}
console.log("RD", rDomains)
  function extractBacklinks() {
    const crawlings = OverviewData?.project?.crawlings;
    const data = crawlings.map((item: any)=> item?.crawlingData[0]?.data?.total_backlinks);
    return data.slice(0,5)
}
  function extractRDomains() {
    const crawlings = OverviewData?.project?.crawlings;
    const data = crawlings.map((item: any)=> item?.crawlingData[0]?.data?.refering_domains);
    return data.slice(0,5)
}
  function crawlingDays() {
    const crawlings = OverviewData?.project?.crawlings;
    const data = crawlings.map((item: any)=> item?.crawlingData[0]?.updatedAt);
    return data.slice(0,10)
}
const typeData = crawlingData?.backlink_type




  const newvsloss = OverviewData?.project?.crawlings?.map((item:any)=> {
    const each = item?.crawlingData[0]?.data?.new_vs_lost_backlink[0]?.items[0]
    return {
      date: item?.crawlingData[0]?.updatedAt,
      newD: each?.new_referring_domains,
      lostD: each?.lost_referring_domains
    }
  })

  const dates = newvsloss.map((date:any)=> moment(date?.date).format("MMM DD"))
  const lostData = newvsloss.map((lost:any)=> lost?.lostData)
  const newData = newvsloss.map((newd:any)=> newd?.newData)

  const arrowStyle = (value: number): string => {
    return value > 0 ? "text-green-500" : value < 0 ? "text-red-400 rotate-180" : "";
  };
  const getClass = (value: number) => {
    return value > 0 ? "text-green-200" : value < 0 ? "text-red-400" : "text-gray-200";
  };

  return (
    <main className="py-10 grid gap-8 ">
      <section className="grid gap-6 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 w-full">
        <Card
          title={"Domain trust score"}
          amount={`${crawlingData?.domain_trust_score?.toFixed(0) ?? 0}%`}
          style={getClass(dts)}
          percent={dts.toFixed(4)}
          chart={<LineChart pageData={extractDomainTrustScores()} />}
          arrowPosition={arrowStyle(dts)}
        />
        <Card
          title={"Total backlinks"}
          amount={ShortenNumber(crawlingData?.total_backlinks)}
          style={getClass(totalBacklings)}
          percent={totalBacklings?.toFixed(4)}
          chart={<LineChart pageData={extractBacklinks()} />}
          arrowPosition={arrowStyle(totalBacklings)}
        />
        <Card
          title={"Referring domains"}
          amount={ShortenNumber(crawlingData?.refering_domains)}
          style={getClass(rDomains)}
          percent={rDomains}
          chart={<LineChart pageData={extractRDomains()} />}
          arrowPosition={arrowStyle(rDomains)}
        />
      </section>
      <section className="grid sm:gap-6 sm:space-y-0 space-y-6 grid-cols-1 md:grid-cols-3">
        <DofollowvsNofollow dofollowvsNofollow={crawlingData?.do_follow_vs_no_follow}  />
        <div className="col-span-2 ">
          <ReferingDomainandBacklinkOverTime 
          crawlDays={crawlingDays()} 
          backlinkData={extractBacklinks()} 
          rDomain={extractRDomains()} />
        </div>
      </section>
      <section className="grid  sm:gap-6 sm:space-y-0 space-y-6 grid-cols-1 lg:grid-cols-3 ">
        <BacklinkType dates={crawlingDays()} dataType={typeData ?? []} />
        <div className="col-span-2">
          <NewvslostBacklink label={dates} lostData={lostData} newData={newData} />
        </div>
      </section>
    </main>
  );
}
