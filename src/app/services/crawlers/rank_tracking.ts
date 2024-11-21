import { useMutation, useQuery } from "@tanstack/react-query";
import ApiCall from "../../utils/apicalls/axiosInterceptor";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { SetStateAction } from "react";

interface RankProps {
  location_code: number;
  target: string;
}

export const useRankTrackingOverview = (tab: string, id: number) => {
  // const id = CurrentProperty()
  // const id = useSelector((state: RootState) => state.property.activePropertyObj);

  const { isError, isSuccess, isPending, data } = useQuery({
    queryKey: ["ranktracker_overview", id],
    queryFn: async () => {
      const result = await ApiCall.get(
        `/user/crawler/rank-tracking/by-tab/${id}?tab=${tab}`
      );
      return result.data;
    },
  });
  return { isError, isSuccess, isPending, data };
};

// export const useRankTrackingRankingTab = () => {
//     // const id = CurrentProperty();
//     const id = useSelector((state: RootState) => state.property.activePropertyObj.id);

//  const {isError, isSuccess, isPending, data} = useQuery({
//     queryKey: ['ranktracker_ranking', id],
//     queryFn: async()=> {
//         const response = await ApiCall.get(`/user/crawler/rank-tracking/by-tab/${id}?tab=ranking`)
//         return response.data;
//     },

//  });

//  return {isError, isSuccess, isPending, data }
// }

export const RankTrackerCrawler = (
  target: string,
  location_code: number,
  id: number
) => {
  const rankCrawler = useMutation({
    mutationFn: async () => {
      const response = await ApiCall.post(`/user/crawler/rank-tracking/${id}`, [
        {
          target,
          location_code: location_code ?? 2840,
        },
      ]);

      return response.data;
    },
    onError: (error) => error.message,
    onSuccess: () => {
      useRankTrackingOverview("overview", id);
      useRankTrackingOverview("ranking", id);
    },
  });
  return rankCrawler;
};

export const RankCrawl = async (
  target: string,
  id: number,
  location_code = 2840,
  setProgress?: React.Dispatch<SetStateAction<number>>
) => {
  try {
    const response = await ApiCall.post(
      `/user/crawler/rank-tracking/${id}`,
      [
        {
          target,
          location_code,
        },
      ],
      {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            // console.log(progressEvent);
            setProgress && setProgress(percentCompleted);
          }
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const useRankMutation = (
  id: number,
  setProgress?: React.Dispatch<SetStateAction<number>>
) => {
  return useMutation({
    mutationFn: async ({
      target,
      location_code,
    }: {
      target: string;
      location_code?: number;
    }) => {
      return await RankCrawl(target, id, location_code, setProgress);
    },
    onError: (error) => {
      setProgress && setProgress(0);
      console.error("Mutation failed:", error);
      return `Mutation failed:, ${error}`;
    },
    onSuccess: (data) => {
      useRankTrackingOverview("overview", id);
      useRankTrackingOverview("ranking", id);
      setProgress && setProgress(0);
    },
  });
};

export default useRankMutation;
