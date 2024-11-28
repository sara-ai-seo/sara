import ApiCall from "@/app/utils/apicalls/axiosInterceptor";

export class KeywordServicesFetch {
  async crawl(id: number, payload: any) {
    try {
      const response = await ApiCall.post(
        `/user/crawler/keyword/${id}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      console.error("Error:", error.response.data.message);
      throw new Error(`Failed to crawl, ${error.response.data.message}`);
    }
  }

  async keywordAnalysisData(id: number) {
    try {
      const response = await Promise.all([
        ApiCall.get(`/user/crawler/keyword/by-tab/${id}?tab=0`),
        ApiCall.get(`/user/crawler/keyword/by-tab/${id}?tab=2`),
      ]);
      return response.map((res) => res.data);
    } catch (error:any) {
      console.error("Error:", error.response.data.message);
      throw new Error(`Failed to fetch keyword analysis data, ${error.response.data.message}`);
    }
  }
  async SmartKeywordFinder(id: number) {
    try {
      const result = await Promise.all([
        ApiCall.get(`user/crawler/keyword/by-tab/${id}?tab=0`),
        ApiCall.get(`user/crawler/keyword/by-tab/${id}?tab=2`),
      ]);
      return result.map((res) => res.data);
    } catch (error: any) {
      console.error("Error:", error);
      throw new Error(`Failed to fetch Smart Keyword Finder data, ${error.response.data.message}`);
    }
  }
  async keywordIdeas(id: number){
  try{
    const response = await ApiCall.get(`/user/crawler/keyword/keyword-ideas/${id}`)
    return response.data
  }
  catch(error: any){
    throw new Error(`Error fetching keyword suggestions: ${error.response.data.message}`)
  }
  }
}

