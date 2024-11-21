"use client";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BiLoader } from "react-icons/bi";
import MobileLogoIcon from "../../../components/svgComponents/CompanyMobileLogo";
import toast from "react-hot-toast";
import { AxiosInstance } from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {countrieswithflag } from "../../component/data/countrieswithflag";
import { ChevronsUpDown } from "lucide-react";

export const SignupComponent = () => {
  const [isPassword, setIsPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, msg: "" });
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState({
    name: "Select a location",
    code: 0,
    language: ""
  });
  

  const router = useRouter();

  const Register = async () => {
    setLoading(true);
    try {
      await AxiosInstance.post("auth/register", {
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
        location_name: country.name,
        location_code: country.code,
        location_language: country.language,
      })
        .then((res) => {
          if (res.status == 201) {
            sessionStorage.setItem("user", JSON.stringify(res.data));
            // console.log(res.data);
            router.push("/signup/email-verify");
          } else {
            // console.log("RES", res)
            // setError({status:true, msg: res.data})
          }
        })
        .then(() => localStorage.setItem("userEmail", formik.values.email));
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      setError({
        status: true,
        msg: err.response?.data?.message || "Something went wrong",
      });
      toast.error(err.response.data.message || "Something went wrong", {
        position: "top-right",
      });
    }

    // const payload = {
    //   fullName: formik.values.name,
    //   email: formik.values.email,
    //   password: formik.values.password,
    // };
    // setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      location: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name should be atleast 3 letters"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is a required field"),
      password: Yup.string()
        .required()
        .min(8, "Password must be atleast 8 character")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Password must contain a combination of capital and small letters, a digit, and a special character"
        ),
      location: Yup.string()
        .required("Location is required")
    }),
    onSubmit: Register,
  });

  const currentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };

  // reset error
  setTimeout(() => {
    if (error.status) {
      setError({ status: false, msg: "" });
    }
  }, 3000);

  function handleCountrySelect(selectedCountry: any) {
    const detail = countrieswithflag.find((country) => country.location_name === selectedCountry);
    if (detail) {
      setCountry({
        name: detail.location_name,
        code: detail.location_code,
        language: detail.available_languages[0]?.language_name || "", 
      });
      formik.setFieldValue("location", detail.location_name);
    }
  }

  return (
    <main className="xl:max-w-[800px] lg:max-w-[600px] p-4 w-full h-full flex flex-col gap-10 lg:justify-between ">
      <Link href={`/`}>
        <Image
          src={`/logo.png`}
          alt="Webmaxi Logo"
          width={145}
          height={24}
          className="hidden lg:flex"
        />
        <MobileLogoIcon className="size-11 -mb-6 lg:hidden" />
      </Link>

      <form onSubmit={formik.handleSubmit}>
        <section className="lg:px-20 sm:px-32  w-full justify-between flex flex-col gap-2 ">
          <div className="flex flex-col w-full my-2">
            <p className=" font-bold text-2xl lg:text-4xl">Signup </p>
            <small className="mt-3 text-gray-600">
              Start your free trial today.
            </small>
          </div>
          <small className="text-red-500">{error.status && error.msg} </small>
          <label className="font-bold text-sm lg:text-base"> Name*</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your name"
            className={`p-2 rounded-md border focus:outline-none ${
              formik.touched.name && formik.errors.name && "border-red-400"
            } focus:shadow focus:shadow-primary  `}
          />
          {formik.touched.name && formik.errors.name && (
            <small className="text-red-500">{formik.errors.name}</small>
          )}
          <label className="font-bold text-sm lg:text-base">Location*</label>
            <Select onValueChange={handleCountrySelect}>
              <SelectTrigger className="p-2">
              <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel> Countries</SelectLabel>
                  {
                    countrieswithflag.map((country, i)=> (
                      <SelectItem key={i} value={country.location_name}> {country.location_name} </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.location && formik.errors.location && (
            <small className="text-red-500">{formik.errors.location}</small>
          )}
          <label className="font-bold text-sm lg:text-base">Email*</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={`p-2 rounded-md border focus:outline-none ${
              formik.touched.email && formik.errors.email && "border-red-400"
            } focus:shadow focus:shadow-primary  `}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-red-500">{formik.errors.email}</small>
          )}
          <label className="font-bold text-sm lg:text-b">Password*</label>
          <span className="relative w-full">
            <input
              type={isPassword}
              placeholder="Create a password"
              name="password"
              id="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`p-2 rounded-md border focus:outline-none ${
                formik.touched.password &&
                formik.errors.password &&
                "border-red-400"
              } focus:shadow focus:shadow-primary  w-full `}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-red-500">{formik.errors.password}</small>
            )}
            <span className="absolute right-2 top-3 cursor-pointer">
              {isPassword == "text" ? (
                <span className="" onClick={() => setIsPassword("password")}>
                  <IoEyeOffOutline />{" "}
                </span>
              ) : (
                <span className="" onClick={() => setIsPassword("text")}>
                  {" "}
                  <IoEyeOutline />
                </span>
              )}{" "}
            </span>
          </span>
          <small className="text-gray-600 -mt-2 ">
            {" "}
            Must be at least 8 characters.
          </small>
          <button
            className=" w-full p-2 mt-4 flex items-center justify-center gap-2 font-bold bg-primary text-white rounded-md"
            type="submit"
          >
            Create account{" "}
            {loading && (
              <span>
                {" "}
                <BiLoader className="w-full  animate-spin text-white" />{" "}
              </span>
            )}
          </button>
          {/* <button
            className=" w-full p-2 flex items-center mt-2 justify-center gap-2 font-bold border text-black rounded-md"
            type="submit"
          >
            <FcGoogle className="size-6" />
            Sign up with Google
            {loading && (
              <span>
                {" "}
                <BiLoader className="w-full  animate-spin text-white" />{" "}
              </span>
            )}
          </button> */}
          {/* <FilledButton title="Create Account" loading={loading} /> */}

          {/* <span className=" cursor-pointer w-full p-2 font-bold rounded-md border flex items-center justify-center gap-2"><FcGoogle /> Signup with google </span> */}
          <Link href={`/login`} className="text-center mt-4">
            <small className="">
              {" "}
              Already have an account?{" "}
              <span className=" text-primary font-bold"> Log in</span>
            </small>{" "}
          </Link>
        </section>
      </form>
      <footer className="lg:flex justify-between w-full items-center hidden mr-8">
        <small className=""> &#169;Webmaxi {currentYear()}.</small>
        <small className="flex items-center gap-1">
          {" "}
          <CiMail /> help@webmaxi.net
        </small>
      </footer>
    </main>
  );
};
