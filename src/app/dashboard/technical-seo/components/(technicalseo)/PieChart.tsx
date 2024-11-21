import { Pie } from "react-chartjs-2";
import {  ChartData,ArcElement, Chart } from "chart.js";

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};
Chart.register(ArcElement);
interface Props {
    data: ChartData<"pie">; 
}
export default function PieChart({data}:Props) {
  return (
    <div className="h-full w-full">
        <Pie data={data} options={options} />
    </div>
  )
}
