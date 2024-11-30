interface MonthlySearch {
  year: number;
  month: number;
  search_volume: number;
}
export interface KeywordDataDto {
  cpc: number;
  device: string;
  keyword: string;
  categories: number[] | null;
  competition: string;
  high_top_of_page_bid: number,
  competition_index: number;
  language_code: string;
  location_code: number;
  search_volume: number;
  search_partners: boolean;
  monthly_searches: MonthlySearch[];
}
