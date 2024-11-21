import ApiCall from "@/app/utils/apicalls/axiosInterceptor"

export const getProperty = async() => {
    const response = await ApiCall.get('/user/project/');
    return response.data
}


export const getSingleProperty = async(id:number) => {
    const response = await ApiCall.get(`/user/project/${id}`);
    return response.data
}