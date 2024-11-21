
interface Category {
  category: string;
  categoryItems: CategoryItem[];
}

export interface CategoryItem {
  title: string;
  description: string;
  titleItems: TitleItem[];
}

interface TitleItem {
  url: string;
  pageData: PageData;
}

interface PageData {
  count: number;
  rows: Row[];
}

interface Row {
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

export interface Issues {
  "errors": Category[],
  "warnings": Category[],
  "notice": Category[]

}

export interface IssuesType {
  issues: Issues[]
}