"use client";
import FilledButton from "@/app/component/FilledButton";
import { RootState } from "@/app/store";
import { notify } from "@/app/utils";
import { removeTrailingSlash } from "@/app/utils/RemoveSlash";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { setLoading } from "@/redux/features/loaderSlice";
import { setModal } from "@/redux/features/modalstates";
// import { fetchPerformanceSuccess } from '@/redux/features/performanceMetric slice';
import {
  setActiveProperty,
  setActivePropertyObj,
} from "@/redux/features/propertySlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CheckUserType from "./CheckUserType";
import AutoModal from "@/app/component/modals/AutoModal";
import FullpageLoader, { LoadingComp } from "@/app/component/FullpageLoader";

export default function DashboardOverviewPlaceholder() {
  const [err, setErr] = useState({ status: false, msg: "" });
  const [isloading, setisLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const property = useSelector(
    (state: RootState) => state.property.allProperty
  );
  const loading = useSelector((state: RootState) => state.loading.loading);
  async function handleSubmitUrl() {
    if (user.account_type === "free") {
      property.length === 1 ? setShow(true) : null;
    }
    const urlPattern = /^(ftp|http[s]?):\/\/[^ "]+(\.[^ "]+)+$/;
    console.log(urlPattern.test(inputUrl));
    if (!urlPattern.test(inputUrl)) {
      setErr({ status: true, msg: "Enter a valid URL" });
      notify({
        type: "error",
        message: "Enter a valid url",
      });
      alert("Enter a valid url");
      return;
    }

    try {
      setisLoading(true);
      // await ApiCall.get(`crawl/add-property?url=${inputUrl}`);
      const response = await ApiCall.post(`/user/project`, {
        domain: inputUrl,
      });
      dispatch(setActiveProperty(inputUrl));
      dispatch(setActivePropertyObj(response.data.project));
      dispatch(setLoading(true));

      // console.log(req);
      // await Promise.all([
      //   dispatch(setModal("crawling")),
      //   ApiCall.get("/crawl/webcrawler", {
      //     params: {
      //       url: removeTrailingSlash(inputUrl),
      //       type: "passive",
      //       limit: 10,
      //     },
      //   }),
      //   ApiCall.get("/crawl/technical/mini-crawler", {
      //     params: {
      //       url: removeTrailingSlash(inputUrl),
      //       timeout: 5,
      //     },
      //   }),
      //   ApiCall.get("/crawl/content-analysis/mini-crawler", {
      //     params: {
      //       url: removeTrailingSlash(inputUrl),
      //     },
      //   }),
      //   // crawler("/crawl/content-analysis/mini-crawler", {url:removeTrailingSlash(inputUrl)}),
      //   ApiCall.get("/crawl/property"),
      // ]);
      dispatch(setModal(""));

      setisLoading(false);
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred";
      setErr({ status: true, msg: errorMessage });
      // if (error.response && error.response.status === 401) {
      //   router.push("/login");
      // }
      // notify({
      //   type: "error",
      //   message: error?.response?.data?.message,
      // });
      alert(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return loading ? (
    <FullpageLoader>
      <LoadingComp text="Crawling" />
    </FullpageLoader>
  ) : (
    <>
      {/* {show && (
        <AutoModal
          closeModal={() => setShow(false)}
          ModalBody={
            <CheckUserType
              close={() => setShow(false)}
              description="Subscribe to be add more projects"
            />
          }
        />
      )} */}
      <div className="h-full w-full flex-col gap-6 items-start flex justify-start px-4  md:px-[95px] sm:pt-[143px] pt-10">
        <div className="flex flex-col gap-4">
          {/* {JSON.stringify(property)} */}
          <h1 className="text-[#101828] font-semibold text-4xl">
            Track, manage and boost your site’s SEO.
          </h1>
          <p className="text-lg text-gray-900 font-medium">
            Add your site domain to start your SEO journey now!
          </p>
        </div>
        <div className="flex flex-col w-full">
          <label className="">Enter your domain</label>
          <div className="flex sm:flex-row flex-col gap-4 items-center lg:max-w-[70%] w-full">
            <input
              className="p-2 py-3 w-full border rounded-md "
              value={inputUrl}
              placeholder="e.g domain.com"
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <div className="flex justify-self-end w-full sm:max-w-[128px]">
              <FilledButton
                loading={loading}
                title={loading ? "Crawling " : "Let's go!"}
                handleClick={handleSubmitUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
