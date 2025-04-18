import { useMutation, useQuery } from "@tanstack/react-query";
import ApiCall from "../../utils/apicalls/axiosInterceptor";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { SetStateAction } from "react";
import { AxiosError } from "axios";

interface RankProps {
  location_code: number;
  target: string;
}

export const useRankTrackingOverview = (tab: string, id: number) => {
  // const id = CurrentProperty()
  // const id = useSelector((state: RootState) => state.property.activePropertyObj);

  const { isError, isSuccess, isPending, data } = useQuery({
    queryKey: [`rank-${tab}`, id],
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
      try {
        const response = await ApiCall.post(
          `/user/crawler/rank-tracking/${id}`,
          [
            {
              target,
              location_code: location_code ?? 2840,
            },
          ]
        );
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            throw new Error(
              error.response?.data.message || "Something went wrong!"
            );
          }
          throw new Error("Ranking Crawler failed");
        }
      }
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
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          error.response?.data.message || "An unexpected error occurred."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
    throw new Error("Ranking Crawler failed");
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
      return toast.error(error.message);
      // return `Mutation failed:, ${error}`;
    },
    onSuccess: (data) => {
      useRankTrackingOverview("overview", id);
      useRankTrackingOverview("ranking", id);
      toast.success("Ranking Crawler successfully");
      setProgress && setProgress(0);
    },
  });
};

export default useRankMutation;

export const useRankMutationByPayload = () => {
  return useMutation({
    mutationFn: async ({
      id,
      target,
      location_code,
    }: {
      id: number;
      target: string;
      location_code?: number;
    }) => {
      return await RankCrawl(target, id, location_code);
    },
    // onError: (error) => {
    // setProgress && setProgress(0);
    // console.error("Mutation failed:", error);
    // toast.error("Ranking Crawler failed");
    // return `Mutation failed:, ${error}`;
    // },
    // onSuccess: (data, variables) => {
    //   const { id } = variables;
    // useRankTrackingOverview("overview", id);
    // useRankTrackingOverview("ranking", id);
    // RankTrackingOverview("ranking", id);
    // toast.success("Ranking Crawler successfully");
    // setProgress && setProgress(0);
    // },
  });
};
