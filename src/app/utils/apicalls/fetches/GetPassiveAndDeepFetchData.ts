import { useDispatch } from "react-redux";
import ApiCall from "../axiosInterceptor"
import { fetchPerformanceFailure, fetchPerformanceStart, fetchPerformanceSuccess } from "@/redux/features/performanceMetric slice";

export async function GetPassiveAndDeepFetch(inputUrl:string, type: string){
  const dispatch = useDispatch()
    try {
      dispatch(fetchPerformanceStart())
    const response = await ApiCall.get('/crawl/overall', {
        params: {
          url: inputUrl,
          type: type,
          limit: 10
        }
      })
      dispatch(fetchPerformanceSuccess(response.data));
    }
    catch (error:any) {
      console.log('Error fetching passive', error)
      dispatch(fetchPerformanceFailure(error.message));
    }
  }

