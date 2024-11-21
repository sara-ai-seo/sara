
import { RootState } from '@/app/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend:{
      position: 'top' as const,
      labels: {
        usePointStyle: true,
      }
    }
  },
  responsive: true,
  align:'end',
  barThickness: 30,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false
      }
    },
    y: {
      stacked: true,
      grid: {
        display:false
      }
    },
  },
};


export function BacklinkGraph() {

  const backlinkData = useSelector((state: RootState) => state.performance.metrics?.history.backlinks);

  const labels = backlinkData?.map((item)=> moment(item.createdAt).format("DD, MMMM, YY"));

const data = {
  labels,
  datasets: [
    {
      label: 'New',
      data: backlinkData?.map((item)=> item.new),
      backgroundColor: '#1570EF',
    },
    {
      label: 'Count',
      
      data: backlinkData?.map((item)=> item.counts),
      backgroundColor: '#84CAFF',
    }
  ],
};
  return <Bar options={options} data={data} />;
}
