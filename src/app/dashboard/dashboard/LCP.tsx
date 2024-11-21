import { calculatePercentageDifference } from "@/lib/DateFormater"
import Card from "../Card"
import { arrowStyle, getClass } from "@/helper"
import { LineChart } from "../technical-seo/components/LineChart"

interface LCPProps {
    amount: number,
    difference: number,
    chartData: any[],
    previous: number,
}
export const LCP: React.FC<LCPProps> = ({
    amount,
    chartData,
    difference,
    previous
}) => {
    return (
        <div>
            <Card title={"LCP"}
                amount={amount}
                style={getClass(difference)}
                percent={calculatePercentageDifference(previous, amount)}
                chart={<LineChart pageData={chartData} />}
                arrowPosition={arrowStyle(difference)}
            />
        </div>
    )
}