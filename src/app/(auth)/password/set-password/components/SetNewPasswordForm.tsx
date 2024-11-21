"use client";
import PasswordInputComponent from "@/app/component/PasswordInputComponent";
import TitleAndDescription from "@/app/component/TitleAndDescription";
import { useEffect, useState } from "react";
import FilledButton from "@/app/component/FilledButton";
import BackToLogin from "../../BackToLogin";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { AxiosInstance } from "@/lib/axios";

export default function SetNewPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [success, _setSuccess] = useState(false);
  const [error, setError] = useState({ message: "", status: false });

  const router = useRouter();
  // const params = new URLSearchParams();
  const params = useSearchParams();

  let token = "";
  const link = params.get("link");
  const email = params.get("email");

  const sessionToken = sessionStorage.getItem("user");
  if (sessionToken) {
    const user = JSON.parse(sessionToken);
    // console.log(user.token);
    token = user.token;
  } else {
    console.log("No session found");
  }

  async function ConfirmLink() {
    try {
      const res = await AxiosInstance.get("auth/password", {
        params: {
          link,
          email,
        },
      });

      if (res.status === 200 || res.status === 201) {
        // Process successful response
        console.log("Success:", res.data);
      } else {
        // Handle unexpected status codes
        setError({
          status: true,
          message: "This link is expired, try to generate another link",
        });
        setTimeout(() => {
          router.push("/password");
          setError({ status: false, message: "" });
        }, 7000);
      }
    } catch (error: any) {
      // Handle network error or other exceptions
      console.error("Error:", error.message);
    } finally {
      setVerifying(false);
    }
  }

  async function SubmitNewPassword() {
    try {
      setLoading(true);
      const response = await AxiosInstance.post(
        "auth/password-reset/reset-password",
        {
          email,
          newPassword: confirmPassword,
          token,
        }
      );
      // Check response status or data to determine success or failure
      console.log("Password changed successfully:", response.data);
      router.push("/password/reset-success");
    } catch (error: any) {
      console.error("Error changing password:", error.message);
      // Handle error, display error message to user, etc.
      if (error.response) {
        toast.error(error.response.data || "Something went wrong", {
          position: "top-right",
        });
      } else {
        toast.error(error.message || "Something went wrong", {
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    ConfirmLink();
  }, []);
  return (
    <>
      {verifying ? (
        <p className="text-primary text-2xl h-full ">Verifying link...</p>
      ) : (
        <main className="w-full flex flex-col justify-center items-center gap-4 max-w-[400px]">
          {error.status && (
            <div className="text-red-500"> {error.message} </div>
          )}
          {!error.status && (
            <TitleAndDescription
              title="Set new password"
              description="Your new password must be different from previously used password."
            />
          )}
          {success && (
            <p className="text-green-500 text-2xl">
              {" "}
              Password successfully changed{" "}
            </p>
          )}
          <main className="w-full flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Password</label>
              <PasswordInputComponent
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">
                Confirm password
              </label>
              <PasswordInputComponent
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className="text-gray-600 mt-2">
                {" "}
                Must be at least 8 characters{" "}
              </p>
            </div>
            <FilledButton
              loading={loading}
              title="Reset password"
              handleClick={SubmitNewPassword}
            />
            <BackToLogin />
          </main>
        </main>
      )}
    </>
  );
}
