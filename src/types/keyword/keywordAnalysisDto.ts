

  // Interface for monthly search data
export interface MonthlySearch {
    year: number;
    month: number;
    search_volume: number;
  }
  
  // Interface for individual search volume data
  export interface BingSearchVolumeData {
    cpc: number;
    device: string;
    keyword: string;
    categories: string | null;
    competition: number;
    language_code: string;
    location_code: number;
    search_volume: number;
    monthly_searches: MonthlySearch[];
  }
  
  // Interface for global search volume data
  export interface GlobalSearchVolume {
    percentage: number;
    search_volume: number;
    country_iso_code: string;
  }
  
  // Interface for Google search volume data
  export interface GoogleSearchVolume {
    cpc: number;
    keyword: string;
    competition: string;
    language_code: string;
    location_code: number;
    search_volume: number;
    monthly_searches: MonthlySearch[];
    competition_index: number;
    low_top_of_page_bid: number;
    high_top_of_page_bid: number;
  }
  
  // Interface for keyword ideas
  export interface KeywordIdea {
    volume: number;
    keyword: string;
  }
  
  // Main interface for each data entry
  export interface CrawlingData {
    id: number;
    crawlingId: number;
    tab: string;
    data: BingSearchVolumeData | GlobalSearchVolume[] | GoogleSearchVolume | KeywordIdea[];
    createdAt: string;
    updatedAt: string;
  }
  
  // The response is simply an array of CrawlingData
  export type KeywordAnalysisDto = CrawlingData[];


  