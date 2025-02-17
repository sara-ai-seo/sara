import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { contactFormSchemaType } from "@/app/zod-schema/contactFormSchema";
import FeedbackType from "@/types/home";

class HomeService  {

    async sendFeedback(data: contactFormSchemaType){
        try {
            const response = await ApiCall.post('/feedback', data);
            return response.data;
        } catch (error) {
            console.error('Error sending feedback:', error);
            throw error;
        }

    }
}

const homeService = new HomeService()

export default homeService;