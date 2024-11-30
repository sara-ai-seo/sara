
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const data = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
export default function DoughnutChart() {
  
  return (
   <Doughnut data={data} options={options} />
  )
}

interface CustomDoughnutChartDto {
  labels: string[],
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number
  
}
export const CustomDoughnutChart = ({labels, label, data, backgroundColor, borderColor} : CustomDoughnutChartDto) => {

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const anotherOptions ={
    plugins: {
      legend: {
        display: false,
        textInside: true
      },
    },
    cutoutPercentage: 80,
    responsive: true,
   
  }

  return <Doughnut data={chartData} options={anotherOptions} />
}

