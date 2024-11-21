import ApiCall from "@/app/utils/apicalls/axiosInterceptor";

export class KeywordServicesFetch {
  async crawl(id: number, payload: any) {
    try {
      const response = await ApiCall.post(
        `/user/crawler/keyword/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error(`Failed to crawl, ${error}`);
    }
  }

  async keywordAnalysisData(id: number) {
    try {
      const response = await Promise.all([
        ApiCall.get(`/user/crawler/keyword/by-tab/${id}?tab=0`),
        ApiCall.get(`/user/crawler/keyword/by-tab/${id}?tab=2`),
      ]);
      return response.map((res) => res.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error(`Failed to fetch keyword analysis data, ${error}`);
    }
  }
  async SmartKeywordFinder(id: number) {
    try {
      const result = await Promise.all([
        ApiCall.get(`user/crawler/keyword/by-tab/${id}?tab=0`),
        ApiCall.get(`user/crawler/keyword/by-tab/${id}?tab=2`),
      ]);
      return result.map((res) => res.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error(`Failed to fetch Smart Keyword Finder data, ${error}`);
    }
  }
}
