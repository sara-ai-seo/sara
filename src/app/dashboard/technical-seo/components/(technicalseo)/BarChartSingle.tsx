import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  labels: string[];
  data: number[] | string[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  backgroundColor?: string;
}

const BarChartSingle: React.FC<Props> = ({
  labels,
  data,
  title = "Chart.js Bar Chart",
  xAxisLabel = "Crawl date",
  yAxisLabel = "Number of pages",
  backgroundColor,
}) => {
  const options = {
    responsive: true,
    barThickness: 30,
    scales: {
      x: {
        barPercentage: 0.01,
        categoryPercentage: 1.0,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        text: title,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data,
        backgroundColor,
        borderRadius: 10,
        barPercentage: 1.0,
        width: 100,
      },
    ],
  };

  return (
    <div className="h-full w-full">
      <Bar options={options} data={chartData} width={"150%"} height={"60%"} />
    </div>
  );
};

export default BarChartSingle;

// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface Props {
//   label: [],
//   data: []
// }

// const labels = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August','September'];
// const mockData = [100, 300, 100, 200, 500,900, 100, 200, 800, 900];

// export const options = {
//   responsive: true,
//   scales: {
//     x: {
//         barPercentage: 0.4,
//         categoryPercentage: 0.4,
//       grid: {
//         display: false
//       },
//       title: {
//         display: true,
//         text:'Crawl date'
//       }

//     },
//     y: {
//       grid: {
//         display: false
//       },
//       title:{
//         display: true,
//         text:'Number of pages'
//       }
//     }
//   },
//   plugins: {
//     legend: {
//       position: 'top' as const,
//       display: false
//     },
//     title: {
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: mockData,
//       backgroundColor: '#53B1FD',
//       borderRadius: 20,
//       barPercentage: 1.0,
//       width: 100
//         // categoryPercentage: 1.0,

//     },
//   ],
// };

// export function BarChartSingle() {
//   return (
//     <div className='h-full w-full'  >
//       <Bar options={options} data={data} width={'200%'} height={'60%'} />
//     </div>
//   )
// }
