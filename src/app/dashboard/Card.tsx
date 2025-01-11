import { FaArrowUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { formatDate } from "@/lib/DateFormater";
import { ShortenNumber } from "../utils/ShortenedNumber";
import Loader from "../component/Loader";

interface Props {
  title: string;
  amount: number | undefined | string;
  style: string;
  percent: number | undefined | string;
  arrowPosition?: string;
  chart: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean
}


function formatNumber(number: any) {
  number = parseFloat(number);

  if (number === 0) {
      return 0;
  }
  const numStr = Math.abs(number).toString();

  if (numStr.length < 2) {
      return number;
  }

  const firstTwo = parseInt(numStr.slice(0, 2), 10);
  return number < 0 ? -firstTwo : firstTwo;
}

export default function Card({
  title,
  style,
  amount,
  percent,
  chart,
  arrowPosition,
  isLoading,
  isError
}: Props) {
  const { metrics, loading, error } = useSelector(
    (state: RootState) => state.performance
  );
  const temp = metrics && metrics?.history?.scores;
  const lastScore = temp && temp[0];
  let lastUpdated: string | undefined;
  if (lastScore?.createdAt) {
    lastUpdated = formatDate({ inputDate: lastScore.createdAt });
  } else {
    ("");
  }

  // const latestDate = formatDate()

  // const chartData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Monthly Sales',
  //       data: [65, 59, 80, 81, 56, 55],
  //       fill: false,
  //       borderColor: 'rgb(75, 192, 192)',
  //       tension: 0.1,
  //     },
  //   ],
  // };

  const options = {
    scales: {
      x: {
        type: "category", // Correctly set the type to 'category'
      },
    },
  } as const;

  return (
    <div className={`flex  flex-col gap-6 w-full  sm:max-w-[390px]  h-[176px] rounded-md p-6 border border-gray-200 ${isLoading && "items-center justify-center"} ${isError && "items-center justify-center"}` }>
      {
        isLoading ? <div className="flex items-center justify-center h-6 w-6"> <Loader /> </div>
        :
        isError ? <h2 className="font-black"> N/A </h2>
        :
        <div className="">
        <div className="flex w-full justify-between items-center">
          <h5 className=" font-semibold text-base">{title}</h5>
          <p className=" text-sm font-normal">{lastUpdated}</p>
        </div>
        <div className="grid">
          <h1 className=" self-start font-semibold text-4xl"> {amount} </h1>
          <div className="flex items-center justify-between w-full ">
            <p className="flex items-center gap-2 text-sm">
              {/* <span className={style} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FaArrowUp className={arrowPosition}/> {percent && percent?.toFixed(1)}%
            </span> */}
              <span
                className={style}
                style={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <FaArrowUp className={arrowPosition} />{" "}
                {typeof percent === "number" ? formatNumber(percent) : percent}%
              </span>
              <span className="text-gray-600 font-medium">vs last update</span>
            </p>
            <span className="p-2 float-end">
              {/* <Line data={chartData} options={options} /> */}
              {/* <BarChart data1={0} data2={20} data3={60} /> */}
              {chart}
            </span>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export function SimpleCard({
  title,
  amount,
}: {
  title: string;
  amount: number;
}) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[390px] h-[176px] rounded-md p-6 border ">
      <h5 className=" font-semibold text-base">{title}</h5>
      <h1 className="font-bold text-4xl text-[#101828]">{amount} </h1>
    </div>
  );
}
