"use client";
import FilledButton from "@/app/component/FilledButton";
import TitleAndDescription from "@/app/component/TitleAndDescription";
import { useEffect, useState } from "react";
import BackToLogin from "../../password/BackToLogin";
import { useRouter } from "next/navigation";

export default function page() {
  const [status, setStatus] = useState("idle");
  const [email, setEmail] = useState("");
  const navigate = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setEmail(userEmail ?? "");
  }, []);

  const handleNavigateOnClickEnterCode = () => {
    try {
      setStatus("loading");
      const mailtoLink = `mailto:${email}`;
      window.location.href = mailtoLink;
      navigate.push("/signup/email-verify/otp");
      setTimeout(() => {
        setStatus("success");
      }, 2000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="w-full flex  flex-col justify-center items-center gap-4 sm:w-auto sm:min-w-[400px]">
      <TitleAndDescription
        title="Check your email"
        description={`We sent a verification code to ${email}`}
      />
      <div className="my-4 w-full">
        <FilledButton
          loading={status === "loading"}
          disabled={status === "loading"}
          title="Enter code"
          handleClick={handleNavigateOnClickEnterCode}
        />
      </div>

      <BackToLogin />
    </main>
  );
}
