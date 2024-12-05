import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { trimDomain } from "@/app/utils/trimDomain";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


interface Props {
    id: number;
    domain: string
}

export function UseLinkBuilding(){
    const linkMutate = useMutation({
        mutationFn: async ({id, domain}: {id: number, domain:string}) =>
          await ApiCall.post(`user/crawler/back-link/${id}`, {
            targets: { "1": trimDomain(domain) },
          }),
        onSuccess: () => {
          toast.success("Successfully crawled link building", { position: "top-right" });
        },
        onError: () => {
          toast.error("Error crawling link building", { position: "top-right" });
        },
      });
      return linkMutate
}