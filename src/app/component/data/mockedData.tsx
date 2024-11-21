export const mockedData = [
    {keyword: 'When we price goods', gv:233, tf:211, cpc:1000, position:20, increase:true, volume:40, serp:['link','image','shop'], kd:20, traffic:35,url:'www.ogene.com'},
    {keyword: 'The cost of doing business', gv:100, tf:211, cpc:1000, position:30, increase:true, volume:30, serp:['link','video','shop'], kd:50, traffic:35,url:'www.ogene.com'},
    {keyword: 'Who is who in nollywood', gv:122, tf:211, cpc:1000, position:34, increase:true, volume:28, serp:['location','image','shop'], kd:45, traffic:35,url:'www.ogene.com'},
    {keyword: 'More about prices', gv:344, tf:211, cpc:1000, position:43, increase:true, volume:43, serp:['link','image','shop', 'location','video'], kd:30, traffic:35,url:'www.ogene.com'},
    {keyword: 'Ude ndi oja', gv:900, tf:211, cpc:1000, position:10, increase:true, volume:90, serp:['link','image','shop','video'], kd:20, traffic:35,url:'www.ogene.com'},
  ]



  export const PiechartMockedData = {
    labels: [23,45,2],
    datasets: [
      {
        label: 'Total',
        data: [24,87,10],
        backgroundColor: [
          '#F04438',
          '#FDB022',
          '#12B76A'
        ],
        borderColor: [
          '#F04438',
          '#FDB022',
          '#12B76A'
        ],
        borderWidth: 1,
      },
    ],
  }





  const chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 20, 82, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  export default chartData;
  