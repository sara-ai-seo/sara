import { useMutation, useQuery } from "@tanstack/react-query";
import { KeywordServicesFetch } from "../keyword_services/keyword";

const keywordServices = new KeywordServicesFetch();

export const useKeywordAnalysisData = (id: number) => {
  const {
    data: keywordAnalysisData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["keyword_analysis_data", id],
    queryFn: async () => {
      return await keywordServices.keywordAnalysisData(id);
    },
  });
  return { keywordAnalysisData, isPending, isError, isSuccess };
};

export const useKeywordIdeas = (id: number) => {
  const {
    data: keywordIdeas,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["keyword_ideas", id],
    queryFn: async () => {
      return await keywordServices.SmartKeywordFinder(id);
    },
  });
  return { keywordIdeas, isPending, isError, isSuccess };
};

export const useKeywordmutation = (
  payload: any,
  id: number,
  changeState: () => void
) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return await keywordServices.crawl(id, payload);
    },
    onError: (error) => error.message,
    onSuccess: () => {
      // update the keyword analysis data after successful crawling
      useKeywordAnalysisData(id);
      useKeywordIdeas(id);
      changeState();
    },
  });
  return mutation;
};
