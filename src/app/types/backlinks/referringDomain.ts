interface ReferringLinksTypes {
    anchor: number;
  }
  
  interface ReferringLinksPlatformTypes {}
  
  export interface ReferringDomainData {
    rank: number;
    backlinks: number;
    first_seen: string;
    broken_pages: number;
    refering_domain: string;
    referring_pages: number;
    broken_backlinks: number;
    backlinks_spam_score: number;
    referring_links_types: ReferringLinksTypes;
    referring_domains_dofollow: number;
    referring_domains_nofollow: number;
    referring_links_platform_types: ReferringLinksPlatformTypes;
  }
  