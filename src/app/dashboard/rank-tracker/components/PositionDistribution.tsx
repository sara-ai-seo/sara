import {useState , useEffect}  from "react";
import { Line } from "react-chartjs-2"
import { TitleWithoutUnderline } from "../../technical-seo/components/Overview"
import { ChartData, ChartOptions } from "chart.js";
import { useRankTrackingOverview } from "@/app/services/crawlers/rank_tracking";
import moment from "moment";
import Loader from "@/app/component/Loader";
import { CurrentProperty } from "@/app/utils/currentProperty";

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
          text: 'Number of Keywords',
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

interface Props {
    se: string,
    type: { name: string, value: string }
}
  
  export const PositionDistribution: React.FC<Props> = ({se, type}) => {

    const [isClient, setIsClient] = useState(false);
    const project = CurrentProperty();

    // const { isError, isPending, data: OverviewData } = useRankTrackingOverview("overview");
    const { isError, isPending, data: OverviewData } = useRankTrackingOverview("overview", project.id );
      const dist_labels = OverviewData?.project?.crawlings.map((label: any) => moment(label.createdAt.replace(/^0+/, '')).format("MMM DD"));

    
      
      const crawlings = OverviewData?.project?.crawlings;
      
      const distributions = 
        {
         "2 - 3": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_2_3),
         "4 - 10": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_4_10),
         "11 - 20": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_11_20),
         "21 - 30": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_21_30),
         "31 - 40": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_31_40),
         "41 - 50": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_41_50),
         "51 - 60": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_51_60),
         "61 - 70": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_61_70),
         "71 - 80": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_71_80),
         "81 - 90": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_81_90),
         "91 - 100": crawlings?.map((item: any) => item?.crawlingData[0].data?.[se]?.[type.value]?.pos_91_100),
       }


       useEffect(() => {
        setIsClient(true);
      }, []);
    
      if (!isClient) {
        return null;
      }
    const data = {
      // changing labels to changes values on X-axis.
      labels: dist_labels,
      // each label must be unique name
      // add a new #color for backgroundColor, borderColor, pointBorderColor, pointHoverBackgroundColor properties for every new entry
      datasets: [
        {
          color: "#000",
          label: "2 - 3",
          fill: false,
          lineTension: 0.3,
          backgroundColor: "#717BBC",
          borderColor: "##717BBC",
          borderCapStyle: "round",
          borderJoinStyle: "round",
          pointBorderColor: "#717BBC",
          pointBackgroundColor: "#717BBC",
          pointBorderWidth: 0.2,
          borderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#717BBC",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 5,
          pointRadius: 0,
          pointHitRadius: 5,
          // always the number of elements in the data array have to be equal to the number of elements in label.
          data: distributions["2 - 3"]
        },
        {
          color: "#000",
          label: "4 - 10",
          fill: false,
          lineTension: 0.3,
          backgroundColor: "#F97066",
          borderColor: "#F97066",
          borderCapStyle: "round",
          borderJoinStyle: "round",
          pointBorderColor: "#F97065",
          pointBackgroundColor: "#F97066",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#f84c1e",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 5,
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 5,
          // data: [20, 39, 10, 11, 16, 2, 40]
          data: distributions["4 - 10"]
        },
        {
          color: "#000",
          label: "11 - 20",
          fill: false,
          lineTension: 0.3,
          backgroundColor: "#36BFFA",
          borderColor: "#36BFFA",
          borderCapStyle: "round",
          borderJoinStyle: "round",
          pointBorderColor: "#36BFFA",
          pointBackgroundColor: "#36BFFA",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#008000",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 5,
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 5,
          // data: [10, 49, 15, 31, 26, 21, 50]
          data: distributions["11 - 20"]
        },
        {
          color: "#000",
          label: "21 - 30",
          fill: false,
          lineTension: 0.3,
          backgroundColor: "#F670C7",
          borderColor: "#F670C7",
          borderCapStyle: "round",
          borderJoinStyle: "round",
          pointBorderColor: "#F670C7",
          pointBackgroundColor: "#F670C7",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#F670C7",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 5,
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 5,
          // data: [10, 49, 15, 31, 26, 21, 50]
          data: distributions["21 - 30"]
        },
        {
          color: "#000",
          label: "31 - 40",
          fill: false,
          lineTension: 0.3,
          backgroundColor: "#39D583",
          borderColor: "#39D583",
          borderCapStyle: "round",
          borderJoinStyle: "round",
          pointBorderColor: "#32D583",
          pointBackgroundColor: "#32D583",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#39D583",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 5,
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 5,
          // data: [10, 49, 15, 31, 26, 21, 50]
          data: distributions["31 - 40"]
        },
        {
          color: "#000",
          label: "41 - 50",
          fill: false,
          lineTension: 0.3,
          backgroundColor: "#ffef00",
          borderColor: "#ffef00",
          borderCapStyle: "round",
          borderJoinStyle: "round",
          pointBorderColor: "#ffef00",
          pointBackgroundColor: "#ffef00",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#ffef00",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 5,
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 5,
          // data: [10, 49, 15, 31, 26, 21, 50]
          data: distributions["41 - 50"]
        },
        // {
        //   color: "#000",
        //   label: "51 - 60",
        //   fill: false,
        //   lineTension: 0.3,
        //   backgroundColor: "#39D583",
        //   borderColor: "#39D583",
        //   borderCapStyle: "round",
        //   borderJoinStyle: "round",
        //   pointBorderColor: "#eedc82",
        //   pointBackgroundColor: "#eedc82",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "#eedc82",
        //   pointHoverBorderColor: "#eedc82",
        //   pointHoverBorderWidth: 5,
        //   pointRadius: 0,
        //   pointHitRadius: 5,
        //   // data: [10, 49, 15, 31, 26, 21, 50]
        //   data: distributions["51 - 60"]
        // },
        // {
        //   color: "#000",
        //   label: "61 - 70",
        //   fill: false,
        //   lineTension: 0.3,
        //   backgroundColor: "#39D583",
        //   borderColor: "#39D583",
        //   borderCapStyle: "round",
        //   borderJoinStyle: "round",
        //   pointBorderColor: "#00FFFF",
        //   pointBackgroundColor: "#00FFFF",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "#39D583",
        //   pointHoverBorderColor: "#fff",
        //   pointHoverBorderWidth: 5,
        //   pointRadius: 0,
        //   pointHitRadius: 5,
        //   // data: [10, 49, 15, 31, 26, 21, 50]
        //   data: distributions["61 - 70"]
        // },
    ]
};


    return (
        <>
            {/* <TitleWithoutUnderline
                title={"Position distributions "}
                info={"Position distributions"}
              /> */}
              <Line data={data as ChartData<"line", number[], string>} options={options as ChartOptions<"line">} />
        </>
    )
}