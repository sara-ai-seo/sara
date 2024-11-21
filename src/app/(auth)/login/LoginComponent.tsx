"use client";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { currentYear } from "@/app/utils/currenYear";
import { AxiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/component/Loader";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/features/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import MobileLogoIcon from "../../../components/svgComponents/CompanyMobileLogo";
import toast from "react-hot-toast";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import {
  setActiveProperty,
  setActivePropertyObj,
} from "@/redux/features/propertySlice";

export const LoginComponent = () => {
  const [isPassword, setIsPassword] = useState("password");
  const [userDetail, setUserDetail] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState({
    state: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetail((detail) => ({
      ...detail,
      [name]: value,
    }));
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const User = useSelector((state: RootState) => state.user);
  const Property = useSelector((state: RootState) => state.property);
  async function handleLogin() {
    setIsLoading(true);
    try {
      const loginPromise = AxiosInstance.post("/auth/login", {
        email: userDetail.email,
        password: userDetail.password,
      });

      toast.promise(
        loginPromise,
        {
          loading: "Loading",
          success: (data) => `Successfully login`,
          error: (err) => `Something  just happened`,
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );

      const res = await loginPromise; // Wait for the login request to complete

      if (res.status == 200) {
        // console.log("RES::",res.data.token)
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.token));
        Property.allProperty.length > 1 &&
          dispatch(setActivePropertyObj(Property.allProperty[0]));
        Property.activeProperty.length > 1 &&
          dispatch(setActiveProperty(Property.activeProperty));

        router.push("/dashboard");
      }
    } catch (err: any) {
      console.log(err);
      setError({
        state: true,
        message: err?.response?.data?.message,
      });
      setTimeout(() => {
        setError({ state: false, message: "" });
      }, 5000);
    }
    setIsLoading(false);
  }

  // console.log("TOKEN",User.token)
  return (
    <main className="2xl:max-w-[800px]  lg:max-w-[600px] w-full h-full flex flex-col gap-10 lg:justify-between ">
      <Link href={`/`}>
        <Image
          src={`/logo.png`}
          alt="Webmaxi Logo"
          width={200}
          height={0}
          className="hidden lg:flex"
        />

        <MobileLogoIcon className="size-11 -mb-6 lg:hidden" />
      </Link>
      <section className="lg:px-20 sm:px-32 w-full justify-between flex flex-col gap-2">
        <p className=" font-bold lg:text-3xl text-2xl ">Log in </p>
        <small className="text-gray-600 text-base">
          {" "}
          Welcome back, please enter your details.
        </small>
        <label className="font-bold text-sm lg:text-base">
          {" "}
          Email*{" "}
          {error && (
            <small className="text-red-500">{error.message}</small>
          )}{" "}
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={userDetail.email}
          onChange={handleChange}
          className="p-2 rounded-md  focus:outline-none border focus:shadow focus:shadow-primary"
        />
        <label className="font-bold text-sm lg:text-b"> Password*</label>
        <span className="relative w-full">
          <input
            type={isPassword}
            placeholder="Enter your password"
            name="password"
            value={userDetail.password}
            onChange={handleChange}
            className="p-2 rounded-md border focus:outline-none focus:shadow focus:shadow-primary w-full"
          />
          <span className="absolute right-2 top-3">
            {isPassword == "text" ? (
              <button className="" onClick={() => setIsPassword("password")}>
                <IoEyeOffOutline />{" "}
              </button>
            ) : (
              <button className="" onClick={() => setIsPassword("text")}>
                {" "}
                <IoEyeOutline />
              </button>
            )}{" "}
          </span>
        </span>
        <div className="flex justify-between items-center my-1">
          <span className="flex items-center gap-2">
            <input type="checkbox" name="" id="" />
            <label className="text-gray-600 text-sm">
              Remember for 30 days
            </label>
          </span>

          <Link href={`/password`}>
            <small className=" font-bold w-full text-sm flex justify-end text-primary cursor-pointer">
              Forget password
            </small>{" "}
          </Link>
        </div>

        <button
          className=" w-full p-2 font-bold bg-primary relative gap-2 text-white rounded-md "
          onClick={handleLogin}
        >
          {" "}
          Sign in
          {isLoading && (
            <span className="absolute max-h-[70px] top-3 right-2 ">
              <Loader />
            </span>
          )}
        </button>
        <button
          className=" w-full p-2 flex items-center mt-2 justify-center gap-2 font-bold border text-black rounded-md"
          type="submit"
        >
          <FcGoogle className="size-6" />
          Sign in with Google
        </button>
        {/* <button className=" w-full p-2 font-bold rounded-md border flex items-center justify-center gap-2"><FcGoogle /> Sign in with Google </button> */}
        <Link href={`/signup`} className="text-center">
          <small className="">
            {" "}
            Don't have an account?{" "}
            <span className=" text-primary right-0"> Sign up</span>
          </small>{" "}
        </Link>
      </section>
      <footer className="lg:flex justify-between w-full items-center hidden ">
        <small className=""> &#169;Webmaxi {currentYear()}.</small>
        <small className="flex items-center gap-1">
          {" "}
          <CiMail /> help@webmaxi.net
        </small>
      </footer>
    </main>
  );
};
