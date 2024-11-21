import ApiCall from "@/app/utils/apicalls/axiosInterceptor";

class OverviewData {

    async overview(id: number) {
        const response = await ApiCall.get(`/user/crawler/dashboard/${id}`);
        return response.data;
    }
}

export default new OverviewData();