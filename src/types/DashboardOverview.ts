interface Current {
    performance: {
        performanceScore: number,
        firstContentfulPaint: number,
        largestContentfulPaint: number,
        cumulativeLayoutShift: number,
        totalBlockingTime: number,
        speedIndex: number,
        timeToInteractive: number
    },
    accessibility: {
        accessibilityScore: number
    },
    traffic: {},
    seo: {
        seo_scores: {
            Score: number
        }
    },
    mobile: {},
    recommendation: {},
    ai_recommendation: {}
}


export interface Scores {
    id: number | undefined;
    organic_traffic: number | undefined;
    average_time_on_site: number | undefined;
    organic_keywords: number | undefined;
    overall_seo: number | undefined;
    lcp: number | undefined,
    tbt: number | undefined,
    cls: number | undefined,
    siteIssue: number | undefined,
    crawlStatus: string | undefined,
    httpStatus: string,
    accessibility_score: number | undefined;
    performance: number | undefined;
    best_practice_score: number | undefined;
    user_id: number | undefined;
    date: string | undefined;
    url: string | undefined;
    website: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
}


interface Backlink {
    id: number;
    url: string;
    backlinks: string[]; 
    counts: number;
    new: number;
    lost: number;
    createdAt: string;
    updatedAt: string;
}

interface BacklinksResponse {
    backlinks: Backlink[];
}

interface Traffic {
    id: number;
    bounceRate: number;
    total: number;
    social: number;
    paid: number;
    mail: number;
    referrals: number; // Corrected spelling from "refferrals" to "referrals"
    search: number;
    organic: number;
    website: string;
    createdAt: string;
    updatedAt: string;
  }
  


interface KeywordPosition {
    position: number;
    totalResults: number;
}

interface Traffic {
    traffic: [];
}
type CurrentKeywords = Record<string, KeywordPosition>;


// interface KeywordResponse {
//     current: CurrentKeywords;
//     previous: string[];
// }

export interface KeywordData {
    [key: string]: Array<{
      position: number;
      previousPosition: number;
      totalResults: number;
      createdAt: string;
    }>;
  }
  

export interface PerformanceMetrics {
    url: string;
    history: {
        scores: Scores[];
        backlinks: Backlink[],
        keyword: KeywordData,
        previous: [],
        traffic: Traffic[]
    }
}
