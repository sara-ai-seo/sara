"use client";
import Input from "@/app/component/commons/Input";
import { RootState } from "@/app/store";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmptyState() {
  const activePropertyObj = useSelector(
    (state: RootState) => state.property.activePropertyObj
  );

  const router = useRouter();

  const searchTopic = async () => {
    console.log("Form submitted with values:", formik.values); // Debug line

    try {
      const result = ApiCall.post(
        `/user/crawler/content-analysis/${activePropertyObj?.id}`,
        {
          keywords: [
            {
              keyword: formik.values?.topic,
            },
          ],
        }
      );

      toast.promise(
        result,
        {
          loading: "Loading",
          success: (data) => `Search successful`,
          error: (err) => `Something  just happened`,
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );

      const res = await result;

      if (res.status == 200) {
        router.push("/dashboard/content-analysis");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      topic: "",
    },
    validationSchema: Yup.object().shape({
      topic: Yup.string()
        .required("Topic is required")
        .min(3, "Topic should be at least 3 letters"),
    }),
    onSubmit: searchTopic,
  });

  return (
    <form
      className={`flex justify-center flex-col gap-4 h-full w-full py-52 px-12`}
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-[#101828] font-semibold text-5xl">
        Content Analysis
      </h1>
      <p className="font-medium text-xl text-[#101828]">
        Input any word or phrase to search for pages with relevant content
        metrics
      </p>
      <div className="flex gap-8 items-end w-full">
        <Input
          className="w-full lg:w-96"
          isShowLabel
          labelName="Enter topic"
          placeholder="e.g. business branding"
          name="topic"
          value={formik.values.topic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Button className="text-white" type="submit">
          Search topic
        </Button>
      </div>
    </form>
  );
}
