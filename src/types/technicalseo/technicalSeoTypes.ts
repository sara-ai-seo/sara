interface SiteIssues {
  errors: {
    line: number;
    column: number;
    message: string;
    status_code: number;
  }[];
  warnings: {
    line: number;
    column: number;
    message: string;
    status_code: number;
  }[];
}

export type Issues = {
  id: string;
  score: number;
  title: string;
  description: string;
  scoreDisplayMode: "metricSavings" | "binary";
};

type issuesDataTab = {
  issueArr: Issues[];
};

interface core_web {
  first_input_delay: {
    good: number;
    poor: number;
    needs_improvement: number;
  };
  cumulative_layout_shift: {
    good: number;
    poor: number;
    needs_improvement: number;
  };
  largest_contentful_paint: {
    good: number;
    poor: number;
    needs_improvement: number;
  };
}

interface CrawlStatus {
  pages_crawled: number;
  pages_in_queue: number;
  max_crawl_pages: number;
}

export interface CrawlingDataOverview {
  id: number;

  tab: "overview";
  data: {
    core_web_vitals: core_web;
    cost: number;
    site_health: number;
    site_issues: SiteIssues;
    issues: Issues[];
    status_code: StatusCode;
    tasks_count: number;
    crawl_status: CrawlStatus;
    crawl_progress: string;
    time_to_interactive: number;
    cumulative_layout_shift: number;
    largest_contentful_paint: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface StatusCode {
  "4xx": number;
  "5xx": number;
  is_broken: number;
  is_redirect: number;
}

export interface CrawledDetail {
  pages_crawled: number;
  pages_in_queue: number;
  max_crawl_pages: number;
}

export interface CrawlingDataCrawlability {
  id: number;
  crawlingId: number;
  tab: "crawlabilityAndIndexibility";
  data: {
    cost: number;
    items: {
      url: string;
      reason: string;
    }[];
    progress: string;
    indexable: number;
    total_page: number;
    status_code: StatusCode;
    crawled_detail: CrawledDetail;
    non_indexible_count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type SitePerformanceData = {
  id: number;
  crawlingId: number;
  tab: "sitePerformance";
  data: {
    issues: Array<{
      id: string;
      score: number;
      title: string;
      description: string;
      scoreDisplayMode: string;
    }>;
    page_load_speed: number[];
    performance_issues: Array<{
      id: string;
      score: number;
      title: string;
      description: string;
      scoreDisplayMode: string;
    }>;
    amount_of_javascript: Array<{
      error: {
        errors: Array<{
          line: number;
          column: number;
          message: string;
          status_code: number;
        }>;
        warnings: Array<{
          line: number;
          column: number;
          message: string;
          status_code: number;
        }>;
      };
      script_count: number;
      stylesheet_count: number;
    }>;
    average_page_load_speed: number;
  };
  createdAt: string;
  updatedAt: string;
};

export type IssueTab = {
  id: number;
  crawlingId: number;
  tab: string;
  data: issuesDataTab;
  createdAt: string;
  updatedAt: string;
};

// Union type for the different crawling data types
export type CrawlingData =
  | CrawlingDataOverview
  | CrawlingDataCrawlability
  | SitePerformanceData
  | IssueTab;

export interface Crawler {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface InitialState {
  // project: Project;
  crawlings: Array<{
    crawler: Crawler;
    crawlingId: number;
    crawlingData: CrawlingData[];
    createdAt: string;
    updatedAt: string;
    projectId: number;
  }>;
  createdAt: string;
  domain: string;
  id: number;
  updatedAt: string;
  userId: number;
}

export type OverviewDataType = {
  crawlId: number;
  coreWebVital: core_web;
  cost: number;
  siteHealth: number;
  Issues: Issues[];
  status_code: StatusCode;
  errorsCount: number;
  warningsCount: number;
  tasksCount: number;
  pagesCrawled: number;
  pagesInQueue: number;
  maxCrawlPages: number;
  crawlProgress: string;
  timeToInteractive: number;
  cumulativeLayoutShift: number;
  largestContentfulPaint: number;
  createdAt: string;
  updatedAt: string;
};
