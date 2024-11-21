interface RankTrackingEngine {
    organic_new: number;
    organic_lost: number;
    paid_positions: {
      etv: number;
      count: number;
      is_up: number;
      pos_1: number;
      is_new: number;
      is_down: number;
      is_lost: number;
      pos_2_3: number;
      pos_4_10: number;
      pos_11_20: number;
      pos_21_30: number;
      pos_31_40: number;
      pos_41_50: number;
      pos_51_60: number;
      pos_61_70: number;
      pos_71_80: number;
      pos_81_90: number;
      pos_91_100: number;
      estimated_paid_traffic_cost: number;
      clickstream_etv?: number;
      impressions_etv?: number;
      clickstream_age_distribution?: any;
      clickstream_gender_distribution?: any;
    };
    organic_traffic: number;
    featured_snippet: number;
    organic_positions: {
      etv: number;
      count: number;
      is_up: number;
      pos_1: number;
      is_new: number;
      is_down: number;
      is_lost: number;
      pos_2_3: number;
      pos_4_10: number;
      pos_11_20: number;
      pos_21_30: number;
      pos_31_40: number;
      pos_41_50: number;
      pos_51_60: number;
      pos_61_70: number;
      pos_71_80: number;
      pos_81_90: number;
      pos_91_100: number;
      clickstream_etv?: number;
      impressions_etv?: number;
      estimated_paid_traffic_cost: number;
      clickstream_age_distribution?: any;
      clickstream_gender_distribution?: any;
    };
    new_ranking_elements: number;
    estimated_paid_traffic_cost: number;
  }
  
  interface RankTracking {
    bing: RankTrackingEngine;
    google: RankTrackingEngine;
  }
  
  interface RankTrackingExtracted {
    bing: {
      organicTraffic: number;
      newRankingElements: number;
      featuredSnippet: number;
    };
    google: {
      organicTraffic: number;
      newRankingElements: number;
      featuredSnippet: number;
    };
  }
  
  interface RankTrackingDifferences {
    bing: {
      organicTrafficDifference: number;
      newRankingElementsDifference: number;
      featuredSnippetDifference: number;
    };
    google: {
      organicTrafficDifference: number;
      newRankingElementsDifference: number;
      featuredSnippetDifference: number;
    };
  }
  
  interface TechSeoCurrent {
    siteHealth: number;
    timeToInteractive: number;
    cumulativeLayoutShift: number;
    largestContentfulPaint: number;
    cumulativeLayoutShiftHistory: any[],
    largestContentfulPaintHistory: any[],
    timeToInteractiveHistory: any[]
  }
  
  interface TechSeoDifferences {
    siteHealthDifference: number;
    timeToInteractiveDifference: number;
    cumulativeLayoutShiftDifference: number;
    largestContentfulPaintDifference: number;
  }
  
  interface NewVsLost {
    newReferringMainDomains: number;
    lostReferringMainDomains: number;
    updatedAt: string;
  }
  
  interface DashboardDto {
    techSeo: {
      current: TechSeoCurrent;
      differences: TechSeoDifferences;
    };
    rankTracking: {
      current: RankTracking;
      extracted: RankTrackingExtracted;
      differences: RankTrackingDifferences;
    };
    newvslost: NewVsLost[];
  }