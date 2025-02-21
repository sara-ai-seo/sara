import { calculatePercentageDifference } from "@/lib/DateFormater"
import Card from "../Card"
import { arrowStyle, getClass } from "@/helper"
import { LineChart } from "../technical-seo/components/LineChart"


export function formatSignificantNumber(num: number) {
    if (num === 0) return "0.00";
    
    const scale = Math.pow(10, -Math.floor(Math.log10(Math.abs(num))));
    const scaledNumber = num * scale;
    
    const formattedNumber = scaledNumber.toFixed(2);
    
    return formattedNumber;
  }
  


interface TTIProps {
    amount: number,
    difference: number,
    chartData: any[],
    previous: number,
}
export const TimeToInteractive: React.FC<TTIProps> = ({
    amount,
    chartData,
    difference,
    previous
}) => {
    
    // console.log("PER", amount, previous)

    return (
        <div>
            <Card title={"Time to interactive"}
                amount={`${amount}ms`}
                style={getClass(difference)}
                percent={calculatePercentageDifference(previous, amount)}
                chart={<LineChart pageData={chartData} />}
                arrowPosition={arrowStyle(difference)}
                showDescription
                description="How long it takes for your website to be ready for you to click or interact."
            />
        </div>
    )
}