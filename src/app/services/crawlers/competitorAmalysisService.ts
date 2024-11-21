import ApiCall from "@/app/utils/apicalls/axiosInterceptor";

export class CompetitorAnalysisServices {
    async crawler(id: number, data: any) {
        const response = await ApiCall.post(`/user/crawler/competitor-analysis/${id}`, data);
        return response.data;
    }
    async keywordGap(id: number) {
        const response = await ApiCall.get(`/user/crawler/competitor-analysis/by-tab/${id}?tab=keywordGap`);
        return response.data;
    }
    async linkGap(id: number) {
        const response = await ApiCall.get(`/user/crawler/competitor-analysis/by-tab/${id}?tab=linkGap`);
        return response.data;
    }
    
}
