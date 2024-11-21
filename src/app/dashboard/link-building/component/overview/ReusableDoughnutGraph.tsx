import { ChartData } from 'chart.js';
import React from 'react'
import { Doughnut } from 'react-chartjs-2';


interface DoughnutData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

interface Props {
    data : DoughnutData
}

export function ReusableDoughnutGraph({data}:Props) {
    
    if (!data) {
        return <div>No data available</div>;
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        cutoutPercentage: 90,
        aspectRation: 1
    };

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    )
}
