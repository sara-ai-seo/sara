// import { calculatePercentage } from "@/lib/DateFormater";
import Card from "../../Card";
import { LineChart } from "./LineChart";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import { arrowStyle, getClass } from "@/helper";
import { calculatePercentageDifference } from "@/lib/DateFormater";


interface Props {
  score: number,
  current: number,
  previous: number,
  title: string,
  chartData: any[],

}
export const LCP: React.FC<Props> = ({
  score,
  current,
  previous,
  title,
  chartData,
}) => {

  
  return (
    <Card
    title={title}
    amount={`${ShortenNumber(score)}s`}
    style={
      getClass(current - previous)
    }
    percent={calculatePercentageDifference(previous, current)}
    chart={<LineChart pageData={chartData} />}
    arrowPosition={
      arrowStyle(current - previous)
    }
  />
  )
}
