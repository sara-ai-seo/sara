"use client";
import BackToLogin from "../BackToLogin";
import TitleAndDescription from "../../../component/TitleAndDescription";
import FilledButton from "@/app/component/FilledButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
// import { useRouter } from "next/navigation";
import axios from "axios";
// import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosInstance } from "@/lib/axios";

export default function EmailSent() {
  const [status, setStatus] = useState("idle");
  const userEmail = useSelector((state: RootState) => state.user.user.email);
  const [text, setText] = useState("Click to resend");
  const route = useRouter();
  // const dispatch = useDispatch()

  const handleOpenMail = () => {
    try {
      setStatus("loading");
      const mailtoLink = `mailto:${userEmail}`;
      window.location.href = mailtoLink;
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  async function handleSubmit() {
    setText("Sending...");
    try {
      const res = await AxiosInstance.post(
        "auth/password-reset/forgot-password",
        {
          email: userEmail,
        }
      );
    } catch (error: any) {
      console.error("Error submitting form:", error);
    }
    setText("Click to resend");
  }
  return (
    <main className="flex flex-col gap-8 sm:w-auto sm:min-w-[400px]">
      <TitleAndDescription
        title="Check your email"
        description={`We sent a password reset link to ${userEmail}`}
      />
      {/* <button className=" bg-purple-700 rounded-md font-semibold text-white w-full p-2">
                Open email app
            </button> */}

      <FilledButton
        title="Open email app"
        loading={status === "loading"}
        handleClick={handleOpenMail}
        disabled={status === "loading"}
      />

      <p className="text-sm text-center">
        <span className="text-gray-600">Didn't receive the email?</span>
        <span className=" text-[#175CD3] cursor-pointer" onClick={handleSubmit}>
          {" "}
          {text}{" "}
        </span>
      </p>

      <BackToLogin />
    </main>
  );
}
