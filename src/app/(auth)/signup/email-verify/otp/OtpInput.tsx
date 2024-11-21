import FilledButton from "@/app/component/FilledButton";
import { AxiosInstance } from "@/lib/axios";
import { setToken, setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const OtpInput: React.FC = () => {
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set initial focus on the first input field when the component mounts
    inputRefs[0]?.current?.focus();
  }, []);

  const handleInput = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs[index + 1].current?.focus();
    } else if (
      (e.key === "ArrowLeft" && index > 0) ||
      (e.key === "Backspace" && !value)
    ) {
      inputRefs[index - 1].current?.focus();
    }

    const newOtpValues = [...otpValues];
    if (e.key !== "Backspace") {
      newOtpValues[index] = value;
    }
    setOtpValues(newOtpValues);
  };
  const dispatch = useDispatch();
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);

    // Distribute each character from pastedData to the corresponding input field
    const newOtpValues = Array(6)
      .fill("")
      .map((_, index) => pastedData[index] || "");
    setOtpValues(newOtpValues);
  };

  // const token = localStorage.getItem("token");
  let token = "";
  const sessionToken = sessionStorage.getItem("user");
  if (sessionToken) {
    const user = JSON.parse(sessionToken);
    // console.log(user.token);
    token = user.token;
  } else {
    console.log("No session found");
  }

  console.log(token);
  const router = useRouter();

  const route = useRouter();
  const userEmail = localStorage.getItem("userEmail");
  const payload = {
    // email: userEmail,
    otp: otpValues.join(""),
  };
  async function VerifyEmail() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    try {
      await AxiosInstance.post("auth/verification/verify", payload, config)
        .then((res) => {
          if (res.status == 200) {
            // console.log("RES::", res.data.token);
            dispatch(setUser(res.data.user));
            dispatch(setToken(res.data.token));
            router.push("/signup/email-verify/verify-success");
          }
        })
        .then(() => console.log("Submitted!"));
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data.message || "Something went wrong", {
        position: "top-right",
      });
    }
    setLoading(false);
  }

  return (
    <div className="flex space-x-2 flex-col gap-4 min-[425px]:w-full w-[90%]">
      <div className="flex space-x-3 justify-center my-4">
        {Array.from({ length: 6 }, (_, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            placeholder="0"
            type="text"
            maxLength={1}
            onChange={(e) => handleInput(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            value={otpValues[index]}
            className="  min-[425px]:size-20 size-16 text-5xl text-primary text-center border rounded-md focus:outline-none focus:shadow focus:shadow-primary"
          />
        ))}
      </div>
      <FilledButton
        loading={loading}
        title="Verify email"
        handleClick={VerifyEmail}
      />

      <p className="text-center text-sm">
        Didn’t receive the email?{" "}
        <button className="text-primary">Click to resend </button>
      </p>
    </div>
  );
};

export default OtpInput;
