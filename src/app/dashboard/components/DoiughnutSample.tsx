import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

const data: ChartData<'doughnut'> = {
  labels: ['Label 1', 'Label 2', 'Label 3'],
  datasets: [
    {
      data: [30, 40, 30],
      backgroundColor: ['#red', '#green', '#blue'],
      hoverBackgroundColor: ['#red', '#green', '#blue']
    }
  ]
};

const options = {
    cutoutPercentage: 50,
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          // Return a custom label for each segment
        }
      }
    },
    centerText: {
      display: true,
      text: 'Custom Center Text', // Add a label in the center
      fontSize: 20, // Adjust the font size
      color: '#000' // Adjust the font color
    }
  } as  any;

export const DoughnutSample = () => {
  return (
    <Doughnut
      data={data}
      options={options}
    />
  );
};