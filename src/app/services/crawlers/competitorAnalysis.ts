import ApiCall from "../../utils/apicalls/axiosInterceptor"

export interface Props {
    target: string,
    target1: string,
    location_code: number,
    language_code: string,
}
export interface CompetitorAnalysisServiceProps {
    data: Props[],
    id: number,
}



class CompetitorAnalysisService {
    async crawl({data, id}: CompetitorAnalysisServiceProps) {
        try {
            const response = await ApiCall.post(`/user/crawler/competitor-analysis/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error making API call:', error);
            throw error;
        }
    }
}

export default CompetitorAnalysisService;
