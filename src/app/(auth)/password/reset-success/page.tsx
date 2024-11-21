"use client";
import React, { useState } from "react";
import TitleAndDescription from "../../../component/TitleAndDescription";
import FilledButton from "@/app/component/FilledButton";
import { useRouter } from "next/navigation";

export default function ResetPasswordSuccess() {
  const [status, setStatus] = useState("idle");
  const route = useRouter();
  return (
    <div className="grid gap-4 ">
      <TitleAndDescription
        title="Password reset"
        description={
          <>
            Your password has been reset successfully. <br /> Click below to log
            into your dashboard.
          </>
        }
      />
      <FilledButton
        title="Continue"
        loading={status === "loading"}
        disabled={status === "loading"}
        handleClick={() => {
          setStatus("loading");
          route.push("/dashboard");
        }}
      />
    </div>
  );
}
