type CrawlingData = {
    data?: {
      google?: {
        organic_traffic?: number;
      };
      bing?: {
        organic_traffic?: number;
      };
    };
  };
  
  type Crawling = {
    crawlingData?: CrawlingData[];
  };
  
  type Project = {
    crawlings?: Crawling[];
  };
  
  type OverviewData = {
    project?: Project;
  };
  
  export function getFirstOrganicTraffic(overviewData: OverviewData, n: number, source: 'google' | 'bing'): number[] {
    const organicTrafficArray: number[] = [];
    const crawlings = overviewData?.project?.crawlings || [];
  
    for (let i = 0; i < crawlings.length && organicTrafficArray.length < n; i++) {
      const crawlingData = crawlings[i]?.crawlingData || [];
      for (let j = 0; j < crawlingData.length && organicTrafficArray.length < n; j++) {
        const organicTraffic = crawlingData[j]?.data?.[source]?.organic_traffic;
        if (organicTraffic !== undefined) {
          organicTrafficArray.push(organicTraffic);
        }
      }
    }
  
    return organicTrafficArray;
  }