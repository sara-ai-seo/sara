import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface Props {
    outerColor: string;
    innerColor: string;
    innermostColor: string;
    innerProgress: number;
    innermostProgress: number;
    outerProgress: number;
}

const TripleCircleProgressBar = ({ outerColor, innerColor, innermostColor, outerProgress, innerProgress, innermostProgress }: Props) => {
  const data = {
    labels: ['Outer', 'Inner', 'Innermost'],
    datasets: [
      {
        data: [100 - outerProgress, outerProgress],
        backgroundColor: [outerColor, 'transparent'],
        borderWidth: 0,
      },
      {
        data: [100 - innerProgress, innerProgress],
        backgroundColor: [innerColor, 'transparent'],
        borderWidth: 0,
      },
      {
        data: [100 - innermostProgress, innermostProgress],
        backgroundColor: [innermostColor, 'transparent'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutoutPercentage: 70,
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    animation: {
      animateRotate: true,
      animateScale: false,
    },
    plugins:{
        legend:{
            display: false
        }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default TripleCircleProgressBar;

