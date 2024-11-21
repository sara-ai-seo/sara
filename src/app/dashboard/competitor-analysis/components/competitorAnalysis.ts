import { CompetitorAnalysisServices } from "@/app/services/crawlers/competitorAmalysisService";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { useQuery } from "@tanstack/react-query";

// Create an instance of the service
const competitorAnalysisServices = new CompetitorAnalysisServices();

export const keywordGapData = () => {
  const id = CurrentProperty();
  const { isError, isSuccess, isPending, data } = useQuery({
    queryKey: ["keyword_gap", id.id],
    queryFn: async () => {
      return competitorAnalysisServices.keywordGap(id.id);
    },
  });

  return { isError, isSuccess, isPending, data };
};


export const linkGapData = () => {
  const id = CurrentProperty();

  const { isError, isSuccess, isPending, data } = useQuery({
    queryKey: ["link_gap", id.id],
    queryFn: async () => {
      return competitorAnalysisServices.linkGap(id.id);
    },
  });
  return { isError, isSuccess, isPending, data };
};
