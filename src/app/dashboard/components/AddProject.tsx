import { useState } from "react";
import Image from "next/image";
import PlainButton from "@/app/component/PlainButton";
import { ButtonFilled } from "@/app/component/FilledButton";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/features/modalstates";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import {
  setActiveProperty,
  setActivePropertyObj,
} from "@/redux/features/propertySlice";
import { useMutation } from "@tanstack/react-query";

import useRankMutation, {
  RankTrackerCrawler,
  useRankMutationByPayload,
  useRankTrackingOverview,
} from "@/app/services/crawlers/rank_tracking";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { trimDomain } from "@/app/utils/trimDomain";
import { usePathname, useRouter } from "next/navigation";
import { useTechnicalSeoMutation } from "@/app/services/technicalSeo/TechnicalSeoFetch";
import toast from "react-hot-toast";
import { UseLinkBuilding } from "../link-building/component/UseLinkbuilding";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { AxiosError } from "axios";

export default function AddProject() {
  const [err, setErr] = useState({ status: false, msg: "" });
  const [inputUrl, setInputUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const property = CurrentProperty();
  const pathname = usePathname();
  const navigate = useRouter();

  const rankMutation = useRankMutationByPayload();

  const technicalSeoMutation = useTechnicalSeoMutation();
  const linkBuilding = UseLinkBuilding();
  const User = useSelector((state: RootState) => state.user.user);

  // console.log("PROPERTY",property)


  //  const { mutate, isError: MutateError, isPending: MutatePending } = useMutation({
  //         mutationFn: async () => {
  //           await ApiCall.post(`/user/crawler/rank-tracking/${id.id}`,
  //             [
  //               {
  //                 target: trimDomain(id.domain)
  //               },
  //             ]
  //           )
  //         },
  //         onSuccess: () => {
  //           toast.success("Rankings re-tracked successfully!");
  //         },
  //         onError: () => {
  //           toast.error("Failed to re-track rankings!");
  //         },

  //       })



  const { mutate: RankMutate } = useMutation({
    mutationFn: async ({ id, domain }: { id: number; domain: string }) => {
      await ApiCall.post(`/user/crawler/rank-tracking/${id}`,
        [
          {
            target: trimDomain(domain as string)
          },
        ]
      );
    },
    onSuccess: () => {
      toast.success("Rankings re-tracked successfully!");
    },
    onError: () => {
      toast.error("Failed to re-track rankings!");
    },

  })

  // console.log("@", property.id,trimDomain(property.domain), User.location.code  )

  const mutate = useMutation({
    mutationFn: async (domain: string) => {
      try {
        const response = await ApiCall.post("/user/project/", { domain });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            throw new Error(
              error.response?.data.message || "Something went wrong!"
            );
          }
          throw new Error("Create Project Failed");
        }
        throw new Error("Create Project Failed");
      }
    },
    onError: (error) => {
      toast.error(error.message);
       setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onSuccess: async (data) => {
      console.log("data", data.project);
      await technicalSeoMutation.mutateAsync(data.project.id);
      RankMutate({ id: data.project.id, domain: data.project.domain });

      dispatch(setActiveProperty(inputUrl));
      dispatch(setActivePropertyObj(data.project));
      navigate.push("/dashboard");
      dispatch(setModal(""));

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });

  const handleSubmit = () => {
    const pattern = /^(?:(?:https?:\/\/)?(?:www\.)?|www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?::[0-9]{1,5})?(?:\/.*)?$/;
    if (!pattern.test(inputUrl)) {
      setErr({ status: true, msg: "Enter a valid url" });
      return;
    }
    mutate.mutate(inputUrl);
  };

  const cancel = () => dispatch(setModal(""));

  return (
    <section className="flex flex-col space-y-3 justify-center w-full items-center">
      <Image
        src="/home/addprojecticon.png"
        height={48}
        width={48}
        alt="icon "
      />
      <h3 className=" font-semibold text-lg text-[#101828]"> Add project</h3>
      <p className=" text-sm font-normal text-[#475467]">
        Please enter your project domain name.
      </p>

      <div className="flex flex-col justify-start w-full">
        <label className="text-sm text-[#344054] font-medium ">
          {" "}
          Domain name
        </label>
        <input
          type="text"
          placeholder="e.g. domain.com"
          className="p-2 rounded-md w-full border"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        {err.status && <small className="text-red-500">{err.msg} </small>}
      </div>
      <div className="flex items-center justify-between gap-4 w-full">
        <PlainButton title="Cancel" handleClick={cancel} />
        <ButtonFilled
          title="Add"
          loading={mutate.isPending}
          handleClick={handleSubmit}
        />
      </div>
    </section>
  );
}
