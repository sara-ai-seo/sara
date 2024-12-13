import { useQuery } from "@tanstack/react-query";
import OverviewData from "../../../../services/crawlers/dashboardOverview";

export const UseOverviewData = (id: number) => {
  const response = useQuery({
    queryKey: ["overview_data", id],
    queryFn: async () => {
      return await OverviewData.overview(id);
    },
    staleTime: Infinity,
    refetchInterval: 600000, // 10 minutes
  });
  return response;
};
