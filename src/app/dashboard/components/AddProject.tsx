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

export default function AddProject() {
  const [err, setErr] = useState({ status: false, msg: "" });
  const [inputUrl, setInputUrl] = useState("");
  const dispatch = useDispatch();
  const property = CurrentProperty();
  const pathname = usePathname();
  const navigate = useRouter();

  const rankMutation = useRankMutationByPayload();

  const technicalSeoMutation = useTechnicalSeoMutation();

  // console.log("PROPERTY",property)
  const mutate = useMutation({
    mutationFn: async (domain: string) => {
      const response = await ApiCall.post("/user/project/", { domain });
      return response.data;
    },
    onError: (error) => error.message,
    onSuccess: async (data) => {
      console.log("data", data);
      await technicalSeoMutation.mutateAsync(data.project.id);
      const trimmedDomain = trimDomain(data.project.domain);
      if (trimmedDomain !== null) {
        rankMutation.mutate(
          {
            id: data.project.id,
            target: trimmedDomain,
            location_code: 2840,
          },
          {
            onSuccess: (data, variables) => {
              const { id } = variables;
              useRankTrackingOverview("overview", id);
              useRankTrackingOverview("ranking", id);
              toast.success("Ranking Crawler successfully");
            },
            onError: (error) => {
              console.error("Mutation failed:", error);
              toast.error("Ranking Crawler failed");
            },
          }
        );
      }
      dispatch(setActiveProperty(inputUrl));
      dispatch(setActivePropertyObj(data.project));
      navigate.push("/dashboard");
      dispatch(setModal(""));

      // console.log("current:", data.project)
    },
  });

  const handleSubmit = () => {
    const pattern =
      /^(https?|ftp):\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(:[0-9]{1,5})?(\/.*)?$|^(www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(:[0-9]{1,5})?(\/.*)?$/;

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
