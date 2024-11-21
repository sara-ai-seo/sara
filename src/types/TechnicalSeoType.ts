export interface PerformanceData {
    performance: number;
}

export interface LighthouseMetrics {
    poor: number;
    needsImprovement: number;
    good: number;
}

export interface CrawledPages {
    total: number;
    crawled: number;
    uncrawled: number;
}

export interface HttpStatusCode {
    info: number;
    success: number;
    redirect: number;
    client_error: number;
    server_error: number;
}

export interface SiteIssue {
    url: string;
    title: string;
    description: string;
    count: number;
    fixedStatus: string;
    score: number;
}

export interface SiteIssues {
    error: number;
    warning: number;
    notices: number;
    issues: SiteIssue[];
}

export interface TechnicalSeoType {
    data: PerformanceData[];
    lcp: LighthouseMetrics;
    tbt: LighthouseMetrics;
    cls: LighthouseMetrics;
    crawled: CrawledPages;
    httpStatusCode: HttpStatusCode[];
    siteIssue: SiteIssues;
}





// interface HttpStatusCode {
//     info: number;
//     success: number;
//     redirect: number;
//     client_error: number;
//     server_error: number;
// }

// interface Issues {
//             url: string;
//             title: string;
//             description: string;
//             count: number;
//             fixedStatus: string;
//             score: string;
//             issue_category: string;
// }

// export interface TechnicalSeoType {
//     data: { site_health: number }[];
//     lcp: {
//         poor: number;
//         needsImprovement: number;
//         good: number;
//     };
//     tbt: {
//         poor: number;
//         needsImprovement: number;
//         good: number;
//     };
//     cls: {
//         poor: number;
//         needsImprovement: number;
//         good: number;
//     };
//     crawled: {
//         total: string;
//         crawled: number;
//         uncrawled: number;
//     };
//     httpStatusCode: HttpStatusCode[];
//     siteIssue: {
//         error: number;
//         warning: number;
//         notices: number;
//         issues: Issues[];
//     };
// }
