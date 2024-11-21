import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { useMutation } from "@tanstack/react-query";

export async function UseBacklinkMutation(payload:any, id: number){

    const {isPending, isSuccess, isError } = useMutation({
        mutationFn: async() => await  ApiCall.post(`user/crawler/back-link/${id}`, payload),
        
        
    })
    return {isPending, isSuccess, isError}
}