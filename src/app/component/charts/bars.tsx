import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

interface Props {
  pageData: number[];
}

export const ChangeLineChart = ({ pageData }: Props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const borderColor = pageData && pageData.length > 0 ? (pageData[0] > pageData[pageData.length - 1] ? '#ECFDF3' 
  : pageData[0] === pageData[pageData.length - 1] ? 'gray' : '#FEF3F2') : 'gray';


  const data = {
    labels: pageData?.slice(0, 4),
    datasets: [
      {
        data: pageData?.slice(0, 4).reverse(),
        fill: 'start',
        borderColor: pageData && pageData.length > 0 ? (pageData[0] > pageData[pageData.length - 1] ? 'green' 
        : pageData[0] === pageData[pageData.length - 1] ? 'gray' : 'red') : 'gray',
        borderWidth: 1,
        pointRadius: 0,
        pointBackgroundColor: borderColor,
        backgroundColor: borderColor,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.6,
      //   borderWidth: 2, 
      // borderDash: [5, 5],
      // borderColor:'green',

      },
      cubicInterpolationMode: 'monotone',
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className=" h-10 w-24">
      <Line data={data} options={options}  />
    </div>
  );
};

