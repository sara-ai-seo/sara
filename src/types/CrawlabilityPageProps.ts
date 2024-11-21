interface Page {
    id: number;
    website: string;
    url: string;
    index_status: number;
    reason: string;
    crawlDepth: number;
    httpStatusCode: number;
    no_js: number;
    createdAt: string;
    updatedAt: string;
  }
  
  interface CrawledPagesData {
    total: number;
    crawled: number;
    uncrawled: number;
  }
  
  interface CrawledPages {
    date: string;
    count: number;
  }
  
  interface Crawlablity {
    crawled: CrawledPagesData;
    pages: CrawledPages[];
  }
  
  interface CountIndexable {
    count: number;
    rows: any[]; // Adjust this based on the actual structure of your data
  }
  
  interface HttpStatusCode {
    info: number;
    success: number;
    redirect: number;
    client_error: number;
    server_error: number;
  }
  
  interface CountDepth {
    one: number;
    two: number;
    three: number;
    gteFour: number;
  }
  
  interface Indexability {
    percentageIndexable: number;
    percentageUnindexable: number;
    crawledTotal: number;
    unindexableReasons: UnindexableReasons;
}

interface UnindexableReasons {
    "Non-200 status code": number;
    "X-Robots-Tag directive: noindex": number;
    "robots meta tag: noindex": number;
    "Canonical tag present": number;
}

  export interface CrawlabilityType {
    crawlability: Crawlablity;
    indexability: Indexability;
    httpStatusCode: HttpStatusCode[];
    countDepth: CountDepth[];
  }
  