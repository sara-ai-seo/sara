import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";

export function getAllKeywordAnalysis(id: number) {
  const { isError, isSuccess, isPending, data } = useQuery({
    queryKey: ["AllKeywordAnalysis", id],
    queryFn: async () => {
      const result = await ApiCall.get(`/user/crawler/keyword/${id}`);
      return result.data.project;
    },
  });
  return { isError, isSuccess, isPending, data };
}
