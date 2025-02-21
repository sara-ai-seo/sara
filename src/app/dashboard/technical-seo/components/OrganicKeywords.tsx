import Card from "../../Card";
import { RootState } from "@/app/store";
import { calculatePercentage } from "@/lib/DateFormater";
import { useSelector } from "react-redux";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import { LineChart } from "./LineChart";

export default function OrganicKeywords() {
  const { metrics } = useSelector((state: RootState) => state.performance);
  const scores = metrics?.history?.scores;
  let actual: any;
  let previosUpdate: any;

  if (scores && scores.length >= 2) {
    actual = scores[0];
    previosUpdate = scores[1];
  }

  const actualOrganicKeyword = scores?.[0]?.organic_keywords ?? 0;

  const style =
    scores?.length === 1
      ? "text-gray-500"
      : scores &&
        scores.length >= 2 &&
        scores[0] &&
        scores[1] &&
        scores[1]?.organic_keywords &&
        scores[0].organic_traffic &&
        scores[1].organic_keywords < scores[0].organic_traffic
      ? "text-green-500"
      : scores &&
        scores.length >= 2 &&
        scores[0] &&
        scores[1] &&
        scores[1]?.organic_traffic &&
        scores[0].organic_traffic &&
        scores[1]?.organic_traffic === scores[0]?.organic_traffic
      ? "text-gray-500"
      : "text-red-500";

  // Check if both previosUpdate and actual are defined
  const TrafficIncreasePercentage = (
    previousTraffic: number | undefined,
    currentTraffic: number | undefined
  ) => {
    if (previosUpdate && actual) {
      if (previousTraffic !== undefined && currentTraffic !== undefined) {
        const trafficIncrease = currentTraffic - previousTraffic;
        const trafficIncreasePercentage = calculatePercentage(
          trafficIncrease,
          previousTraffic
        );
        return trafficIncreasePercentage;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  //   const pageData = (scores ?? [])
  //     .map((item) => item.organic_keywords)
  //     .filter((value) => value !== undefined) as number[];

  const pageData = [2, 10];
  //   const checkPercentage = TrafficIncreasePercentage(
  //     previosUpdate?.organic_keywords,
  //     actual?.organic_keywords
  //   );

  const checkPercentage = 10;

  return (
    <Card
      title={"Organic Keywords"}
      amount={`${ShortenNumber(actualOrganicKeyword)}ms`}
      style={
        pageData.length === 1
          ? ""
          : pageData[0] > pageData[pageData.length - 1]
          ? "text-green-500"
          : pageData[0] === pageData[pageData.length - 1]
          ? "text-gray-500"
          : "text-red-500"
      }
      percent={checkPercentage}
      chart={<LineChart pageData={pageData} />}
      arrowPosition={
        pageData.length === 1
          ? ""
          : pageData[0] > pageData[pageData.length - 1]
          ? ""
          : pageData[0] === pageData[pageData.length - 1]
          ? ""
          : "rotate-i80"
      }
      showDescription
      description="How long it takes for your website to be ready for you to click or interact."
    />
  );
}
