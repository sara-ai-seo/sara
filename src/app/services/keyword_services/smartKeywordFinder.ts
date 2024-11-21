import { useQuery } from "@tanstack/react-query";
import { KeywordServicesFetch } from "./keyword";

const keywordServices = new KeywordServicesFetch();
export function getSmartKeywordFinder(id: number) {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["smart-keyword-finder", id],
    queryFn: async () => keywordServices.SmartKeywordFinder(id),
  });

  return { isPending, isError, error, data };
}
