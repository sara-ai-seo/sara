"use client";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import FilledButton from "@/app/component/FilledButton";
import axios from "axios";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import toast from "react-hot-toast";
import { AxiosInstance } from "@/lib/axios";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    msg: "",
  });

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Please enter an email address"),
    }),
    onSubmit: handleSubmit,
  });

  const route = useRouter();
  async function handleSubmit(
    values: { email: string },
    formikHelpers: FormikHelpers<{ email: string }>
  ) {
    setLoading(true);
    try {
      const res = await AxiosInstance.post(
        "auth/password-reset/forgot-password",
        {
          email: values.email,
        }
      );
      setLoading(false);
      if (res.status == 201) {
        dispatch(setUser({ email: formik.values.email }));
        setMessage({ status: true, msg: "Reset link sent" });
        toast.success("Reset link sent", {
          position: "top-right",
        });
        setTimeout(() => {
          route.push("/password/email-sent");
          setMessage({ status: false, msg: "" });
        }, 6000);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setLoading(false);
      if (error.response) {
        setMessage({ status: true, msg: error.response.data });
        setTimeout(() => {
          setMessage({ status: false, msg: "" });
        }, 6000);
        toast.error(error.response.data || "Something went wrong", {
          position: "top-right",
        });
      } else {
        setMessage({ status: true, msg: error.message });
        setTimeout(() => {
          setMessage({ status: false, msg: "" });
        }, 6000);
        toast.error(error.message || "Something went wrong", {
          position: "top-right",
        });
      }
    }
  }

  return (
    <main className=" w-full justify-center items-center flex gap-4 flex-col sm:w-auto sm:min-w-[400px] ">
      <h1 className=" font-bold sm:text-3xl text-2xl">Forgot password? </h1>
      {message.status === false && (
        <p className="w-full text-base text-center text-gray-600">
          No worries, we will send you instructions.{" "}
        </p>
      )}
      {message.status !== false && <p className="w-full"> {message.msg} </p>}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col w-full">
          <label className="" id="email">
            {" "}
            Email
          </label>
          <input
            className="p-2 border rounded-md focus:outline-primary w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="text"
            placeholder="Enter your email"
            onBlur={formik.handleBlur}
            id="email"
            name="email"
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-red-500">{formik.errors.email}</small>
          )}
        </div>
        <FilledButton title="Reset password" loading={loading} type="submit" />
      </form>
      {/* <button className=" bg-primary w-full rounded-md text-white p-2">
                Reset password
            </button> */}

      <Link href={`/login`} className="flex items-center gap-2 text-sm mt-4">
        <FaArrowLeft />
        Back to login
      </Link>
    </main>
  );
}
