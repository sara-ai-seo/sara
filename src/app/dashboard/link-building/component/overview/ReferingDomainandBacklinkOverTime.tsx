import TitleAndDescription from "@/app/component/TitleAndDescription";
import BarChartSingle from "@/app/dashboard/technical-seo/components/(technicalseo)/BarChartSingle";
import { Title } from "@/app/dashboard/technical-seo/components/Overview";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import moment from "moment";


interface Props {
  crawlDays : string[],
  backlinkData: number[],
  rDomain: number[]
}


export default function ReferingDomainandBacklinkOverTime({crawlDays, backlinkData, rDomain}: Props) {
  const labels = crawlDays.slice(0,10).map((label: any) => moment(label?.createdAt?.replace(/^0+/, '')).format("MMM DD"));

  const options = {
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
      },
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: {
            size: 12,
          },
          color: '#333',
          usePointStyle: true,
          backgroundColor: "#333",
          pointStyle: 'circle',
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        ticks: {
          stepSize: 10,
        },
        grid: {
          drawTicks: false,
        },
      },
    },
  };

  

  const data = {
    // changing labels to changes values on X-axis.
    labels: labels,
    // each label must be unique name
    // add a new #color for backgroundColor, borderColor, pointBorderColor, pointHoverBackgroundColor properties for every new entry
    datasets: [
      {
        color: "#fff",
        label: "Backlinks",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#1849A9",
        borderColor: "#1849A9",
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderColor: "#1849A9",
        pointBackgroundColor: "#1849A9",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#2a2c30",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 5,
        pointRadius: 0,
        pointHitRadius: 5,
        // always the number of elements in the data array have to be equal to the number of elements in label.
        data: backlinkData
      },
      {
        color: "#000",
        label: "Referring domains",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#84CAFF",
        borderColor: "#84CAFF",
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderColor: "#84CAFF",
        pointBackgroundColor: "#84CAFF",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#f84c1e",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 5,
        pointRadius: 0,
        pointHitRadius: 5,
        // data: [20, 39, 10, 11, 16, 2, 40]
        data: rDomain
      }
    ]
  };

  return (
    <section className="grid gap-4 border shadow-sm rounded-md p-4 py-6">
      <Title title={"Referring domains and backlinks over time"} info="Referring domains and backlinks over time" />
      {/* <BarChartSingle labels={[]} data={[]} xAxisLabel="Month" yAxisLabel="Amount" /> */}
      <Line data={data as ChartData<"line", number[], string>} options={options as ChartOptions<"line">} />
    </section>
  )
}
