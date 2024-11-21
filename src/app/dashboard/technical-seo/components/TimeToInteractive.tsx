import Card from "../../Card";
import { calculatePercentageDifference } from "@/lib/DateFormater";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import { LineChart } from "./LineChart";
import { arrowStyle, getClass } from "@/helper";

interface Props {
  title: string,
  score: number,
  current: number,
  previous: number,
  chartData: any[],
}
export  const TimeToInteractive: React.FC<Props>  = ({
  title,
  score,
  current,
  previous
}) => {
  return (
    <Card
      title={title}
      amount={`${ShortenNumber(score)}s`}
      style={
        getClass(current - previous)
      }
      percent={calculatePercentageDifference(previous, current)}
      chart={<LineChart pageData={[6,3,4]} />}
      arrowPosition={
        arrowStyle(current - previous)
      }
    />
  );
}
