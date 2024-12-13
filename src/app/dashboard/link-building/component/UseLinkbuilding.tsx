import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { trimDomain } from "@/app/utils/trimDomain";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Props {
  id: number;
  domain: string;
}

export function UseLinkBuilding() {
  const linkMutate = useMutation({
    mutationFn: async ({ id, domain }: { id: number; domain: string }) => {
      try {
        await ApiCall.post(`user/crawler/back-link/${id}`, {
          targets: { "1": trimDomain(domain) },
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (
            error.response?.data.message ===
            "Insufficient credit to process your request"
          ) {
            throw new Error(error.response?.data.message);
          }
        }
        throw new Error("Crawl Link Building Failed");
      }
    },

    onSuccess: () => {
      toast.success("Successfully crawled link building", {
        position: "top-right",
      });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-right" });
    },
  });
  return linkMutate;
}

// export class UseLinkbuildingOpportunities {
//   private id: number;
//   constructor(id: number){
//     this.id = id
//   }
//   async mutateOpportunities(){
//     const linkMutate = useMutation({
//       mutationFn: async ({domain}: {id: number, domain:string}) =>
//         await ApiCall.post(`user/crawler/back-link/opportunities/${this.id}`, [{
//           targets: trimDomain(domain) }]
//       ),
//       onSuccess: () => {
//         toast.success("Successfully crawled link building opportunities", { position: "top-right" });
//       },
//       onError: (error: any) => {
//         toast.error(`Error crawling link building ${error}`, { position: "top-right" });
//       },
//     });
//     return linkMutate

//   }
//   async getLinkOpportunities(){
//     const getOpportunities = useQuery({
//       queryKey: ['linkOpportunities', this.id],
//       queryFn: async () => {
//         const { data } = await ApiCall.get(`/user/crawler/back-link/opportunities/${this.id}`);
//         return data;
//       }
//     })
//     return getOpportunities
//   }
// }
export function UseLinkBuildingOpportunities(id: number) {
  const linkMutate = useMutation({
    mutationFn: async (domain: string) =>
      await ApiCall.post(`user/crawler/back-link/opportunities/${id}`, [
        {
          targets: trimDomain(domain),
        },
      ]),
    onSuccess: () => {
      getLinkBuildingOpportunities(id);
      toast.success("Successfully crawled link building opportunities", {
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast.error(`Error crawling link building ${error}`, {
        position: "top-right",
      });
    },
  });
  return linkMutate;
}

export function getLinkBuildingOpportunities(id: number) {
  const getOpportunities = useQuery({
    queryKey: ["linkOpportunities", id],
    queryFn: async () => {
      const { data } = await ApiCall.get(
        `/user/crawler/back-link/opportunities/${id}`
      );
      return data;
    },
  });
  return getOpportunities;
}

export function useLinkBuilding(id: number) {
  const linkMutate = useMutation({
    mutationFn: async (domain: string) =>
      await ApiCall.post(`user/crawler/back-link/${id}`, {
        targets: { "1": trimDomain(domain) },
      }),
    onSuccess: () => {
      toast.success("Successfully crawled link building", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error crawling link building", { position: "top-right" });
    },
  });

  return linkMutate;
}

export function useLinkBuildingOpportunities(id: number) {
  const linkMutate = useMutation({
    mutationFn: async (domain: string) =>
      await ApiCall.post(`user/crawler/back-link/opportunities/${id}`, [
        {
          target: domain,
        },
      ]),
    onSuccess: () => {
      // You can call refetch on the query if needed
      opportunitiesQuery.refetch();
      toast.success("Successfully crawled link building opportunities", {
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast.error(`Error crawling link building ${error}`, {
        position: "top-right",
      });
    },
  });

  const opportunitiesQuery = useQuery({
    queryKey: ["linkOpportunities", id],
    queryFn: async () => {
      const { data } = await ApiCall.get(
        `/user/crawler/back-link/opportunities/${id}`
      );
      return data;
    },
  });

  return { linkMutate, opportunitiesQuery };
}
