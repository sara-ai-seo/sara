import { useMutation, useQuery } from "@tanstack/react-query";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import ApiCall from "../../utils/apicalls/axiosInterceptor";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const fetchTechseoData = async (id: number) => {
  const result = await ApiCall.get(`/user/crawler/technical-seo/${id}`);
  // console.log("tech seo", result.data);

  return result.data.project;
};

export const useTechnicalSeoFetchData = (id: number) => {


  const { data, isLoading } = useQuery({
    queryKey: ["techseodata", id],
    queryFn: () => fetchTechseoData(id),
    refetchInterval: (data: any) => {
      const status = data.state?.data?.crawlings?.[0]?.status;
      // console.log("status", status);
      if (status === "PENDING") {
        return 4000;
      }
      return false;
    }
  });

  return { data, isLoading };
};

const CrawlTechnicalSeo = async (id: number) => {
  try {
    const response = await ApiCall.post(`/user/crawler/technical-seo/${id}`);
  } catch (error) {
    // console.log("crawl axios", error);
    if (error instanceof AxiosError) {
      if (
        error.response?.data.message ===
        "Insufficient credit to process your request"
      ) {
        throw new Error(error.response?.data.message);
      }
    }
    throw new Error("Crawl Technical SEO Failed");
  } finally {
    // setLoading(false);
  }
};

export function useTechnicalSeoMutation() {
  const technicalSeoMutation = useMutation({
    mutationFn: async (id: number) => CrawlTechnicalSeo(id),
    onSuccess: () => {
      toast.success("Recrawl Technical SEO Successfully");
    },
    onError: (error) => {
      console.log("crawl ", error);
      toast.error(error.message);
    },
  });

  // return { technicalSeoMutation, isPending, isError, error };
  return technicalSeoMutation;
}

interface DataByTab  {
  tab: string,
  id: number
}

export function useTechnicalSeoDataByTab({tab, id}: DataByTab){
  // const id = useSelector(
  //   (state: RootState) => state.property.activePropertyObj
  // );
  const data = useQuery({
    queryKey: [tab, id ],
    queryFn: async()=> {
      const result = await ApiCall.get(`/user/crawler/technical-seo/by-tab/${id}?tab=${tab}`)
      return result.data
    }
  
  })

  return data
}