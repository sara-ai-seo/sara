import ApiCall from "@/app/utils/apicalls/axiosInterceptor";



export const addProperty = async (domain: string): Promise<any> => {
    const response = await ApiCall.post('/user/project/', domain);
    return response.data;
};


