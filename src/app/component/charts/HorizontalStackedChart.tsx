import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartOptions {
  responsive: boolean;
  align: 'start';
  indexAxis: 'y';
  scales: {
    y: {
      stacked: boolean;
      beginAtZero: boolean;
      grid: {
        display: boolean;
      };
    };
    x: {
      stacked: boolean;
      beginAtZero: boolean;
      grid: {
        display: boolean;
      };
    };
  };
  layout: {
    padding: {
      top: number;
      bottom: number;
    };
  };
  elements: {
    bar: {
      borderRadius: number;
    };
    point: {
      radius: number;
    };
  };
  plugins: {
    legend: {
      position: 'top';
      align: 'end';
      labels: {
        usePointStyle: boolean;
      };
    };
  };
  barThickness: number;
}

export const options: ChartOptions = {
  responsive: true,
  align: 'start', // Align bars to the start (left)
  indexAxis: 'y', // Set the index axis to y-axis for horizontal bars
  scales: {
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false, // Remove grid lines for the y-axis
      },
    },
    x: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false, // Remove grid lines for the x-axis
      },
    },
  },
  layout: {
    padding: {
      top: 10,
      bottom: 10,
    },
  },
  elements: {
    bar: {
      borderRadius: 10, // Set border radius for bars
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        usePointStyle: true,
      },
    },
  },
  barThickness: 30, // Set the height of each bar
};

export const data = {
  labels: [2],
  datasets: [
    {
      label: 'Lost',
      data: [25, 43],
      backgroundColor: '#F97066',
    },
    {
      label: 'New',
      data: [2, 19],
      backgroundColor: '#32D583',
    },
    {
      label: 'New',
      data: [2, 19,12],
      backgroundColor: 'red',
    },
  ],
};

export function HorizontalStackedChart() {
  return (
    <div className='overflow-x-auto w-full h-full'>
      <Bar options={options} data={data} />
    </div>
  );
}
