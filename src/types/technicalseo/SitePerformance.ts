interface PageData {
    url: string;
    average_load_speed: number;
    updatedAt: string; // Assuming you'll parse this into a Date object
  }
  
  interface AverageLoadSpeed {
    values: number;
    crawled: number;
    pages: PageData[];
  }
  
  type PageLoadSpeedData = {
    [key: string]: number;
  }

  interface CountCss {
    zeroToTen: number;
    elevenToTwenty: number;
    twentyOneToThirty: number;
    thirtyOneToFourty: number;
    fourtyOneToFifty: number;
    fiftyOneTohundred: number;
    gteHundred: number;
  }
  
 export interface SitePerformanceType {
    average_load_speed: AverageLoadSpeed;
    count_css: CountCss;
    pageLoadSpeed: PageLoadSpeedData;
  }
  

