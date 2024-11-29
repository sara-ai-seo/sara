import { useQuery } from "@tanstack/react-query";
import { KeywordServicesFetch } from "./keyword-services";

const keywordServices = new KeywordServicesFetch();
export function getSmartKeywordFinder(id: number) {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["smart-keyword-finder", id],
    queryFn: async () => keywordServices.SmartKeywordFinder(id),
  });

  return { isPending, isError, error, data };
}
export function useKeywordIdeas(id: number) {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["smart-keyword-ideas", id],
    queryFn: async () => keywordServices.keywordIdeas(id),
  });

  return { isPending, isError, error, data };
}
