export interface BacklinkType {
    image: number;
    anchor: number;
    redirect: number;
    canonical: number;
}

interface NewVsLostBacklinkItem {
    target: string;
    new_referring_domains: number;
    lost_referring_domains: number;
    new_referring_main_domains: number;
    lost_referring_main_domains: number;
}

interface NewVsLostBacklink {
    items: NewVsLostBacklinkItem[];
    items_count: number;
}

interface DoFollowVsNoFollow {
    dofollow: number;
    nofollow: number;
}

interface Data {
    backlink_type: BacklinkType;
    total_backlinks: number;
    refering_domains: number;
    domain_trust_score: number;
    new_vs_lost_backlink: NewVsLostBacklink[];
    do_follow_vs_no_follow: DoFollowVsNoFollow;
    refering_domain_and_backlink_overtime: number[];
}

export interface CrawlingData {
    id: number;
    crawlingId: number;
    tab: string;
    data: Data;
    createdAt: string;
    updatedAt: string;
}