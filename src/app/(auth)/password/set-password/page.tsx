// "use client";
// import PasswordInputComponent from "@/app/component/PasswordInputComponent";
// import TitleAndDescription from "../../../component/TitleAndDescription";
import { Suspense, useEffect, useState } from "react";
// import FilledButton from "@/app/component/FilledButton";
// import BackToLogin from "../BackToLogin";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { string } from "yup";
import SetNewPasswordForm from "./components/SetNewPasswordForm";

export default function SetPassword() {
  //   {
  //   searchParams,
  // }: {
  //   searchParams: string[];
  // }
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [success, _setSuccess] = useState(false);
  // const [error, setError] = useState({ message: "", status: false });

  // const router = useRouter();
  // const params = new URLSearchParams();
  // const params = useSearchParams();
  // const params = new URL(window.location.href).searchParams;

  // const link = params.get("link");
  // const email = params.get("email");
  // console.log(link, email);

  // async function ConfirmLink() {
  //   try {
  //     const res = await axios.get("https://api.webmaxi.com/api/auth/password", {
  //       params: {
  //         link,
  //         email,
  //       },
  //     });

  //     if (res.status === 200 || res.status === 201) {
  //       // Process successful response
  //       console.log("Success:", res.data);
  //     } else {
  //       // Handle unexpected status codes
  //       setError({
  //         status: true,
  //         message: "This link is expired, try to generate another link",
  //       });
  //       setTimeout(() => {
  //         router.push("/password");
  //         setError({ status: false, message: "" });
  //       }, 7000);
  //     }
  //   } catch (error: any) {
  //     // Handle network error or other exceptions
  //     console.error("Error:", error.message);
  //   }
  // }

  // async function SubmitNewPassword() {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "https://api.webmaxi.net/api/auth/reset-password",
  //       {
  //         email,
  //         newPassword: confirmPassword,
  //       }
  //     );
  //     // Check response status or data to determine success or failure
  //     console.log("Password changed successfully:", response.data);
  //     router.push("/password/reset-success");
  //   } catch (error: any) {
  //     console.error("Error changing password:", error.message);
  //     // Handle error, display error message to user, etc.
  //     if (error.response) {
  //       toast.error(error.response.data || "Something went wrong", {
  //         position: "top-right",
  //       });
  //     } else {
  //       toast.error(error.message || "Something went wrong", {
  //         position: "top-right",
  //       });
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   ConfirmLink();
  // }, []);

  return (
    // <div>
    <Suspense fallback={<div> Loading...</div>}>
      <SetNewPasswordForm />
    </Suspense>
    // </div>
  );
}
