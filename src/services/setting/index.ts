import ApiCall, { FormDataApiCall } from "@/app/utils/apicalls/axiosInterceptor";
import axios from "axios";
import { passwordSchemaType } from '@/app/zod-schema/securitySettingSchema';

class SettingService {
    async updateProfile(data: any): Promise<any> {
        try{

            const response = await FormDataApiCall.put('/user/setting', data);
            return response;
        }
        catch(error){
            console.error('Error updating profile:', error);
            if( error instanceof Error){
                if (axios.isAxiosError(error) && error.response) {
                    throw error.response.data.errors[0];
                }
                throw error;
            }
            throw error;
        }
    }

    async updatePasswordChange(data: passwordSchemaType | FormData) : Promise<any> {
        try{
            const response = await ApiCall.put('/user/setting/password', data);
            return response;
        }
        catch(error){
            console.error('Error updating password:', error);
            if( error instanceof Error){
                if (axios.isAxiosError(error) && error.response) {
                    throw error.response.data.errors[0];
                }
                throw error;
            }
            throw error;
    }
}
}

export default new SettingService();